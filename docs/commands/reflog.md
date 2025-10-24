# Git Reflog: The Ultimate Insurance Policy

Git reflog is a powerful feature in git that acts as an insurance policy for your repository. It allows you to recover from mistakes and return to a previous state in your repository even after you have committed and pushed your changes. This feature is especially useful when you have lost or accidentally deleted some important files.


## View the reference logs
```
git reflog
```
This command is used to view the reference logs of your repository. The reference logs show a list of all the changes made in your repository, including the branch and tag updates, commit messages, and more. The default expiry time of reference logs is 90 days.

Example:
```
$ git reflog
8b5a5ba HEAD@{0}: checkout: moving from master to test
f5c3376 HEAD@{1}: commit: add new feature
2e67ae6 HEAD@{2}: checkout: moving from test to master
a5b2411 HEAD@{3}: commit: fix bug
```
Use Case: 

Suppose you have committed a change to your repository and then realized that it was a mistake. You can use the reference logs to see the previous state of your repository and return to that state.

## Set an expiry time
``` 
git config gc.reflogExpire <time>
```
This command is used to set the expiry time for the reference logs in your repository. The default expiry time is `90 days`, but you can set it to any desired time. For instance, you can set the expiry time to `180 days` or `never`.

Example:
```
// set for 180 days
$ git config gc.reflogExpire 180.days

// set never
$ git config gc.reflogExpire never
```

Use Case: 

If you want the reference logs to persist for a longer period of time, you can set the expiry time to a longer duration. On the other hand, if you don't want the reference logs to expire at all, you can set the expiry time to "never".

## View the expiry time
```
git config --get gc.reflogExpire
```
This command is used to view the current expiry time for the reference logs in your repository.

Example:

```
$ git config --get gc.reflogExpire

180.days
```
Use Case: 

This command can be used to confirm the current expiry time for reference logs in your repository.

## Unset the expiry time
```
git config --unset gc.reflogExpire
```
This command is used to unset the expiry time for reference logs in your repository. After running this command, the reference logs will expire after the default time of `90 days`.

Use Case: 

If you have set the expiry time to a longer duration or never, and now you want the reference logs to expire after the default time of 90 days, you can use this command.

## Tree view of git reflog (works with gitk)
```
gitk --all git reflog | cut -c1-7`
```
This command is used to view a tree view of the reference logs in your repository. This command can only be used with `gitk`.

Use Case: 

This command can be used to visualize the reference logs in your repository and see the different states of your repository in a graphical form. This can be useful when you need to see the history of changes in your repository and understand the relationships between different commits and branches.

## Recovering a Deleted Commit in Git
Git provides a powerful mechanism to recover a deleted commit by using the reflog. The reflog is a local database of all the changes that have happened to the repository and its branches. With the reflog, you can get back any deleted commit, even if you have made additional commits after the deletion.

Here are some use cases for recovering a deleted commit:

- You made a mistake in your last commit and you want to undo it.
- You deleted a commit by accident and you want to get it back.
- You need to use a specific version of your code that you deleted earlier.

## Resetting Your Last Commit
The most common reason for deleting a commit is because you made a mistake in your last commit and you want to undo it. You can undo the last commit by resetting it to its previous state. This is typically done using the `git reset --hard HEAD~1` command.

```
git reset --hard HEAD~1
```

## Recovering a Deleted Commit from Reflog
If you have made any commits after deleting the original commit, you can still recover it using the reflog. Here are the steps to recover a deleted commit from the reflog:

1. List the reflog history:
    ```
    git reflog
    ```
2. Find the deleted commit in the reflog history by its commit message, author, or the time it was created.

3. Add the commit to the repository using the `git cherry-pick` command. You can use either the commit's `SHA` or the reference to its position in the reflog (e.g. `@HEAD{number}`).

```
git cherry-pick <commit-sha | @HEAD{number}>
```

## Copying Commit Message from the Reflog
You can also copy the commit message from the reflog when creating a new commit. There are two options for copying the commit message:

1. `--reuse-message` or `-C`: This option allows you to reuse the commit message without editing it.
    ```
    git commit --reuse-message=<commit-sha | @HEAD{number}>
    // or 
    git commit -C <commit-sha | @HEAD{number}>
    ```
2. `--reedit-message` or `-c`: This option allows you to reuse the commit message and edit it before creating the new commit.
    ```
    git commit --reedit-message=<commit-sha | @HEAD{number}> 
    // or 
    git commit -c <commit-sha | @HEAD{number}>
    ```
## Recover Deleted Branch using Git Reflog

- You accidentally deleted a branch, and you need to recover it.
- You have multiple branches, and you want to revert back to an older branch.

In these situations, Git reflog is an extremely helpful feature to have in your Git toolkit. By using Git reflog, you can recover deleted branches and revert back to older branches with ease.

### Steps to recover deleted branch
1. List the Reflog history

    First, you need to see the reflog history to find the commit that you want to recover your deleted branch. You can use the following command to list the reflog history:

    ```
    git reflog
    ```
    This command will show you a list of all the reference updates that have happened in your repository, including branch updates.

2. Find your deleted branch in the Reflog history

    Look through the reflog history to find the commit that corresponds to the deleted branch.

3. Checkout to the deleted branch

    Once you have found the commit that corresponds to your deleted branch, you can use the following command to checkout to the deleted branch:

    ```
    git checkout -b "branch-name" <commit-sha | @HEAD{number}>
    ```
    Replace `branch-name` with the name of your deleted branch (you can also give it any name) and `<commit-sha | @HEAD{number}>` with the `commit sha` or `HEAD number` that you found in the reflog history. This will create a new branch with the same name as your deleted branch and point it to the commit you found.

Example:

Let's assume you have a branch called feature-branch, and you accidentally deleted it. To recover it using git reflog, you can follow these steps:

```
// Step 1: List the Reflog history
$ git reflog

