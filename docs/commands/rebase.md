# Rebase

Rebasing replays your branch's commits on top of a different base commit, one at a time. It's like redoing your work as if you'd started from that new point. The result is a clean, linear history instead of merge's tangle of merge commits, plus a chance to edit or squash commits along the way.

You'll use it in two common situations:

- **Catching up with `main`.** You branched off `main` a few days ago. Since then, your team added new commits to `main`. Merging would tangle a merge commit into your history. Rebasing replays your commits on top of the latest `main` instead, so it looks like you started fresh today.
- **Cleaning up before a PR.** A feature branch often ends up with messy commits: "wip", "fix typo", "actually fix it this time". An interactive rebase lets you squash these into a few clean commits before anyone reviews your branch.

Both do the same thing under the hood: rewrite your branch's history. The first keeps you in sync with your team. The second makes your own work easier to read.

## Rebase Your Branch Head

```bash
git rebase PARENT_BRANCH
```

Moves your branch so it starts from the current tip of `PARENT_BRANCH` instead of wherever it originally branched off. For example, if `feature-branch` was created off an older commit on `master`, rebasing it brings it up to date with everything `master` has gained since:

```
git rebase master
```

## Interactive Rebase

```bash
git rebase --interactive COMMIT_SHA^
```

Regular rebase just replays your commits onto a new base. Interactive rebase lets you reshape them on the way there: reorder them, edit one, merge several into one, or drop one entirely. It's how you turn a messy trail of "wip" and "fix typo" commits into a handful of clean ones before opening a PR.

`COMMIT_SHA^` tells Git where to start, the `^` means "the parent of this commit", since interactive rebase acts on every commit after that point.

```
git rebase --interactive ea5972f^
```

This opens your editor with a list of commits, oldest first, each starting with `pick`:

```
pick ea5972f Add new feature
pick 9c1b2d3 Fix typo in login form
```

Change the word in front of a commit to control what happens to it. For example, changing `pick` to `reword` on `ea5972f` tells Git to pause there and let you edit its message:

```
reword ea5972f Add new feature
pick 9c1b2d3 Fix typo in login form
```

The available actions:

- `pick` - keep the commit as-is
- `reword` - keep the commit, but edit its message
- `edit` - pause here so you can amend the commit
- `squash` - merge this commit into the one above it, combining both messages
- `fixup` - same as squash, but discard this commit's message
- `drop` - remove the commit entirely

## Continue Rebase

```bash
git rebase --continue
```

Resumes the rebase after you've resolved a conflict or finished editing a paused commit.

## Abort Rebase

```bash
git rebase --abort
```

Cancels the rebase in progress and returns the branch to exactly where it was before you started. Safe to use any time you get stuck partway through.

## Walkthrough: Cleaning Up Branch History

Here's what an interactive rebase looks like end to end, squashing a couple of messy commits into one.

1. Check out the branch you want to clean up:
    ```
    $ git checkout my-feature-branch
    ```
2. Start an interactive rebase against the branch (or commit) it's based on:
    ```
    $ git rebase -i master
    ```
3. Git opens your editor with the branch's commits, oldest first:
    ```
    pick 1234567 Add new feature
    pick 2345678 Add more functionality
    pick 3456789 Fix bug
    ```
4. To combine the last two commits into the first, change their action to `squash` (keeps both messages) or `fixup` (discards them):
    ```
    pick 1234567 Add new feature
    squash 2345678 Add more functionality
    fixup 3456789 Fix bug
    ```
5. Save and close the file. Git replays the commits in order, and for any `squash` line, pauses to let you write a combined commit message:
    ```
    # This is a combination of 2 commits.
    # The first commit's message is:
    # Add new feature
    #
    # The second commit's message is:
    # Add more functionality
    #
    # Please enter the commit message for your changes. Lines starting
    # with '#' will be ignored, and an empty message aborts the commit.
    ```
6. Edit the message to describe the combined change, save, and the rebase continues automatically.
7. If Git hits a conflict partway through, it pauses and asks you to resolve it in the affected files. Once resolved, stage the fix and run `git rebase --continue`. If it's too messy to untangle, `git rebase --abort` gets you back to where you started.

Once it finishes, `my-feature-branch` has a shorter, cleaner history, three commits became one, with nothing else about the branch's actual content changed.

## Fixup Commits

```bash
git commit --fixup=COMMIT_SHA
```

A fixup commit lets you patch an earlier commit without stopping to rebase right now. Running `--fixup` creates a small new commit tagged as a fix for `COMMIT_SHA`, it doesn't rewrite history yet, it just marks itself to be folded into that commit the next time you run an interactive rebase with `--autosquash`.

```
git commit --fixup=HEAD^
```

You still need to run an interactive rebase with `--autosquash` (below) to actually fold it in.

## Auto Squash

```bash
git rebase --interactive --autosquash COMMIT_SHA
```

`--autosquash` automatically moves each `fixup!`/`squash!` commit next to the commit it targets and marks it for squashing, so you don't have to manually reorder the rebase file yourself.

Example: you committed a feature, moved on to the next thing, then found a bug in it.

```
$ git log --oneline
3f3d85d Add more functionality
ea5972f Add new feature
83dba5d Initial commit
```

Instead of stopping to rebase right now, you fix the bug and mark the commit as a fixup for `ea5972f`:

```
$ git commit --fixup=ea5972f
```

Git auto-generates the fixup commit's message from the target's subject line, so your log now looks like:

```
$ git log --oneline
7d90ee3 fixup! Add new feature
3f3d85d Add more functionality
ea5972f Add new feature
83dba5d Initial commit
```

Later, run an interactive rebase down to before `ea5972f`, with `--autosquash`:

```
$ git rebase --interactive --autosquash 83dba5d
```

`--autosquash` moves the fixup commit right after the commit it targets and marks it, so the rebase file opens already arranged like this:

```
pick ea5972f Add new feature
fixup 7d90ee3 fixup! Add new feature
pick 3f3d85d Add more functionality
```

Save and continue the rebase, and the fixup disappears into the commit it was fixing:

```
$ git log --oneline
3f3d85d Add more functionality
ea5972f Add new feature
83dba5d Initial commit
```

## The Golden Rules of Git Rebasing

1. **Never rebase a public or shared branch.** Rebasing rewrites commits, giving them new hashes. If anyone else has already pulled the branch, their history and yours will diverge, and reconciling that is far more painful than the problem rebase was solving.
2. **Know what you're doing before you do it.** Rebasing a branch you've already pushed usually means you'll need `git push --force` (or `--force-with-lease`) to update the remote, which overwrites whatever is there. Understand that consequence before you rebase anything that isn't purely local and private.

In short: rebase freely on your own private branches to keep history clean, but reach for merge instead once other people are relying on what you've pushed.

## See Also

- [Git Merge](/commands/merge) - the safer alternative for shared branches
- [Git Reflog](/commands/reflog) - recovering commits if a rebase goes wrong
- [Git Cherry-Pick](/commands/cherry-pick) - moving individual commits instead of a whole branch
