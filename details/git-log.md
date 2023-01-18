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