// Step 2: Find your deleted branch in the Reflog history
$ git reflog
7f0736d HEAD@{0}: branch: deleted feature-branch
b2d25b7 HEAD@{1}: checkout: moving from feature-branch to master
:(more)

// Step 3: Checkout to the deleted branch
$ git checkout -b "feature-branch" 7f0736d
Switched to a new branch 'feature-branch'
```

In this example, we used `git reflog` to find the commit that corresponds to the deleted branch and then checkout to the deleted branch using the `git checkout` command. Now, the deleted branch is recovered, and you can start working on it again.


## Moving to previous HEAD
- if you want to move to previous HEAD
  ```
  git reset --hard HEAD@{1}
  ```
- if you want to move to the specific HEAD
  ```
  git reset --hard HEAD@{<number>}
  ```

## View Git Reflog with date
- if you want to view git reflog with date
  ```
  git reflog show --date=local
  ```
- if you want to view git reflog with relative date
  ```
  git reflog show --date=relative
  ```

## Un-do git reset
If you want to un-do git reset:
1. list the reference logs
    ```
    git reflog
    ```
2. find the reset reference
3. then reset it again
    ```
    git reset --hard <commit-sha | @HEAD{number}>
    ```

## Some drawbacks of git reflog
- **Git reflog is only available locally and does not provide a way to share the reference logs with others**: Git reflog is only available on the local machine where the repository is stored. It does not provide a way to share the reference logs with others, making it unsuitable for use in team environments where collaboration is required.

- **The information in the reference logs may become outdated or irrelevant if the repository is not frequently used or if the reference logs are not updated regularly**: If the repository is not frequently used or if the reference logs are not updated regularly, the information in the reference logs may become outdated or irrelevant. This can make it difficult to use the reference logs to recover from mistakes.

- **Git reflog is not a permanent solution for preserving the history of your repository**: While git reflog is useful for recovering from mistakes, it is not a permanent solution for preserving the history of your repository. If you use the git gc command to clean up your repository, the reference logs will be deleted, even if the expiry time is set to never.

- **If you use the `git gc` command, the reference logs will be deleted even if the expiry time is set to never**: This is because the git gc command is designed to clean up the repository and remove any data that is not needed, including the reference logs.

- **Regular backup or use of other version control systems is necessary to ensure the safety and security of your data**: In order to ensure that your data is safe and secure, it is important to regularly backup your repository or use other version control systems.

- **The reference logs can be difficult to interpret, especially for someone who is not familiar with git and version control systems**: The information in the reference logs can be difficult to interpret, especially for someone who is not familiar with git and version control systems. This can make it challenging to use the reference logs to recover from mistakes or to understand the history of the repository.


## 🚫 Avoid Using These Commands
❗ Ensure that you are doing what you are supposed to do before using these commands.
- Clean old or unapproachable reflog entries
  ```
  git reflog expire
  ```
- Delete reflog entries
  ```
  git reflog delete
  ```
  
It is highly recommended not to use these commands as they can result in permanent data loss. Only use these commands if you have a clear understanding of what they do and their potential consequences.
