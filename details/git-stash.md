# Git stash (Temporary storage)
Git stash is a command that allows you to temporarily save changes that you have made to your working directory, without committing them. This is useful when you need to switch to a different branch or pull in changes from a remote repository, but you don't want to lose your current work.

## Stash changes
```
$ git stash
```
This command will save the changes in your working directory to a new stash, and revert your working directory to the state of the last commit. You can then switch branches or pull in changes without losing your work.

## Add a custom message when stashing
```
$ git stash push -m "your message"
```
This command works the same way as the regular git stash command, but it allows you to add a custom message to describe the changes that you are stashing. This can be useful for keeping track of what you were working on.

## Include untracked (new) files
```
$ git stash --include-untracked
// or
$ git stash -u
```
By default, git stash only saves changes to files that are already being tracked by Git. If you want to save changes to new files that haven't been added to the repository yet, you can use the `--include-untracked` or `-u` option.

## Include untracked and ignored files
```
$ git stash --all
```
This command works the same way as the git stash `--include-untracked` command, but it also saves changes to files that are being ignored by Git. This can be useful if you have files that you don't want to commit, but you still want to save their changes.

## View stash list
```
$ git stash list
```
This command will show a list of all the stashes that you have created, along with their descriptions (if you added any). Each stash is identified by a unique name, called the stash head.

## Apply last stash changes
```
$ git stash pop
```
This command will apply the changes from the most recent stash to your working directory. The stash will be removed from the list of stashes after it is applied.

## Apply specific stash changes
```
$ git stash pop <stash-head>
```
This command works the same way as the git stash pop command, but it allows you to specify which stash you want to apply by its stash head.

## Apply stash changes without deleting it
```
$ git stash apply <stash-head>
```
This command will apply the changes from the specified stash to your working directory, but it will not remove the stash from the list of stashes.


## See stash changes
```
$ git stash show <stash-head>
```
This command will show the changes that were made in the specified stash.

## View path changes
```
$ git stash show --patch <stash-head>
```
This command will show the changes that were made in the specified stash, but it will show the changes made in a patch format, which makes it easier to see the specific changes made to each file.

## Creating a branch from a stash
```
$ git stash branch "branch-name" <stash-head>
```
This command allows you to create a new branch and apply the changes from the specified stash to it. This can be useful if you want to test your stash changes or work on them in a separate branch. This command is also helpful in a case where reapplying stash might create conflict and you want to test you stash changes or make new branch.

## Delete a stash
```
$ git stash drop <stash-head>
```
This command will remove the specified stash from the list of stashes.

## ❗Clear all stashes
```
$ git stash clear
```
This command will remove all stashes from the list of stashes, be careful with this command, make sure you know what you are doing, as <b>_it's not reversible_</b>.