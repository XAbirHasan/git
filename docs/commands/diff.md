# Git Diff

The `git diff` command is one of the most essential tools in Git. It shows you the differences between various states of your repository, helping you understand what has changed before committing, merging, or deploying code.

## Understanding Git Diff

Git diff shows changes between:
- Working directory and staging area (index)
- Staging area and last commit
- Two commits
- Two branches
- And much more!

## Basic Diff Commands

### View Unstaged Changes

Show changes in your working directory that haven't been staged yet:

```bash
git diff
```

This compares your working directory with the staging area (index).

**Example:**
```bash
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

### View Staged Changes

Show changes that are staged for the next commit:

```bash
git diff --staged
# or
git diff --cached
```

Both commands are equivalent and show differences between the staging area and the last commit.

**Example:**
```bash
$ git diff --staged
diff --git a/README.md b/README.md
index 1234567..abcdefg 100644
--- a/README.md
+++ b/README.md
@@ -1 +1,2 @@
 # My Project
+Documentation for the project
```

### View All Changes

Show both staged and unstaged changes:

```bash
git diff HEAD
```

This shows all changes in your working directory compared to the last commit.

## Comparing Commits

### Compare Specific Commits

```bash
# Compare two commits
git diff commit1 commit2

# Compare with a specific commit
git diff abc123

# Compare with previous commit
git diff HEAD~1

# Compare with 3 commits ago
git diff HEAD~3
```

**Example:**
```bash
$ git diff HEAD~1
# Shows what changed in the last commit
```

### Compare Commit with Working Directory

```bash
# Compare specific commit with current working directory
git diff 1a2b3c4
```

## Comparing Branches

### Compare Two Branches

```bash
# Show differences between branches
git diff branch1..branch2

# Alternative syntax (same result)
git diff branch1 branch2
```

**Example:**
```bash
$ git diff main..feature-login
# Shows what's different in feature-login compared to main
```

### Compare Current Branch with Another

```bash
# Compare your current branch with main
git diff main

# Compare with remote branch
git diff origin/main
```

### Three-Dot Syntax

Show changes in branch2 that aren't in branch1:

```bash
git diff branch1...branch2
```

This shows changes since the branches diverged (from their common ancestor).

**Example:**
```bash
$ git diff main...feature
# Shows only the changes made in 'feature' branch
```

## Comparing Specific Files

### Diff Specific File

```bash
# Unstaged changes in a file
git diff path/to/file

# Staged changes in a file
git diff --staged path/to/file

# Compare file between commits
git diff commit1 commit2 -- path/to/file

# Compare file between branches
git diff branch1 branch2 -- path/to/file
```

**Example:**
```bash
$ git diff main feature -- src/app.js
# Shows differences in app.js between main and feature branches
```

### Diff Multiple Files

```bash
# Compare multiple specific files
git diff file1.txt file2.txt

# Compare all files in a directory
git diff path/to/directory/
```

## Useful Diff Options

### Show Only File Names

```bash
# Show only names of changed files
git diff --name-only

# Show names and status (Added, Modified, Deleted)
git diff --name-status
```

**Example:**
```bash
$ git diff --name-status
M       src/app.js
A       src/newfile.js
D       src/oldfile.js
```

### Show Statistics

```bash
# Show statistics of changes
git diff --stat
```

**Example:**
```bash
$ git diff --stat
 README.md     | 10 ++++++++--
 src/app.js    | 25 ++++++++++++++-----------
 2 files changed, 22 insertions(+), 13 deletions(-)
```

### Short Format

```bash
# Compact summary
git diff --shortstat
```

### Word-Level Diff

```bash
# Show differences at word level instead of line level
git diff --word-diff
```

**Example:**
```bash
$ git diff --word-diff
The quick [-brown-]{+red+} fox jumps over the lazy dog
```

### Ignore Whitespace

```bash
# Ignore whitespace changes
git diff -w
# or
git diff --ignore-all-space

# Ignore whitespace at end of lines
git diff --ignore-space-at-eol

# Ignore changes in amount of whitespace
git diff -b
# or
git diff --ignore-space-change
```

### Color Options

```bash
# Force color output (useful for piping)
git diff --color

# No color output
git diff --no-color

# Show color-coded words
git diff --color-words
```

## Advanced Diff Techniques

### Diff with Context Lines

```bash
# Show 10 lines of context instead of default 3
git diff -U10

