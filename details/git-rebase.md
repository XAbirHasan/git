# Rebase
Rebasing is an important concept in Git that allows you to reorganize the commit history of a branch. This helps you to streamline the branch history and make it more readable. The rebase command is used to change the base branch of your branch head. You can also use it to update your branch history, modify specific commits, or even squash multiple commits into one.

## Rebase Your Branch Head
The first use of the rebase command is to rebase your branch head. To do this, you need to specify the parent branch that you want to rebase to. Here's the syntax:
```
git rebase <parent-branch>
```
For example, if you have a branch named `feature-branch` that is based on the `master` branch, you can rebase the head of the feature-branch to the master branch with the following command:

```
git rebase master
```
This will update the branch head of `feature-branch` to the latest commit of the `master` branch.

## Interactive Rebase
The next use of the rebase command is the interactive rebase. This allows you to change specific commits or update your branch history. To do this, you need to specify the parent of the commit that you want to start the interactive rebase with. Here's the syntax:

```
git rebase --interactive <commit-sha>^
```
For example, if you want to start an interactive rebase on the parent of the commit with the SHA `ea5972f`, you can run the following command:

```
git rebase --interactive ea5972f^
```
This will open a file in your text editor where you can specify what you want to do with each commit in the branch. You can choose to `edit`, `pick`, `reword`, `squash`, `fixup`, or `drop` each commit. For example, if you want to change the message of the commit with the SHA `ea5972f2`, you can change the line in the file from `pick ea5972f2` Add new feature to `reword ea5972f2` Add new feature.

## Continue Rebase
```
git rebase --continue
```
This will continue the rebase process.

## Abort Rebase
If you want to abort a rebase, you can use the following command:
```
git rebase --abort
```
This will stop the rebase process and return

## How to use interactive rebasing?
Here is an example of how to use interactive rebasing to clean up the branch history.

1. First, make sure you are on the branch you want to rebase:
    ```
    $ git checkout my-feature-branch
    ```
2. Next, initiate an interactive rebase on the parent branch or specific commit of your feature branch:
    ```
    $ git rebase -i master
    ```
3. This will open your text editor and display the list of all the commits in your branch, with the newest commit at the bottom.
    ```
    pick 1234567 Add new feature
    pick 2345678 Add more functionality
    pick 3456789 Fix bug
    ```
4. To clean up your branch history, you can use the following keywords:
    - `pick`: Keep this commit as-is.
    - `reword`: Edit the commit message.
    - `squash`: Combine this commit with the previous one.
    - `fixup`: Combine this commit with the previous one, but discard the commit message.
    - `drop`: Discard this commit.
5. For example, if you want to squash the last two commits into one, you can change the list to:
    ```
    pick 1234567 Add new feature
    squash 2345678 Add more functionality
    fixup 3456789 Fix bug
    ```
6. Save and close the file. Git will then perform the rebasing, and prompt you to edit the commit message for the squashed commit:
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
    #
    # Date:      Tue Jan 10 14:00:00 2023 -0800
    #
    # rebase in progress; onto bcdef12
    # You are currently rebasing branch 'my-feature-branch' on 'master'.
    #
    # Changes to be committed:
    #	modified:   my-feature.py
    #
    ```
7. Edit the commit message to reflect the changes you made, save, and close the file. The rebasing process will continue.

8. If there are any conflicts during the rebasing process, Git will ask you to resolve them. Once all conflicts have been resolved, use the `git rebase --continue` command to continue the rebasing process. If you need to abort the rebasing, use the `git rebase --abort` command.

9. Once the rebasing process is complete, your branch history will be cleaned up, and the changes will be reflected in your remote repository.

Hope this example helps you understand how to use interactive rebasing in Git. Good luck! 👍
