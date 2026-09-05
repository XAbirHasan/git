# Git Fetch & Pull

`git fetch` and `git pull` both bring changes from a remote into your local repository, the difference is what happens after the download. Fetch stops there; pull goes one step further and merges the changes into your current branch too.

## The Key Difference

- **`git fetch`**: downloads changes but doesn't merge them
- **`git pull`**: downloads changes AND merges them (fetch + merge)

Think of it as: fetch is "show me what's new," pull is "get what's new and apply it."

## Git Fetch

```bash
git fetch
```

Updates your remote-tracking branches (like `origin/main`) but leaves your working directory untouched, safe to run any time, since nothing about your own work changes.

```
$ git fetch
remote: Counting objects: 10, done.
Unpacking objects: 100% (10/10), done.
From https://github.com/user/repo
   abc123..def456  main       -> origin/main
```

**Specific remotes or branches:**
```bash
git fetch origin              # from a specific remote
git fetch upstream             # or a different one
git fetch origin main          # just one branch
git fetch origin main develop  # or a few
git fetch --all                # every configured remote
```

**Cleaning up stale remote-tracking branches:**
```bash
git fetch --prune
# or
git fetch -p
```
When someone deletes a branch on the remote, your local `origin/that-branch` reference doesn't disappear automatically, `--prune` removes those stale references.
```
$ git fetch --prune
From https://github.com/user/repo
 - [deleted]         (none)     -> origin/old-feature
   abc123..def456    main       -> origin/main
```
Set it once instead of remembering the flag: `git config --global fetch.prune true`.

**Other useful options:**
```bash
git fetch --dry-run    # see what would be fetched, without fetching
git fetch --tags       # also fetch tags (on by default in most setups)
git fetch --depth 1    # shallow fetch, only recent history
```

**Fetching a specific ref, including a GitHub PR:**
```bash
git fetch origin refs/heads/main:refs/remotes/origin/main
git fetch origin pull/123/head:pr-123
```

### After Fetching

Nothing changes in your working directory until you act on what you fetched:

```bash
git branch -r                   # remote branches you now know about
git branch -a                   # local and remote, together
git log main..origin/main       # commits on the remote you don't have yet
git diff main origin/main       # what actually changed
git merge origin/main           # bring it in, once you've reviewed it
```

## Git Pull

```bash
git pull
```

Equivalent to `git fetch` followed by `git merge origin/<current-branch>`, in one step.

```
$ git pull
From https://github.com/user/repo
   abc123..def456  main     -> origin/main
Updating abc123..def456
Fast-forward
 file.txt | 10 +++++++++-
 1 file changed, 9 insertions(+), 1 deletion(-)
```

```bash
git pull origin main
git pull upstream main
```

**Pull with rebase**, replaying your local commits on top instead of creating a merge commit:
```bash
git pull --rebase
```
Equivalent to `git fetch` + `git rebase origin/<current-branch>`. Worth using when you want linear history, since a plain `git pull` on a branch with local commits creates a merge commit every time you sync.
```
$ git pull --rebase
First, rewinding head to replay your work on top of it...
Applying: Your local commit
```
If you have uncommitted changes and don't want to stash manually first: `git pull --rebase --autostash` stashes them, rebases, then reapplies them automatically.

**Other pull options:**
```bash
git pull --all              # update all tracking branches
git pull --ff-only          # fail instead of creating a merge commit if fast-forward isn't possible
git pull -q                 # quiet, suppress the detailed output
git pull --strategy=ours    # merge, but ignore the remote's changes entirely
git pull -X theirs          # merge normally, but prefer the remote's side only on conflict
```
`--strategy` (`-s`) and `-X` look similar but aren't: `-s` changes how the whole merge is computed, `-X` only nudges the outcome on lines that actually conflict. See [Git Merge](/commands/merge) for the full distinction, `git pull` uses the same merge machinery underneath.

## Fetch vs. Pull: Which to Use

**Fetch first, then decide**, when you want to see what changed before it touches your branch, you're reviewing someone else's pushes, or you're not sure a fast-forward will even work:
```bash
git fetch origin              # 1. download, nothing else changes yet
git log main..origin/main     # 2. see what's new
git diff main origin/main     # 3. see exactly what changed
git merge origin/main         # 4. bring it in, once you're satisfied
```

**Pull directly**, when you trust the remote and just want to sync quickly, typically on a branch only you work on:
```bash
git pull origin main
```

## Common Workflows

**Syncing a fork with its upstream:**
```bash
git remote add upstream https://github.com/original/repo.git   # once, ever
git fetch upstream           # get upstream's latest
git checkout main
git merge upstream/main      # bring it into your fork's main
git push origin main         # update your fork on GitHub
```

**Updating several local branches at once:**
```bash
git fetch --all --prune        # update every remote-tracking branch, drop deleted ones
git checkout main && git pull
git checkout develop && git pull
```

## Resolving Pull Conflicts

A pull's merge step can conflict exactly like a plain `git merge` can:

```
$ git pull
Auto-merging file.txt
CONFLICT (content): Merge conflict in file.txt
```

Same resolution process as any merge conflict, see [Git Merge](/commands/merge) for the full walkthrough: check `git status`, edit out the conflict markers, `git add` the resolved files, then `git commit`. To back out entirely: `git merge --abort`.

If you pulled with `--rebase` instead, conflicts are resolved differently, since you're mid-rebase, not mid-merge:
```bash
git add file.txt          # after editing out the conflict markers
git rebase --continue      # not git commit
```
Using `git commit` here would be a mistake, `git rebase --continue` is what tells Git to resume replaying the remaining commits.

## Checking Where You Stand

```bash
git status
```
```
Your branch is behind 'origin/main' by 3 commits.
Your branch is ahead of 'origin/main' by 2 commits.
Your branch and 'origin/main' have diverged.
```

```bash
git log main..origin/main     # theirs, not yours yet
git log origin/main..main     # yours, not pushed yet
git log main...origin/main    # both sides since they diverged
git branch -vv                # every local branch with its tracking status
```

## Troubleshooting

**Pull rejected, uncommitted local changes in the way:**
```
error: Your local changes to the following files would be overwritten by merge
```
Commit or stash first, then pull:
```bash
git stash
git pull
git stash pop
```

**Branches have diverged:**
```
Your branch and 'origin/main' have diverged, and have 2 and 3 different commits each
```
Merge (`git pull`), rebase (`git pull --rebase`), or, if your local commits genuinely don't matter, discard them: `git reset --hard origin/main` (⚠️ this throws away local commits permanently).

## Configuration

```bash
git config --global pull.rebase true    # always rebase instead of merge on pull
git config --global pull.ff only        # refuse to pull unless it's a fast-forward
git branch --set-upstream-to=origin/main main    # so plain `git pull` knows what to sync with
```

## See Also

- [Git Remote](/commands/remote) - managing remotes
- [Git Merge](/commands/merge) - what pull's merge step actually does, and how to resolve conflicts
- [Git Rebase](/commands/rebase) - what `pull --rebase` does under the hood
- [Git Push](/commands/push) - sending your commits the other direction
- [Git Branch](/commands/branch) - branch and tracking basics
