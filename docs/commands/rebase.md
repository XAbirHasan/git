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
Here, `<commit-sha>` is the commit reference you want to start the rebase from, and `^`(caret) means parent to that commit. 

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


## Adding Fixup Commit
A fixup commit is a type of commit that allows you to quickly apply changes to a specific commit. This can be useful when you want to add changes to a previous commit without creating a new commit or modifying the commit history. The command to add a fixup commit is:
```
git commit --fixup=<commit-sha>
```
Here, `<commit-sha>` is the commit reference you want to add the changes to. 

For example, if you want to add changes to the second last commit, you can run the following command:
```
git commit --fixup=HEAD^
```
This will create a new commit with the changes and mark it as a fixup commit.

<b>Notes</b>: Remember you need to perform <b>auto squash</b> in order to clean your commit history.

## Auto Squash Commit
Auto squashing allows you to combine multiple commits into one. This can be useful when you want to clean up your commit history or make it easier to read. The command to auto squash commits is:

```
git rebase --interactive --autosquash <commit-sha>
```
Where <commit-sha> is the unique identifier for the commit that you want to squash with the preceding fixup commit. The `--interactive` flag specifies that you want to perform an interactive rebase and the `--autosquash` flag tells Git to automatically rearrange the commit that you are fixing up with the commit that has the matching `--fixup` message.

The `--autosquash` option is used with the interactive rebase to automatically squash fixup commits with the corresponding commit.

### Use case:

- Suppose you have a series of commits and one of the commits needs to be fixed.
- Instead of rewriting the whole history, you can use the `--fixup` option to create a new commit with the changes.
- Later, you can use the `--autosquash` option during interactive rebase to automatically squash the fixup commit with the corresponding commit.

### Example 1:

```
# create a new branch for the example
git checkout -b rebase_example

# make some changes and commit them
echo "file1" > file1.txt
git add file1.txt
git commit -m "add file1"

# make some more changes and commit them
echo "file2" > file2.txt
git add file2.txt
git commit -m "add file2"

# make a mistake and commit the changes with --fixup option
echo "fixup" > file2.txt
git add file2.txt
git commit --fixup=HEAD^

# use --autosquash option to squash the fixup commit with the corresponding commit
git rebase -i --autosquash HEAD~3
```
The above example will show the interactive rebase editor with the fixup commit already marked for squashing with the corresponding commit. You can save and exit the editor to complete the rebasing process. The final history will show only the correct changes and the fixup commit will be gone.


### Example 2:
Here is another example of how to perform auto squash in Git:

1. First, you need to have multiple commits that you want to squash into a single commit.
    ```
    $ git log --oneline
    1116d17 Refactor code
    3f3d85d Add more functionality
    7d90ee3 Fix bug
    ea5972f Add new feature
    83dba5d Initial commit
    ```
2. Use the git rebase command with the `--interactive` and `--autosquash` options to start an interactive rebase, specifying the `HEAD~4^` (the parent of the 4th commit from the current `HEAD`) as the base. This will cause Git to automatically group all of the `fixup!` commits with the corresponding commits that they fix.
    ```
    $ git rebase --interactive --autosquash HEAD~4^

    pick 1116d17 Refactor code
    pick 3f3d85d Add more functionality
    f 7d90ee3 Fix bug
    f ea5972f Add new feature

    # Rebase 83dba5d..1116d17 onto 83dba5d (4 commands)
    #
    # Commands:
    # p, pick = use commit
    # r, reword = use commit, but edit the commit message
    # e, edit = use commit, but stop for amending
    # s, squash = use commit, but meld into previous commit
    # f, fixup = like "squash", but discard this commit's log message
    # x, exec = run command (the rest of the line) using shell
    #
    # These lines can be re-ordered; they are executed from top to bottom.
    #
    # If you remove a line here THAT COMMIT WILL BE LOST.
    #
    # However, if you remove everything, the rebase will be aborted.
    #
    # Note that empty commits are commented out
    ```
3. Run the rebase. Git will now automatically squash the `fixup!` commits into the corresponding commits.
    ```
    $ git rebase --continue
    ```
4. Successfully rebased and updated refs/heads/master.
Verify the result by running `git log`. You will see that the separate `fixup!` commits have been squashed into their corresponding commits.
    ```
    $ git log --oneline
    1116d17 Refactor code
    3f3d85d Add more functionality
    ea5972f Add new feature
    83dba5d Initial commit
    ```
In this example, the `Fix bug` and A`dd new feature` commits have been automatically squashed into their corresponding commits during the interactive rebase. This makes the commit history more readable and streamlined, while still preserving the changes made in each separate commit.


## The Golden Rules of Git Rebasing

Rebasing is a powerful tool in Git that can change the history of a branch. It allows you to take a set of existing commits and reapply them on top of a different branch. However, it is important to follow some guidelines to ensure that your changes are properly merged and your Git history remains intact.

1. Never use rebasing on public or dependent branches:

    Rebasing on public or dependent branches can cause problems as it can override the hash of existing commits and potentially cause conflicts with other developers who have cloned the branch.

2. Know exactly what you are doing:

    Before using rebasing, it is important to fully understand how it works and the potential consequences of your actions. If you are unsure, it is best to seek guidance from experienced😎 Git users. Also, be aware that rebasing can result in force pushes, which can override the remote branch and 💣erase previous history.

In conclusion, Git rebasing is a useful tool for updating your branch history and keeping it organized, but it should be used with caution. By following the golden rules, you can ensure that your Git repository remains in a stable state and your changes are properly merged.

## Notes
It is important to note that rebasing can cause conflicts and should be used with caution, as it can `overwrite` existing history. It is best practice to use rebase in a `private branch` and to perform a merge with the main branch only after the rebase is complete.
