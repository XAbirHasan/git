# Reset Changes

Ever committed something too early, or wanted to make your last few commits disappear as if they'd never happened? That's what `git reset` is for: it undoes or discards changes from a previous commit or series of commits. Depending on the mode you use, it can be as gentle as moving `HEAD` back while keeping everything you did, or as destructive as wiping the working tree to match an older commit entirely.

## Reset Last Commit

```
git reset HEAD~1
```

Undoes the last commit and moves `HEAD` back one commit, but keeps the changes from that commit sitting in your working tree, so you can fix them up and commit again. Useful when a commit turns out not to be ready to push yet.

```
$ git log --oneline
2a468b8 Added new feature
8b291ab Fixed bug

$ git reset HEAD~1
$ git log --oneline
8b291ab Fixed bug
```

Here, "Added new feature" wasn't ready to be pushed, so resetting moved `HEAD` back to "Fixed bug", while the actual code from the undone commit is still sitting in the working tree, uncommitted.

## Reset Last N Commits

```
git reset HEAD~n
```

Same idea, but undoes the last `n` commits at once, keeping all their combined changes in your working tree.

```
$ git log --oneline
2a468b8 Added new feature
8b291ab Fixed bug
21b912b Initial commit

$ git reset HEAD~2
$ git log --oneline
21b912b Initial commit
```

## Reset Modes

`git reset` has three modes, controlling how much beyond the branch pointer gets touched:

- **`--soft`**: moves `HEAD` only. The index and working tree are untouched, so the undone commits' changes stay fully staged, ready to be recommitted right away. Good for combining several commits into one.
- **`--mixed`** (the default): moves `HEAD` and resets the index, but leaves your working tree files alone. Your changes go from "committed" to "modified, not staged," letting you restage exactly what you want.
- **`--hard`**: moves `HEAD` and resets both the index and working tree to match. This discards the undone commits' changes completely and cannot be undone through normal means, only `git reflog` can help you recover from it.

## Reset HEAD to a Remote Branch

```
git reset origin/<branch-name>
```

Moves your local branch to match a remote branch exactly. Useful for bringing a local branch up to date with its remote, or discarding local commits that shouldn't have diverged in the first place.

```
$ git branch -a
* master
  remotes/origin/master
  remotes/origin/feature

$ git reset origin/feature
```

Here, `master` had local changes that weren't ready to be pushed, so resetting to `origin/feature` throws them away and matches the remote branch exactly.

## Reset a Merge Commit

```
git reset --merge HEAD~1
```

Undoes the last merge commit, moving `HEAD` back one commit while keeping the merge's changes in your working tree, in case you want to redo the merge differently.

### Abort an In-Progress Merge

If a merge has conflicts or errors you don't want to resolve, and you want to start over before it's committed:

```
git reset --merge
# or, equivalently
git merge --abort
```

Both restore your branches to exactly how they were before the merge started.

## Reset a Specific File

```
git reset <file>
```

Resets one file to its state in the last commit, useful for discarding changes to a single file without touching anything else.

```
$ git status
modified:   index.html

$ git reset index.html
$ git status
nothing to commit, working tree clean
```

(On Git 2.23+, `git restore --staged <file>` says the same thing more explicitly, see [Git Restore](/commands/restore).)

## Reset a File to a Specific Commit

```
git reset <commit> <file>
```

Resets a single file to how it looked in `<commit>`, without touching any other files or commits. Useful for reverting one file to an earlier state while leaving the rest of your branch alone.

```
$ git log --oneline
2a468b8 Added new feature
8b291ab Fixed bug

$ git reset 8b291ab index.html
```

This restores `index.html` to its state at the "Fixed bug" commit, leaving every other file as it currently is.

### Shorthand: `git reset -- <file>`

```
git reset -- <file>
```

A shortcut for `git reset HEAD <file>`, resetting the file to its state in the last commit. The `--` tells Git "everything after this is a path, not a ref," useful when a filename could otherwise be confused with a branch or commit name.

```
$ git status
modified:   index.html

$ git reset -- index.html
$ git status
nothing to commit, working tree clean
```

## Reset a File to Its Remote State

```
git reset <remote>/<branch> <file>
```

Same idea as resetting to a specific commit, but from a remote branch, useful for pulling in just one file's changes from a remote without merging the whole branch.

```
$ git reset origin/develop index.html
```

Here, `index.html` gets updated to match `origin/develop`'s version, without affecting any other files or commits on the local branch.

## Notes

All of the commands above discard changes, some recoverably, some not, so make a backup or run `git stash` first if you're not certain. `--hard` in particular can't be undone through normal Git commands.

If you do mess up, `git reflog` can often get you back to where you were, see [Git Reflog](/commands/reflog).

## See Also

- [Git Restore](/commands/restore) - the safer, file-only alternative for staging/unstaging
- [Git Revert](/commands/revert) - undoes a commit without rewriting history, safe on shared branches
- [Git Reflog](/commands/reflog) - recovers commits after a `--hard` reset goes wrong