# Show entire file as context
git diff -U999999
```

### Compare with Stash

```bash
# Compare with latest stash
git diff stash

# Compare with specific stash
git diff stash@{1}
```

### Diff Output to File

```bash
# Save diff to a file
git diff > changes.diff

# Apply that diff later
git apply changes.diff
```

### Binary Files

```bash
# Show that binary files changed
git diff --binary
```

## Practical Examples

### Pre-Commit Review

Before committing, review all your changes:

```bash
# See what you're about to commit
git diff --staged
```

### Compare Your Branch with Remote

Check what's different from the remote repository:

```bash
# Compare with remote main branch
git diff origin/main

# Compare your branch with its remote tracking branch
git diff @{upstream}
```

### Review Changes in Pull Request

```bash
# See what changed in a branch
git diff main..feature-branch

# See only what changed since branching
git diff main...feature-branch
```

### Check What Will Be Merged

Before merging, see what changes will come in:

```bash
# Preview merge changes
git diff HEAD..other-branch
```

### Find When a Line Changed

```bash
# See changes in specific line range
git diff HEAD~5 -- path/to/file | grep "search-term"
```

## Diff Output Format

Understanding the diff output:

```diff
diff --git a/file.txt b/file.txt     # Files being compared
index 83db48f..bf269f4 100644         # Blob IDs and file mode
--- a/file.txt                        # Original file
+++ b/file.txt                        # Modified file
@@ -1,3 +1,4 @@                      # Line numbers: old file (1,3) new file (1,4)
 Line 1                               # Unchanged line
 Line 2                               # Unchanged line
+Line 3                               # Added line (+ prefix)
-Line 4                               # Deleted line (- prefix)
 Line 5                               # Unchanged line
```

### Symbols Meaning:
- `+` : Line added
- `-` : Line removed
- ` ` (space): Line unchanged
- `@@` : Chunk header with line numbers

## Aliases for Common Diff Commands

Add these to your Git config for faster access:

```bash
# View staged changes
git config --global alias.diffs 'diff --staged'

# View word diff
git config --global alias.diffw 'diff --word-diff'

# View compact stats
git config --global alias.diffst 'diff --stat'

# View diff with more context
git config --global alias.diffx 'diff -U10'
```

## Tips and Best Practices

1. **Review Before Committing**: Always run `git diff --staged` before committing
2. **Use Color**: Enable color for better readability: `git config --global color.diff auto`
3. **Ignore Whitespace**: Use `-w` when whitespace changes are not important
4. **Check Specific Files**: Narrow down diff to specific files for large changes
5. **Use Statistics**: `git diff --stat` gives a quick overview of changes
6. **Save Important Diffs**: Export diffs to files for documentation or review

## Common Workflows

### Workflow 1: Before Committing
```bash
# See what changed
git diff

# Stage some changes
git add file1.txt

# Review staged changes
git diff --staged

# Commit
git commit -m "Your message"
```

### Workflow 2: Comparing Branches
```bash
# Switch to feature branch
git checkout feature

# See what's different from main
git diff main

# See commits that will be merged
git log main..feature

# Merge when ready
git checkout main
git merge feature
```

### Workflow 3: Code Review
```bash
# Fetch latest changes
git fetch origin

# Compare your branch with remote main
git diff origin/main

# Compare with remote version of your branch
git diff origin/your-branch
```

## Troubleshooting

### Diff Shows No Changes

If `git diff` shows nothing:
- Changes might already be staged (use `git diff --staged`)
- No changes exist (use `git status` to confirm)
- You might be comparing identical states

### Too Much Output

If diff output is overwhelming:
- Use `git diff --stat` for summary
- Use `git diff --name-only` for just filenames
- Diff specific files: `git diff -- path/to/file`

### Binary File Changes Not Shown

Use `git diff --binary` or configure `.gitattributes` to treat files as text.

## Summary

The `git diff` command is essential for:
- ✅ Reviewing changes before committing
- ✅ Understanding what changed between branches
- ✅ Comparing different versions of code
- ✅ Code review and collaboration
- ✅ Debugging and tracking changes

Master `git diff` and you'll have much better control over your Git workflow!

## See Also

- [Git Status](./status.md) - Check repository status
- [Git Log](./log.md) - View commit history
- [Git Add](./add.md) - Stage changes
- [Git Commit](./commit.md) - Commit changes
