# Git Stash

Ever been mid-change and suddenly needed to switch branches, pull in updates, or fix an urgent bug, without committing half-finished work just to get there? `git stash` saves your uncommitted changes aside and resets your working directory to match the last commit, so you can go do the other thing and come back to exactly where you left off.

For the ultimate version of this same problem, needing two branches checked out and buildable *at the same time*, no stashing or switching at all, see [Git Worktree](/productivity/worktree). Stash is for a quick detour; worktree is for when you're bouncing between two things all day.

## Stashing Changes

```
git stash
```

Saves everything in your working directory (tracked files only, see below) to a new stash entry, and reverts your working directory to the last commit. Switch branches, pull, do whatever you needed to do, then bring the changes back when you're ready.

**With a custom message**, so you can tell your stashes apart later:
```
git stash push -m "your message"
```

## What Gets Stashed

By default, only changes to files Git already tracks:

```
git stash --include-untracked
# or
git stash -u
```
Also stashes new, untracked files.

```
git stash --all
```
Stashes everything `-u` does, plus files that are `.gitignore`d, useful if you have local config or generated files you don't want to commit but still want to save alongside the rest.

## Viewing Stashes

```
git stash list
```
Shows every stash you've created, each identified by an index (`stash@{0}` is the most recent) and its message, if you gave it one.

```
git stash show <stash-head>
```
Summarizes what changed in a stash, like `git diff --stat`.

```
git stash show --patch <stash-head>
```
The full diff instead of just a summary, useful when you need to see the actual line-by-line changes.

## Bringing Changes Back

```
git stash pop
```
Applies the most recent stash to your working directory and removes it from the stash list.

```
git stash pop <stash-head>
```
Same, but for a specific stash instead of the most recent one.

```
git stash apply <stash-head>
```
Applies a stash without removing it from the list, useful when you want to try the same stash on more than one branch, or aren't yet sure the apply will go cleanly.

**Pro tip:** prefer `apply` followed by a manual `drop` over `pop` when you're not fully confident about the result. Git already protects you from the obvious failure case, if `pop` hits a conflict, it keeps the stash rather than losing it. But if the apply succeeds cleanly and just produces the *wrong* result (files merged in a way you didn't expect, say), `pop` has already deleted the stash before you had a chance to notice. `apply` lets you check the outcome first and only run `drop` once you're actually sure:
```
git stash apply <stash-head>
# review the result...
git stash drop <stash-head>
```

## Creating a Branch From a Stash

```
git stash branch "branch-name" <stash-head>
```

Creates a new branch, checks it out, and applies the stash there. Particularly useful when reapplying a stash directly would conflict with what's changed on your current branch since you stashed, giving it a clean branch of its own sidesteps the conflict entirely.

## Removing Stashes

```
git stash drop <stash-head>
```
Removes one specific stash.

```
git stash clear
```
❗ Removes every stash at once. This is **not reversible** through any stash command, double-check `git stash list` before running it.

**If you drop or clear a stash by mistake**, it's often still recoverable: a stash is really just a commit under the hood, so until Git eventually garbage-collects it, you can find it again with:
```
git fsck --unreachable | grep commit
```
Each hash listed is a candidate, `git stash apply <hash>` or `git show <hash>` will tell you if it's the one you're after.

## See Also

- [Git Branch](/commands/branch) - creating and switching branches
- [Git Diff](/commands/diff) - the format `stash show --patch` uses
- [Git Reflog](/commands/reflog) - a similar local safety net, for commits rather than stashes
- [Git Worktree](/productivity/worktree) - skip the stash-switch-pop dance entirely for frequent context switching
