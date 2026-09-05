# Viewing the Commit History

`git log` shows the commit history of a repository: who made each commit, when, and why, starting with the most recent. Its many options let you reshape that output for whatever you're actually trying to find, whether that's a quick scan, a specific author's work, or the exact line that introduced a bug.

## View Git Logs

```
git log
```

The default, detailed format: full commit hash, author, date, and message for every commit.

```
commit 6c9f08a8b5f5d5f5f5f5f5f5f5f5f5f5f5f5f5f5
Author: XAbirHasan <abir@example.com>
Date:   Wed Jan 11 14:30:00 2023 -0800

    Add new feature to the application

commit 5c8f07a7b4f4d4f4f4f4f4f4f4f4f4f4f4f4f4f4
Author: XAbirHasan <abir@example.com>
Date:   Tue Jan 10 14:00:00 2023 -0800

    Fix bug in the login page
...
```

## View Logs in Single Line

```
git log --oneline
```

Condenses each commit to its short hash and message on one line. Useful for scanning a long history quickly, without the noise of full author/date blocks for every commit.

```
6c9f08a Add new feature to the application
5c8f07a Fix bug in the login page
f38f07b Refactor the login page
...
```

## View N Numbers of Logs

```
git log -n
```

Limits the output to the last `n` commits. `git log -1` shows just the most recent one, which is handy when you only care about what just happened rather than the full history.

```
commit 6c9f08a8b5f5d5f5f5f5f5f5f5f5f5f5f5f5f5f5
Author: XAbirHasan <abir@example.com>
Date:   Wed Jan 11 14:30:00 2023 -0800

    Add new feature to the application
```

## Log with Patch Changes

```
git log --patch
```

Shows the actual diff introduced by each commit, not just its message. Useful when you want to see *what* changed alongside *why*, without switching to `git show` for every commit individually.

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

## Showing Stats

```
git log --stat
```

Shows how many files each commit touched and how many lines were added/removed, with a summary at the end. Good middle ground between `--oneline` (too little detail) and `--patch` (too much).

```
commit 6c9f08a8b5f5d5f5f5f5f5f5f5f5f5f5f5f5f5f5
Author: XAbirHasan <abir@example.com>
Date:   Wed Jan 11 14:30:00 2023 -0800

    Add new feature to the application

main.py | 2 ++
1 file changed, 2 insertions(+)
```

## Short Stats

```
git log --shortstat
```

The same information as `--stat`, but just the summary line per commit, without the per-file breakdown. Use this when you want a sense of how big each commit was, not which files it touched.

```
commit 6c9f08a8b5f5d5f5f5f5f5f5f5f5f5f5f5f5f5f5
Author: XAbirHasan <abir@example.com>
Date:   Wed Jan 11 14:30:00 2023 -0800

    Add new feature to the application

1 file changed, 1 insertion(+), 1 deletion(-)
```

## Graphical View

```
git log --graph
```

Draws the branch and merge structure using ASCII lines alongside each commit, so you can see how branches diverged and came back together instead of just a flat list.

```
*   commit 6c9f08a8b5f5d5f5f5f5f5f5f5f5f5f5f5f5f5f5
|\
| * commit 5c8f07a7b4f4d4f4f4f4f4f4f4f4f4f4f4f4f4f4
| |
| * commit 4b7e069a3c3d3e3f3g3h3i3j3k3l3m3n3o3p3q3r
|/
*   commit 3c6d058a2b2c2d2e2f2g2h2i2j2k2l2m2n2o2p2q2r
```

## Logs Without Merge Commits

```
git log --no-merges
```

Excludes merge commits from the output. Useful on a branch with a lot of merges, where they'd otherwise drown out the actual feature commits you're trying to review.

## Showing References with Dates

```
git log --pretty=reference
```

Includes the branches and tags pointing at each commit alongside the hash, author, and date, so you can see at a glance which ref a given commit belongs to.

```
6c9f08a8b5f5d5f5f5f5f5f5f5f5f5f5f5f5f5f5 refs/heads/master
Author: XAbirHasan <abir@example.com>
Date:   Wed Jan 11 14:30:00 2023 -0800
...
```

## Commit History of a Specific File

```
git log -- <file>
```

Shows only the commits that touched `<file>`, which is much faster than scrolling the full project history when you're trying to understand when and why one file changed.

## Commit History of a Specific Author

```
git log --author=<name>
```

Filters the log to commits made by a specific person. Useful for reviewing someone's contribution, or narrowing things down when you already know who touched the code you're investigating.

## Commit History of a Specific Date Range

```
git log --since=<date> --until=<date>
```

Filters to commits made within a window of time, useful for questions like "what happened during last sprint" without scrolling past everything before it.

```
git log --since='2022-01-01' --until='2022-03-01'
```

## Commit History of a Specific Branch

```
git log <branch>
```

Shows the commit history reachable from `<branch>`, rather than your currently checked-out branch. Handy for checking what's on a branch before switching to it.

## Commit History of a Specific Commit

```
git show <commit>
```

Shows the full details, including the diff, of one specific commit. Use this when `git log`'s summary isn't enough and you need to see exactly what a single commit changed.

## Viewing the History of a Specific Line

```
git log -L <start line>,<end line>:<file path>
```

Most `git log` filters narrow by commit or file. `-L` narrows further, to a specific line range within a file, showing every commit that touched those lines and the diff each one produced. Combine it with `--pretty=short -u` for a more readable format:

```
git log --pretty=short -u -L <start line>,<end line>:<file name>
```

This is useful for tracing how a specific piece of logic evolved, or for debugging when a suspicious line was introduced, but don't treat it as a substitute for `git blame` when you specifically need line-by-line authorship.

Example: tracing line 20 of `index.html` across three commits that each modified it:

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
```

## Search for Code Within Git History

```
git log -S "CodeSnippet or searchString"
```

The `-S` ("pickaxe") option searches for commits that added or removed a specific string, which is much more targeted than reading through diffs looking for it. Combine it with other filters like `--author` or `--since` to narrow further:

```
git log --author="XAbirHasan" --since="2023-05-20" -S "console.log"
```

## Search for Commit Message Within Git History

```
git log --grep=<pattern>
```

Filters commits by their message instead of their content, useful when you remember roughly what a commit was called (e.g. it mentioned "bug") but not when it happened.

```
$ git log --grep="bug"
commit 123456789abcdef
Author: XAbirHasan <abir@example.com>
Date:   2023-05-20

    Fix bug in file.js

commit 987654321fedcba
Author: XAbirHasan <abir@example.com>
Date:   2023-05-18

    Fix bug in module.py
```

## See Also

- [Git Status](/commands/status) - checking current changes
- [Git Diff](/commands/diff) - viewing changes in detail
- [Git Bisect](/commands/bisect) - finding which commit introduced a bug
- [Git Reflog](/commands/reflog) - recovering commits that no longer show in `git log`
