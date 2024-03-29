# Git Branching
Branching is an essential feature in Git that allows developers to work on multiple features or bug fixes in parallel without affecting the main codebase. This guide will cover some of the most commonly used git branching commands and options that developers can use to manage their branches.

## Show Current Branch

```
git branch --show-current
```
This command shows the current branch you are on. This command is useful if you want to quickly check which branch you are working on.

Example:
```
$ git branch --show-current
master
```
In this example, the current branch is master.

## List of All Local Branch
```
git branch
// or
git branch --list
```
This command lists all the branches in your local repository. This command is useful if you want to see the branches that you have created or worked on.

Example:
```
$ git branch
* master
  feature-1
  feature-2
```
In this example, the local repository has three branches "master", "feature-1", and "feature-2". The branch with an asterisk(*) is the current branch.

## List All Remotes Branch
```
git branch --remotes
```
This command lists all the branches in the remote repository. This command is useful if you want to see the branches that other collaborators have created or worked on.

Example:
```
$ git branch --remotes
origin/master
origin/feature-1
origin/feature-2
```
In this example, the remote repository has three branches origin/master, origin/feature-1, and origin/feature-2.

## List Branch With Last Commit

```
git branch --verbose
// or
git branch -v
```
This command lists all the branches along with the last commit. This command is useful if you want to see the branches along with the last commit.

Example:

```
$ git branch -v
* master               a3f4882 Update README.md
  feature-1            d32bc31 Implement new feature
  feature-2
```

## See the branches that have been merged into the current branch
```
git branch --merged
```
This command will show all the branches that have been already merged into the current branch. This is useful to keep track of which branches have been completed and can be safely deleted.

Example:
```
$ git branch --merged
  develop
  feature-A
  * master
```
In this example, the branches "develop" and "feature-A" have been already merged into the current branch master.

## Create a new branch

```
git branch -b "branch name"
```
This command will create a new branch with the specified name and switch to it. This is useful when starting to work on a new feature or bug fix.

Example:

```
$ git branch -b feature-B
Switched to a new branch 'feature-B'
```
In this example, a new branch called feature-B was created and the user is now working on it.

## Rename a branch

```
git branch -m "the renamed branch"
```
This command will rename the current branch to the specified name. This is useful when you need to change the name of a branch for better organization or clarity.

Example:

```
$ git branch -m feature-B-fix
```
In this example, the branch "feature-B" was renamed to "feature-B-fix"

## Delete a branch
```
git branch --delete "branch name"
```
This command will delete the specified branch. This is useful when a branch is no longer needed and can be safely removed.

Example:
```
$ git branch --delete feature-A
```
In this example, the branch "feature-A" was deleted.

## Force delete a branch

```
git branch --delete --force "branch name"
// or
git branch -D "branch name"
```
This command will forcefully delete the specified branch. It is useful for deleting branches that have not been fully merged or for deleting branches that have unmerged changes.

Example:
```
$ git branch -D feature-branch
```
In this example, the "feature-branch" is forcefully deleted.

## Delete a remote branch:
```
git push origin --delete "branch name"
```
This command will delete the specified branch from the remote repository. It is useful for cleaning up branches that are no longer needed on the remote.

Example:
```
$ git push origin --delete old-feature-branch
```
In this example, the "old-feature-branch" is deleted from the remote repository "origin".

## Checkout to a specific branch:
```
git checkout "branch name"
```
This command will switch to the specified branch. It is useful for switching between branches to work on different features or bug fixes.

## Switch between recent two branches:
```
git checkout -
```
This command will switch to the most recently checked out branch. It is useful for quickly switching between branches.


# git switch (git 2.23 and onwards)
## Create a branch:
```
git switch --create "branch name"
```
This command is the same as `git branch -b` and will create a new branch with the given name and switch to it.

Example:

```
$ git switch --create new-feature-branch
```

## Checkout to a specific branch:
```
git switch "branch name"
```
This command is the same as `git checkout` and will switch to the specified branch

## Switch between recent two branches:
```
git switch -
```
This command is the same as git checkout - and will switch to the most recently checked out branch.

# Why should you use git branch?
In summary, Git branches are an important aspect of version control, allowing developers to work on multiple features or bug fixes in parallel. The commands listed above provide various ways to manage branches, including creating new branches, switching between branches, and deleting branches that are no longer needed. The `git switch` command is a new addition to git and is similar to the existing `git branch` and `git checkout` commands. It is available in git version 2.23 and onwards.