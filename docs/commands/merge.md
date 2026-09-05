# Git Merge

`git merge` brings another branch's commits into your current branch. It's how finished work gets integrated: a feature branch back into `main`, or the latest `main` into a feature branch you're still working on.

## What Happens When You Merge

- **Fast-forward**: if your current branch hasn't gained any commits since the other branch diverged from it, Git just moves your branch pointer forward to match. No new commit, no history tangle, just catching up.
- **Three-way merge**: if both branches have new commits, Git combines them and creates a merge commit with two parents, one on each branch.
- **Squash merge**: combines every commit from the other branch into a single new commit on yours, discarding the individual commit boundaries.

## Basic Merge

```bash
# Switch to main branch
git checkout main

# Merge feature branch into main
git merge feature-branch
```

When a fast-forward is possible, this is all you'll see:

```
$ git merge feature
Updating abc123..def456
Fast-forward
 file.txt | 10 ++++++++++
 1 file changed, 10 insertions(+)
```

You can merge a remote-tracking branch directly too, without checking it out locally first:

```bash
git fetch origin
git merge origin/feature-branch
```

## Writing a Custom Merge Message

```bash
git merge branch-name -m "Merge feature: Add user authentication"
# or open an editor for something longer
git merge branch-name --edit
```

By default Git writes a generic "Merge branch 'x'" message. Overriding it is worth doing when the merge itself is significant enough to explain, a completed feature, a release branch, anything future-you would want more context on than the default gives. Like `git commit`, you can give it a full body, not just a headline:

```bash
git merge feature-login -m "Merge feature: User authentication system

- Added login page
- Implemented JWT authentication
- Added password reset functionality"
```

## Controlling Fast-Forward Behavior

```bash
git merge --no-ff branch-name
```
Forces a real merge commit even when a fast-forward was possible. Worth doing on feature branches: the merge commit marks exactly where the feature landed, which makes the history easier to read and the whole feature easier to revert as one unit later.

```bash
git merge --ff-only branch-name
```
The opposite: refuses to merge unless it can fast-forward, failing loudly instead of silently creating a merge commit. Useful in scripts or CI where you want to catch unexpected divergence rather than merge through it.

If you always want one of these, set it once instead of typing the flag every time:
```bash
git config --global merge.ff false   # always create a merge commit
git config --global merge.ff only    # only allow fast-forward
```

## Squash Merge

```bash
git merge --squash branch-name
git commit -m "Add login feature"
```
Stages all the branch's changes but doesn't commit automatically, you write one commit message covering the whole thing. Good for folding in a messy work-in-progress branch without dragging its entire commit history into `main`.

## Merge Strategies vs. Merge Options

These sound similar but control different things.

**Strategy** (`-s`) decides *how* the merge is computed overall:
```bash
git merge -s ours branch-name
```
Records a merge, but keeps your branch's content entirely, the other branch's changes are ignored completely. Useful for marking a branch as merged without pulling in anything from it.

**Option** (`-X`) tells the default strategy which side to prefer *only when there's a conflict*, everything that merges cleanly still merges normally:
```bash
git merge -X theirs branch-name   # on conflict, prefer the branch being merged in
git merge -X ours branch-name     # on conflict, prefer your current branch
```

Mixing these up is an easy mistake: `-s ours` throws away the whole other branch, `-X ours` only affects the specific lines that actually conflict.

The strategy used when you don't specify one is "recursive" on older Git, or "ort" (a faster reimplementation of the same idea) on Git 2.33+, functionally the same behavior either way for a normal two-branch merge.

## Resolving Conflicts

Git tells you when it can't merge automatically:

```
$ git merge feature
Auto-merging file.txt
CONFLICT (content): Merge conflict in file.txt
Automatic merge failed; fix conflicts and then commit the result.
```

It marks the conflicting section directly in the file:

```
<<<<<<< HEAD
This is the content from your current branch
=======
This is the content from the branch being merged
>>>>>>> feature-branch
```

1. Check which files have conflicts: `git status`
2. Open each one, remove the `<<<<<<<`/`=======`/`>>>>>>>` markers, and decide what the final content should be
3. Stage the resolved files: `git add file.txt`
4. Finish the merge: `git commit` (or `git commit -m "..."` for a custom message)

If it's more than you want to untangle right now:
```bash
git merge --abort
```
Cancels the merge and returns you to exactly where you were beforehand.

For complex conflicts, a visual merge tool can help:
```bash
git mergetool
git config --global merge.tool vscode   # or vimdiff, meld, etc.
```

Seeing the common ancestor alongside both sides also helps in tricky cases:
```bash
git config --global merge.conflictstyle diff3
```
```
<<<<<<< HEAD
Your changes
||||||| merged common ancestors
Original content
=======
Their changes
>>>>>>> branch
```

## Previewing Before You Commit

```bash
# See what will be merged
git merge --no-commit --no-ff branch-name

# Review changes
git diff --cached
# happy with it:
git commit
# not happy with it:
git merge --abort
```
Runs the merge and stops right before committing, so you can review the combined result and back out cleanly if it's not what you expected.

## Merging Unrelated Histories

```bash
git merge --allow-unrelated-histories branch-name
```
Normally Git refuses to merge branches with no common ancestor, this overrides that, needed when combining two previously separate projects into one repository.

## Checking Merge Status

```bash
git branch --merged      # already merged into current branch, safe to delete
git branch --no-merged   # not yet merged
git log --merges         # just the merge commits
git log --no-merges      # everything except merge commits
```

## Merge vs. Rebase

Both integrate one branch's work into another, but they leave different history behind:

- **Merge** when: the branch is shared with others, you want to preserve exactly what happened and when, or you're bringing a finished feature into `main`.
- **Rebase** when: you're cleaning up commits on your own local branch before anyone else has seen them, or you want linear history instead of merge commits.

The two combine well: rebase your feature branch onto `main` first, then merge, and the merge itself becomes a fast-forward with no merge commit at all.

```bash
git checkout feature
git rebase main
git checkout main
git merge feature   # fast-forward, since feature now starts from main's current tip
```

See [Git Rebase](/commands/rebase) for the full comparison.

## A Full Feature-Branch Lifecycle

Putting the pieces together, this is the shape most feature work follows end to end:

```bash
git checkout -b feature-login       # start the feature
git add .
git commit -m "Add login functionality"

git checkout main
git pull origin main                # make sure main is current before merging into it
git merge feature-login             # bring the feature in
git push origin main

git branch -d feature-login         # clean up, now that it's merged
```

## Troubleshooting

**Overwhelming conflicts:** `git merge --abort`, then consider rebasing the feature branch onto `main` first, resolving conflicts commit-by-commit tends to be easier than all at once.

**Accidental merge (not yet pushed):** `git reset --hard HEAD~1` undoes it. If you've made other commits since, `git reflog` will help you find the pre-merge state instead.

**Merge introduced something unexpected:** `git diff HEAD~1` shows exactly what the merge added before you decide whether to undo it, often faster than trying to remember which side a change came from.

**Can't fast-forward when using `--ff-only`:**
```
fatal: Not possible to fast-forward, aborting.
```
Rebase the branch onto the target first, then retry the merge.

## See Also

- [Git Branch](/commands/branch) - creating and managing branches
- [Git Rebase](/commands/rebase) - the alternative to merge for local cleanup
- [Git Reset](/commands/reset) - undoing a merge
- [Git Reflog](/commands/reflog) - recovering from a bad merge after other commits happened
