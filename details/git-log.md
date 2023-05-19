# Viewing the Commit History

The `git log` command is used to view the commit history of a repository. It shows a list of commits, starting with the most recent, along with the author, date, and commit message. There are various options and flags that can be used with the `git log` command to customize the output and make it more useful for developers.

## View Git Logs

```
git log
```
This command will show the commit history of the repository in a detailed format, including the commit hash, author, date, and commit message.

Example:
```
commit 6c9f08a8b5f5d5f5f5f5f5f5f5f5f5f5f5f5f5f5
Author: XAbirHasan <abir@example.com>
Date:   Wed Jan 11 14:30:00 2023 -0800

Add new feature to the application

commit 5c8f07a7b4f4d4f4f4f4f4f4f4f4f4f4f4f4f4f4
Author: XAbirHasan <abir-hasan@example.com>
Date:   Tue Jan 10 14:00:00 2023 -0800

Fix bug in the login page
:(more..)
```

## View Logs in Single Line
```
git log --oneline
```
This option will display the commit history in a single line format, showing only the first 7 characters of the commit hash and the commit message. This is useful when you want to quickly scan through the commit history without having to scroll through multiple lines.

Example:
```
6c9f08a Add new feature to the application
5c8f07a Fix bug in the login page
f38f07b Refactor the login page
:(more..)
```

## View n Numbers of Logs
```
git log -n
```
This option allows you to specify the number of commits that you want to view. For example, `git log -1` will show the most recent 1 commits.

Example:

```
commit 6c9f08a8b5f5d5f5f5f5f5f5f5f5f5f5f5f5f5f5
Author: XAbirHasan <abir@example.com>
Date:   Wed Jan 11 14:30:00 2023 -0800

    Add new feature to the application
```

## Log with patch changes
```
git log --patch
```
This option shows the differences introduced in each commit, this is also known as the patch.

Example:
```
commit 6c9f08a8b5f5d5f5f5f5f5f5f5f5f5f5f5f5f5f5
Author: XAbirHasan <abir@example.com>
Date:   Wed Jan 11 14:30:00 2023 -0800

    Add new feature to the application

diff --git a/main.py b/main.py
index d5f5f5f..f5f5f5f 100644
--- a/main.py
+++ b/main.py
@@ -1,5 +1,7 @@
def main():
    print("Hello, World!")

+   print("This is new feature")
+
```
## Showing stats
```
git log --stat
```
This option shows how many files were changed, and how many lines in those files were added and removed. It also puts a summary of the information at the end.

Example:
```
commit 6c9f08a8b5f5d5f5f5f5f5f5f5f5f5f5f5f5f5f5
Author: XAbirHasan <abir@example.com>
Date:   Wed Jan 11 14:30:00 2023 -0800

    Add new feature to the application

main.py | 2 ++
1 file changed, 2 insertions(+)
```
## Sort stats
```
git log --shortstat
```
This option is similar to the `--stat` option but it shows the information in a more condensed format.

Example:
```
commit 6c9f08a8b5f5d5f5f5f5f5f5f5f5f5f5f5f5f5f5
Author: XAbirHasan <abir@example.com>
Date:   Wed Jan 11 14:30:00 2023 -0800

    Add new feature to the application

1 file changed, 1 insertion(+), 1 deletion(-)
```
## Graphical view
```
git log --graph
```
This option will display the commit history in a graphical format, showing the branch and merge history.

Example:
```
*   commit 6c9f08a8b5f5d5f5f5f5f5f5f5f5f5f5f5f5f5f5
|\  
| * commit 5c8f07a7b4f4d4f4f4f4f4f4f4f4f4f4f4f4f4f4
| |  
| * commit 4b7e069a3c3d3e3f3g3h3i3j3k3l3m3n3o3p3q3r
|/  
*   commit 3c6d058a2b2c2d2e2f2g2h2i2j2k2l2m2n2o2p2q2r
```
## Logs without merge commits
```
git log --no-merges
```
This option will exclude merge commits from the output, only showing commits that are not merge commits.

## Showing references with dates
```
git log --pretty=reference
```
This option will display the commit history in a format that includes the commit hash, author, and date, but also includes the references (branches and tags) that point to the commit.

Example:
```
6c9f08a8b5f5d5f5f5f5f5f5f5f5f5f5f5f5f5f5 refs/heads/master
Author: XAbirHasan <abir@example.com>
Date:   Wed Jan 11 14:30:00 2023 -0800

:(more)
```

## Showing the Commit History of a Specific File
```
git log -- <file>
```
This command will show the commit history for a specific file. This can be useful for seeing when and why a particular file was modified.

## Showing the Commit History of a Specific Author
```
git log --author=<name>
```
This command will show the commit history for a specific author. This can be useful for seeing all the commits made by a particular person.


