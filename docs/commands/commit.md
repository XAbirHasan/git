# Commit
`git commit` is an essential command that allows developers to save changes to their codebase. Committing code is like taking a snapshot of your project at a specific point in time, allowing you to track and revert to previous versions of your code. The following are some useful options and commands for committing code using Git.

## Adding a Commit Message
The most basic form of committing code is to add a commit message using the `-m` option.

```
git commit -m "your message"
```
Example:

If you have made changes to a file called main.py and want to commit those changes with the message "Added new feature", you would use the following command:

```
$ git add main.py
$ git commit -m "Added new feature"
[master c1f2e3d4] Added new feature
 1 file changed, 1 insertion(+), 1 deletion(-)
```

## Adding Headline and Details
You can also add a headline and additional details in the commit message by using the `-m` option multiple times.

```
git commit -m "Headline" -m "details"
```
Example:

If you want to commit changes with the headline "Added new feature" and additional details "added new function to calculate average", you would use the following command:

```
$ git add main.py
$ git commit -m "Added new feature" -m "added new function to calculate average"
[master c1f2e3d4] Added new feature
 1 file changed, 1 insertion(+), 1 deletion(-)
```

## Reusing Commit Message from Another Commit
One of the powerful features of Git is the ability to reuse commit messages from previous commits. This can be useful when you want to make a similar change to multiple files, or when you want to group related commits together.

#### Using the `--reuse-message` or `-C` Option
```
git commit --reuse-message=<commit-sha>
```
This command will reuse the commit message from the specified commit (indicated by its SHA hash) for the new commit. It will also reuse the timestamp of the original commit.

Example:
```
$ git log --oneline
f6c9a6b Fix typo in README
8ecab1a Add new feature

$ git add README.md
$ git commit --reuse-message=f6c9a6b
```
In this example, we are reusing the commit message "Fix typo in README" and the timestamp of the commit with SHA hash "f6c9a6b" for a new commit.

#### Using the `--reedit-message` or `-c` Option
```
git commit --reedit-message=<commit-sha>
```
This command will reuse the commit message from the specified commit, but will also open the editor to allow you to make changes to the message.

Example:
```
$ git log --oneline
f6c9a6b Fix typo in README
8ecab1a Add new feature

$ git add README.md
$ git commit --reedit-message=f6c9a6b
```
In this example, git will open an editor to allow you to edit the message "Fix typo in README" before creating the new commit.

## Amending a Commit
```
git commit --amend
```
This command allows you to make changes to the last commit. This can be useful if you forgot to include some changes in the commit, or if you want to change the commit message. When you run this command, Git will open the commit message in your text editor so you can make changes. Once you save and exit the editor, the changes will be committed.

Example:
```
$ git commit -m "Initial commit"
$ git add forgot_to_include.txt
$ git commit --amend
```
In this example, the initial commit was made without the file forgot_to_include.txt. The git add command was used to stage the file and the `git commit --amend` command was used to add the file to the previous commit.

### Amending a Commit Without Changing the Commit Message
```
git commit --ammend --no-edit
```
The `--no-edit` option allows developers to make changes to the most recent commit without modifying the commit message. This can be useful if a developer needs to make a small change to their last commit, such as forgetting to add a file or fixing a typo in the commit message.

Example:
```
$ git commit -m "initial commit"
[master (root-commit) abcdef0] initial commit
 1 file changed, 2 insertions(+)
 create mode 100644 file.txt
 
$ git add forgotten-file.txt

$ git commit --amend --no-edit
[master abcdef0] initial commit
 2 files changed, 2 insertions(+)
 create mode 100644 file.txt
 create mode 100644 forgotten-file.txt
```
In this example, the first commit "initial commit" was made with only one file "file.txt", but later the developer realized that they forgot to add "forgotten-file.txt" to the commit. So by using git commit --amend --no-edit the last commit was updated to include the "forgotten-file.txt".

🚑 :exclamation:  **Please note** that this command **rewrites the commit history**, so use it with caution if the branch is already pushed to a remote repository or shared with other collaborators.
