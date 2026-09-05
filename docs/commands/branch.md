# Git Branching

Branches let you work on multiple features or bug fixes in parallel without any of them affecting the main codebase until you're ready to merge. This guide covers the commands you'll reach for most often to create, inspect, and clean up branches.

## Show Current Branch

```
git branch --show-current
```

Prints just the name of the branch you're on, nothing else. Useful in scripts, or when you've lost track of where you are.

```
$ git branch --show-current
master
```

## List All Local Branches

```
git branch
// or
git branch --list
```

Lists every branch in your local repository, with an asterisk (`*`) marking the one you're currently on.

```
$ git branch
* master
  feature-1
  feature-2
```

## List All Remote Branches

```
git branch --remotes
```

Lists the branches that exist on the remote, including ones other collaborators created that you haven't checked out locally.

```
$ git branch --remotes
origin/master
origin/feature-1
origin/feature-2
```

## List Branches With Last Commit

```
git branch --verbose
// or
git branch -v
```

Same branch list as above, but with each branch's most recent commit next to it, so you can tell how current (or stale) each one is without checking it out.

```
$ git branch -v
* master               a3f4882 Update README.md
  feature-1            d32bc31 Implement new feature
  feature-2
```

## See Merged Branches

```
git branch --merged
```

Shows which branches have already been fully merged into your current branch, which is the safe list of branches you can delete without losing any work.

```
$ git branch --merged
  develop
  feature-A
  * master
```

## Create a New Branch

```
git branch "branch name"
```

Creates a new branch with the given name, but does **not** switch to it, you stay on your current branch. To create a branch and switch to it in one step, use `git checkout -b "branch name"` or, on Git 2.23+, `git switch -c "branch name"`.

```
$ git branch feature-B
$ git checkout -b feature-C
Switched to a new branch 'feature-C'
```
Here, `feature-B` was created but not checked out, while `feature-C` was created and switched to immediately.

## Rename a Branch

```
git branch -m "the renamed branch"
```

Renames the branch you're currently on. Useful for cleaning up a name that no longer describes what you're working on, without losing the branch's history.

```
$ git branch -m feature-B-fix
```

## Delete a Branch

```
git branch --delete "branch name"
```

Deletes the specified branch, but only if Git can confirm it's already been merged elsewhere, otherwise it refuses, to protect you from losing unmerged work.

```
$ git branch --delete feature-A
```

## Force Delete a Branch

```
git branch --delete --force "branch name"
// or
git branch -D "branch name"
```

Same as above, but skips the merge check. Use this when you're certain the branch's work is no longer needed, since Git won't warn you before discarding unmerged commits.

```
$ git branch -D feature-branch
```

## Delete a Remote Branch

```
git push origin --delete "branch name"
```

Deleting a local branch only removes your copy of it, the remote still has its own. This pushes the deletion to the remote too, which is what you want once a feature branch has been merged and everyone's done with it.

```
$ git push origin --delete old-feature-branch
```

## Checkout to a Specific Branch

```
git checkout "branch name"
```

Switches your working directory to the specified branch.

## Switch Between the Two Most Recent Branches

```
git checkout -
```

Jumps back to whichever branch you were on before your current one, the same shorthand `cd -` uses for directories. Handy for bouncing between two branches without typing their names each time.

## git switch (Git 2.23 and onwards)

Git 2.23 split `git checkout`'s two unrelated jobs, switching branches and restoring files, into two dedicated commands: `git switch` and `git restore`. `git switch` covers everything below and is generally clearer than the older `git checkout` for branch work.

### Create a Branch

```
git switch --create "branch name"
```

Equivalent to `git checkout -b`: creates a new branch with the given name and switches to it immediately.

```
$ git switch --create new-feature-branch
```

### Checkout to a Specific Branch

```
git switch "branch name"
```

Equivalent to `git checkout "branch name"`.

### Switch Between the Two Most Recent Branches

```
git switch -
```

Equivalent to `git checkout -`.

## See Also

- [Git Merge](/commands/merge) - integrating a branch's changes
- [Git Rebase](/commands/rebase) - replaying a branch onto a new base
- [Git Restore](/commands/restore) - restoring files (the other half of the old `git checkout`)
- [Git Stash](/commands/stash) - setting work aside before switching branches
