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
In this example, the local repository has three branches master, feature-1, and feature-2. The branch with an asterisk(*) is the current branch.

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
In this example, the branch feature-B was renamed to feature-B-fix

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