# Reset changes
The `git reset` is a command that allows you to undo or discard changes made in a previous commit or series of commits. It can be used in several different ways, depending on the specific use case.

## Reset Last Commit
```
git reset HEAD~1
```
This command will undo the changes made in the last commit and move the `HEAD` pointer one commit back. It will also keep the changes made in the last commit in the working tree, allowing you to make additional changes before committing again.

Example:
```
$ git log
commit 2a468b8 (HEAD -> master)
Author: XAbirHasan
Date:   Mon Jan 2 12:00:00 2023

Added new feature

commit 8b291ab
Author: XAbirHasan
Date:   Sat Jan 1 12:00:00 2023

Fixed bug
:(more)

$ git reset HEAD~1
$ git log
commit 8b291ab
Author: XAbirHasan
Date:   Sat Jan 1 12:00:00 2023

Fixed bug
```
In this example, the last commit added a new feature but it was not ready to be pushed. So, we used git reset to undo the changes and move the `HEAD` pointer one commit back.

## Reset Last n number of Commits
```
git reset HEAD~n
```
This command will undo the changes made in the last "n" commits and move the `HEAD` pointer "n" commits back. It will also keep the changes made in the last "n" commits in the working tree, allowing you to make additional changes before committing again.

Example:
```
$ git log
commit 2a468b8 (HEAD -> master)
Author: XAbirHasan
Date:   Mon Jan 2 12:00:00 2023

Added new feature

commit 8b291ab
Author: XAbirHasan
Date:   Sat Jan 1 12:00:00 2023

Fixed bug

commit 21b912b
Author: XAbirHasan
Date:   Fri Dec 31 12:00:00 2022

Initial commit

$ git reset HEAD~2
$ git log
commit 21b912b
Author: XAbirHasan
Date:   Fri Dec 31 12:00:00 2022

Initial commit
```
In this example, the last two commits added a new feature and fixed a bug but they were not ready to be pushed. So, we used git reset to undo the changes and move the `HEAD` pointer two commits back.

## Reset Modes
git reset has three different modes: `--soft`, `--hard`, and `--mixed`.

- `--soft`: This mode does not reset the index or working tree files. It only moves the `HEAD` pointer to the specified commit and keeps the changes made in the commits in the working tree. This mode allows you to make additional changes before committing again.

- `--hard`: This mode resets the index and the working tree files to the state of the specified commit. It also moves the `HEAD` pointer to the specified commit. This mode discards all changes made in the commits and cannot be undone.

- `--mixed`: This mode is the default mode and is similar to `--soft`. It resets the index to the state of the specified commit but keeps the changes made in the commits in the working tree. This mode allows you to make additional changes before committing again.

## Reset the HEAD to origin/remote Branch
```
git reset origin/<branch-name>
```
This command will reset the local branch to match the state of the specified branch on the remote repository. It will also move the `HEAD` pointer to the latest commit of the specified branch. This can be useful if you want to bring your local branch up to date with the remote branch or if you want to discard local changes that were made but not yet committed.

Example:
```
$ git branch -a
* master
  remotes/origin/master
  remotes/origin/feature

$ git log
commit 2a468b8 (HEAD -> master)
Author: XAbirHasan
Date:   Mon Jan 2 12:00:00 2023

Added new feature

$ git reset origin/feature
$ git log
commit 8b291ab
Author: Jane Doe
Date:   Sat Jan 1 12:00:00 2023

Fixed bug
```
In this example, we have a local branch called "master" and two remote branches, "origin/master" and "origin/feature". We have made some changes in the local branch that were not ready to be pushed yet. But we want to reset our local branch to match the state of the "origin/feature" branch. So, we used git reset "origin/feature" to reset the local branch to match the state of the remote branch.

## Reset Last Merge Commit
```
git reset --merge HEAD~1
```
This command will undo the changes made in the last merge commit and move the `HEAD` pointer one commit back. It will also keep the changes made in the last merge commit in the working tree, allowing you to make additional changes before committing again.

### Abort Merge Commit
```
git reset --merge
```
This command will undo all changes made during the merge process and restore the state of the branches before the merge.

Alternatively, you can use the command:
```
git merge --abort
```
This command will also undo all changes made during the merge process and restore the state of the branches before the merge.

Both of these commands can be useful if you realize during a merge process that there are conflicts or errors that cannot be resolved, and you want to start over.

## Reset specific file state
```
git reset <file>
``` 
This command will `reset` a specific file to its state in the last commit. This can be useful if you made changes to a file that you want to discard.
Example:
```
$ git status
modified:   index.html

$ git reset index.html
$ git status
nothing to commit, working tree clean
```
In this example, we made changes to the file `index.html` but decided to discard them. So, we used `git reset index.html` to reset the file to its state in the last commit.

## Reset a specific file to its state in a specific commit
```
git reset <commit> <file>
```
This command will reset a specific file to its state in a specific commit. This can be useful if you want to revert a file to a previous state without affecting other files or commits.
Example:
```
$ git log
commit 2a468b8 (HEAD -> master)
Author: XAbirHasan
Date:   Mon Jan 2 12:00:00 2023

Added new feature

commit 8b291ab
Author: XAbirHasan
Date:   Sat Jan 1 12:00:00 2023

Fixed bug

$ git reset 8b291ab index.html
```
In this example, we have two commits, one that added a new feature and another that fixed a bug. We decided to revert the file index.html to its state in the commit that fixed the bug, so we used `git reset 8b291ab index.html` to reset the file to its state in that commit.

```
git reset -- <file>
```
This command is a shortcut for `git reset HEAD <file>`. It will reset a specific file to its state in the last commit.
Example:
```
$ git status
modified:   index.html

$ git reset -- index.html
$ git status
nothing to commit, working tree clean
```
In this example, we made changes to the file index.html but decided to discard them. So, we used `git reset -- index.html` as a shortcut for `git reset HEAD index.html` to reset the file to its state in the last commit.


## Reset file with its remote state
```
git reset <remote>/<branch> <file>
```
This command will reset a specific file to its state in a specific branch on a remote repository. This can be useful if you want to update a file from a remote branch without affecting other files or commits.
Example:
```
$ git log
commit 2a468b8 (HEAD -> master)
Author: XAbirHasan
Date:   Mon Jan 2 12:00:00 2023

Added new feature

$ git reset origin/develop index.html
```
In this example, we have a local branch called master and a remote branch called "origin/develop". We decided to update the file `index.html` from the remote branch "origin/develop", so we used `git reset origin/develop index.html` to reset the file to its state in that branch.

## Summary
In summary, `git reset` is a powerful command that allows you to undo or discard changes made in a previous commit or series of commits. It has several options and modes that can be used depending on the specific use case. It's important to understand the different modes and use cases before using this command, as it can be irreversible and may lead to loss of data.

It's important to note that all of these commands will discard changes and cannot be undone easily, so it's always a good idea to make a backup or use git stash before using them. 

Don't worry 😃; Even if you messed up with git, there is a way to recover everything.([checkout git reflog](/details/git-reflog.md))