## Showing the Commit History of a Specific Date Range
```
git log --since=<date> --until=<date>
```
This command will show the commit history within a specific date range. This can be useful for seeing the commits made during a particular time period.

Example:
```
git log --since='2022-01-01' --until='2022-03-01'
```

## Showing the Commit History of a Specific Branch
```
git log <branch>
```
This command will show the commit history for a specific branch. This can be useful for seeing the commits made to a particular branch.

## Showing the Commit History of a Specific Commit

```
git show <commit>
```
This command will show the details of a specific commit. This can be useful for seeing the changes made in a particular commit.


## View git history of specific line
The `git log` command allows you to view the commit history of a Git repository. If you want to view the Git history of a specific line in a file, you can use the `-L` option to specify the line range of interest.

Here is a generic example of how to use the git log command to view the Git history of a specific line in a file:

```
git log -L <start line>,<end line>:<file path>
```

Also you can use
```
git log --pretty=short -u -L <start line>,<end line>:<file name>
```

The output of this command will show the commit history for the specified line range, along with the changes made in each commit.

It's important to note that using Git to view the history of specific lines can be useful for debugging or understanding changes made to a specific part of a file, but it is not recommended to rely on Git to determine the ownership or authorship of a specific line of code.

Explanation of the options used:
- `--pretty=short` specifies the format of the commit log output, in this case using a short format that includes only the first line of the commit message, the author, and the date.

- `-u` stands for "unified" and is used to show the changes made in a unified diff format. The `git log -u` command is useful for seeing the detailed history of changes made to your files and can be useful for debugging, understanding the history of a project, or reviewing changes made by others.

- `-L <start line>,<end line>:<file name>` specifies the line range of interest for the specified file. Replace `<start line>` with the starting line number, `<end line>` with the ending line number, and `<file path>` with the path of the file.


Example:

Suppose you have a repository with a file named `"index.html"` that you've been working on. Over time, you've made several commits to the file. You want to see the Git history of a specific line of code in the file, line `20` in this case.


```
$ git log --pretty=short -u -L 20,20:index.html

commit abc123
Author: User3
Date:   Mon Jan 30 11:00:00 2023

Modified line 20 in index.html

diff --git a/index.html b/index.html
index 123456..abcdef 123
--- a/index.html
+++ b/index.html
@@ -19,6 +19,6 @@
 <body>
   <p>Line 19</p>
-  <p>Line 20 (old)</p>
+  <p>Line 20 (new)</p>
   <p>Line 21</p>
 </body>

commit def456
Author: User2
Date:   Sun Jan 29 01:00:00 2023

Modified line 20 in index.html

diff --git a/index.html b/index.html
index abcdef..def123 123
--- a/index.html
+++ b/index.html
@@ -19,6 +19,6 @@
 <body>
   <p>Line 19</p>
-  <p>Line 20 (old)</p>
+  <p>Line 20 (new)</p>
   <p>Line 21</p>
 </body>

commit ghi789
Author: User1
Date:   Sat Jan 28 12:00:00 2023

Modified line 20 in index.html

diff --git a/index.html b/index.html
index def123..ghi456 123
--- a/index.html
+++ b/index.html
@@ -19,6 +19,6 @@
 <body>
   <p>Line 19</p>
-  <p>Line 20 (old)</p>
+  <p>Line 20 (new)</p>
   <p>Line 21</p>
 </body>
```

In this example, the output of the `git log --pretty=short -u -L 20,20:index.html` command includes the changes made to line `20` in each of the commits. The `diff` output shows the difference between the old version of the file (denoted by `--- a/index.html`) and the new version of the file (denoted by `+++ b/index.html`). The `@@` lines indicate the range of lines that have changed, and the `-` and `+` symbols show which lines have been added or removed.

## Search for `code` within Git history
You can use the `git log command` along with the `-S` option, which stands for "pickaxe" or "string" search. This option allows you to search for a specific string or code snippet that was either added or removed in the commits.

Here's an example of how to use the `-S` option to search for a code snippet:
```
git log -S "CodeSnippet or searchString"
```

You can also provide additional options to further refine your search, such as `--author` to search for commits by a specific author or `--since` and `--until` to specify a date range.

For example, let's say you want to search for the code snippet `"console.log"` added by a specific author named `"XAbirHasan"` since a certain date:
```
git log --author="XAbirHasan" --since="2023-05-20" -S "console.log"
```

## Search for `commit message` within Git history
When searching git log by commit message, you can use the `git log --grep=<pattern>` option. It allows you to find commits with commit messages that match a specific pattern or keyword.

For example, you're searching for "bug" keyword:
```
git log --grep="bug"
```
history:
```
commit 123456789abcdef
Author: XAbirHasan <abir@example.com>
Date:   2023-05-20

    Fix bug in file.js

commit 987654321fedcba
Author: XAbirHasan <abir@example.com>
Date:   2023-05-18

    Fix bug in module.py
.
.
.
```
