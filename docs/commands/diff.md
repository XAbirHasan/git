# Git Diff

`git diff` shows the actual line-by-line changes between two states of your repository, working directory vs. staging, staging vs. last commit, one commit vs. another, one branch vs. another. Where `git status` tells you *that* something changed, `diff` is how you see exactly *what*, before you commit, merge, or deploy it.

## Unstaged, Staged, and Combined

```bash
git diff
```
Unstaged changes: your working directory compared to the staging area.

```
$ git diff
diff --git a/file.txt b/file.txt
index 83db48f..bf269f4 100644
--- a/file.txt
+++ b/file.txt
@@ -1,3 +1,4 @@
 Line 1
 Line 2
+Line 3 (new line added)
 Line 4
```

```bash
git diff --staged
# or
git diff --cached
```
Staged changes: staging area compared to your last commit. Run this right before committing, it's exactly what your commit is about to contain.

```bash
git diff HEAD
```
Everything: staged and unstaged changes together, compared to the last commit.

## Comparing Commits

```bash
git diff commit1 commit2   # two specific commits
git diff HEAD~1            # compare with the previous commit
git diff HEAD~3            # compare with 3 commits ago
```

```bash
$ git diff HEAD~1
# shows what changed in the most recent commit
```

## Comparing Branches

```bash
git diff branch1..branch2
# or, equivalent
git diff branch1 branch2
```
Shows the direct difference between the two tips, as they are right now.

```bash
git diff branch1...branch2
```
The three-dot form is different: it compares `branch2` against the commit where the two branches diverged, so it shows only what `branch2` actually added, not anything that happened on `branch1` in the meantime. This is usually what you want when reviewing a feature branch, since `main` moving forward while you worked shouldn't show up as "your" changes.

```bash
$ git diff main...feature
# only the commits made on feature, not main's unrelated progress
```

## Comparing Specific Files

```bash
git diff path/to/file                        # unstaged
git diff --staged path/to/file                # staged
git diff commit1 commit2 -- path/to/file      # between commits
git diff branch1 branch2 -- path/to/file      # between branches
```

The `--` before a path just disambiguates it from a branch or commit name, needed whenever the two could be confused (a file named the same as a branch, for instance).

## Useful Options

```bash
git diff --name-only      # just the filenames
git diff --name-status    # filenames with A/M/D status
git diff --stat           # summary: files changed, lines +/-
git diff --shortstat      # just the final summary line
git diff --word-diff      # word-level instead of line-level
```

```
$ git diff --stat
 README.md     | 10 ++++++++--
 src/app.js    | 25 ++++++++++++++-----------
 2 files changed, 22 insertions(+), 13 deletions(-)
```

```
$ git diff --word-diff
The quick [-brown-]{+red+} fox jumps over the lazy dog
```

**Whitespace:**
```bash
git diff -w                      # ignore all whitespace differences
git diff --ignore-space-at-eol   # ignore trailing whitespace only
git diff -b                      # ignore changes in amount of whitespace
```
Useful when a reformat or an editor's auto-indent buried a real change under whitespace noise.

**Context lines:**
```bash
git diff -U10       # 10 lines of context instead of the default 3
git diff -U999999   # effectively the whole file
```

**Binary files:**
```bash
git diff --binary
```
By default Git just notes that a binary file changed, without showing a diff. `--binary` includes an actual binary patch in the output, one that `git apply` can use to reconstruct the file, which matters if you're saving the diff to apply somewhere else later.

## Reading the Output

```diff
diff --git a/file.txt b/file.txt     # files being compared
index 83db48f..bf269f4 100644         # blob IDs and file mode
--- a/file.txt                        # original version
+++ b/file.txt                        # modified version
@@ -1,3 +1,4 @@                       # old file: lines 1-3, new file: lines 1-4
 Line 1                               # unchanged
 Line 2                               # unchanged
+Line 3                               # added
-Line 4                               # removed
 Line 5                               # unchanged
```

`+` for added lines, `-` for removed, a leading space for unchanged context, `@@` marks a chunk header with the line ranges on each side.

## Aliases Worth Setting Up

```bash
git config --global alias.diffs 'diff --staged'
git config --global alias.diffw 'diff --word-diff'
git config --global alias.diffst 'diff --stat'
```
Now `git diffs`, `git diffw`, and `git diffst` work as shortcuts for the commands above.

## Common Workflows

**Before committing:**
```bash
git diff --staged
```
Always worth a look right before `git commit`, it's your last chance to catch something that shouldn't be there.

**Reviewing a feature branch:**
```bash
git diff main...feature-branch
```
Three dots, so you see only what the feature branch actually changed, not everything `main` gained while you were working.

## Troubleshooting

**`git diff` shows nothing:**
Either the changes are already staged (check `git diff --staged` instead), or there genuinely aren't any (`git status` will confirm).

**Too much output to make sense of:**
Start with `git diff --stat` for a summary, or narrow to one file with `git diff -- path/to/file`.

## See Also

- [Git Status](/commands/status) - checking what changed before diffing it
- [Git Log](/commands/log) - viewing commit history
- [Git Add](/commands/add) - staging the changes you've reviewed
- [Working with Patches](/tools/patch) - saving a diff to a file and applying it elsewhere
