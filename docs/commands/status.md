# Checking the Status of Your Files with Git

Git is a powerful version control system that allows developers to keep track of the changes made to their code. One of the most important aspects of Git is being able to check the status of your files, including which files have been modified, added, or deleted. This guide will cover some of the most useful `git status` commands and options that developers can use to check the status of their files.

## View File Status
```
git status
```
The `git status` command is the most basic and commonly used command for checking the status of your files in Git. It shows the changes that have been made to the files in your local repository, including modified, added, and deleted files. The output of this command will show the current branch you are on, the files that have been modified, and any files that have been added or deleted but not yet committed.

Example:
  ```
  On branch master
  Your branch is up to date with 'origin/master'.

  Changes not staged for commit:
    (use "git add <file>..." to update what will be committed)
    (use "git restore <file>..." to discard changes in working directory)
          modified:   README.md

  no changes added to commit (use "git add" and/or "git commit -a")
  ```
  In this example, the current branch is `master` and it's up to date with the `origin/master`. The output also shows that the file `README.md` has been modified but not yet committed.

## View Short Status
```
git status --short
```
If you want to see a more concise version of the status, you can use the `--short` option. This option displays the status in a shorter format, which is easier to read when you have a large number of files. The output will show the file status using a single letter code, such as `M` for modified, `A` for added, and `D` for deleted.

Example:
```
M README.md
```
In this example, `README.md` has been modified but not yet committed.

## View in Machine-Readable Format
```
git status --porcelain
```
The `--porcelain` option causes git status to display the status in a machine-readable format, which is intended to be easy to parse by scripts and other automated tools. The output will show the file status using a two-letter code, such as `M` for modified, `A` for added, and `D` for deleted.

Example:
```
M README.md
```
In this example, `README.md` has been modified but not yet committed.

## View File Differences
```
git diff <file>
```
This command shows the difference between the version of the file in your working directory and the version in the repository. It can be used to see the changes you have made to a specific file before committing them. The output will show the line-by-line differences between the two versions of the file.

Example:
```
diff --git a/README.md b/README.md
index 0a1f2e3..4b5c6d7 100644
--- a/README.md
+++ b/README.md
@@ -1,5 +1,5 @@
  # My Project
```