# Checking the Status of Your Files with Git

`git status` shows what's changed in your working directory and staging area relative to your last commit: which files are modified, staged, or untracked. It's usually the first thing worth running before deciding what to do next: stage something, discard something, or just get your bearings on a repository you haven't touched in a while.

## View File Status

```
git status
```

This is the most basic and most commonly used form. The output tells you the current branch, whether it's ahead/behind/up to date with its remote, and which files have been modified, added, or deleted but not yet committed.

Sample output:
```
On branch master
Your branch is up to date with 'origin/master'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   README.md

no changes added to commit (use "git add" and/or "git commit -a")
```
Here, the branch is `master`, it's up to date with `origin/master`, and `README.md` has been modified but not yet staged.

## Short Status

```
git status --short
```

The full output above gets noisy once you have more than a handful of changed files. `--short` condenses it to one line per file, using a letter code: `M` modified, `A` added, `D` deleted, `??` untracked. Useful for a quick scan when you just want to see which files changed, not the full explanation of each.

```
M README.md
```

## Machine-Readable Format

```
git status --porcelain
```

The `--porcelain` option causes `git status` to display the status in a machine-readable format, intended to be easy to parse by scripts and other automated tools. It looks similar to `--short`, but unlike `--short`, its format is guaranteed to stay stable across Git versions and user configuration, which is exactly what a script parsing the output needs.

```
M README.md
```

## Viewing File Differences

```
git diff <file>
```

`git status` tells you *that* a file changed; `git diff` shows you *how*: the actual line-by-line changes in your working directory compared to the repository. Run it before staging or committing to review exactly what you're about to save.

```
diff --git a/README.md b/README.md
index 0a1f2e3..4b5c6d7 100644
--- a/README.md
+++ b/README.md
@@ -1,5 +1,5 @@
 # My Project
```

## See Also

- [Git Diff](/commands/diff) - full diff reference
- [Git Add](/commands/add) - staging changes
- [Git Restore](/commands/restore) - discarding changes
