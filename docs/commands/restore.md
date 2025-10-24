# Git Restore

`git restore` is a modern Git command (introduced in Git 2.23) that provides a clear way to restore files in your working tree and staging area. It's the recommended alternative to `git checkout` and `git reset` for file operations.

## Why Git Restore?

Before Git 2.23, `git checkout` was used for:
- Switching branches
- Restoring files
- Creating branches

This was confusing! Git 2.23 introduced:
- `git switch` - for switching/creating branches
- `git restore` - for restoring files

## Basic Restore Commands

### Discard Changes in Working Directory

Restore file to last committed state:

```bash
git restore <file>
```

**Example:**
```bash
# Discard changes in file.txt
git restore file.txt

# Discard changes in multiple files
git restore file1.txt file2.txt

# Discard all changes
git restore .
```

⚠️ **Warning:** This permanently discards uncommitted changes!

### Before and After

```bash
# Before
$ git status
Changes not staged for commit:
        modified:   file.txt

# Restore
$ git restore file.txt

# After
$ git status
nothing to commit, working tree clean
```

## Unstaging Files

### Unstage Staged Changes

```bash
git restore --staged <file>
```

This moves changes from staging area back to working directory without losing changes.

**Example:**
```bash
# Stage a file
$ git add file.txt

# Unstage it
$ git restore --staged file.txt

# Changes still in working directory
$ git status
Changes not staged for commit:
        modified:   file.txt
```

### Unstage All Files

```bash
# Unstage everything
git restore --staged .
```

### Unstage and Discard

```bash
# Unstage file
git restore --staged file.txt

# Then discard changes
git restore file.txt

# Or do both at once
git restore --staged --worktree file.txt
# or shorthand
git restore -SW file.txt
```

## Advanced Restore Options

### Restore from Specific Commit

```bash
# Restore file from specific commit
git restore --source=<commit> <file>

# Shorthand
git restore -s <commit> <file>
```

**Example:**
```bash
# Restore from previous commit
git restore --source=HEAD~1 file.txt

# Restore from specific commit
git restore --source=abc123 file.txt

# Restore from different branch
git restore --source=main file.txt
```

### Restore from Stash

```bash
# Restore file from stash
git restore --source=stash@{0} file.txt
```

### Restore Specific Paths

```bash
# Restore entire directory
git restore src/

# Restore by pattern
git restore '*.js'

# Restore all files with extension
git restore **/*.css
```

## Working Tree and Staging Area

### Working Tree Operations

```bash
# Restore working tree (default)
git restore --worktree <file>
# or shorthand
git restore -W <file>

# Same as
git restore <file>
```

### Staging Area Operations

```bash
# Restore staging area only
git restore --staged <file>
# or shorthand
git restore -S <file>
```

### Both Working Tree and Staging

```bash
# Restore both
git restore --staged --worktree <file>
# or shorthand
git restore -SW <file>

# This completely reverts file to last commit
```

## Interactive Restore

### Patch Mode

```bash
# Interactively restore hunks
git restore --patch <file>
# or
git restore -p <file>
```

This lets you selectively discard changes chunk by chunk.

**Example:**
```bash
$ git restore -p file.txt
diff --git a/file.txt b/file.txt
index 1234567..abcdefg 100644
--- a/file.txt
+++ b/file.txt
@@ -1,3 +1,4 @@
 Line 1
+Line 2 (added)
 Line 3
Discard this hunk from worktree [y,n,q,a,d,e,?]?
```

**Options:**
- `y` - discard this hunk
- `n` - keep this hunk
- `q` - quit
- `a` - discard this and all remaining
- `d` - keep this and all remaining  
- `e` - manually edit
- `?` - help

### Patch Unstaging

```bash
# Interactively unstage hunks
git restore --staged --patch <file>
# or
git restore -Sp <file>
```

## Common Workflows

### Workflow 1: Undo Unwanted Changes

```bash
# Made mistake, discard changes
git restore file.txt

# Or discard all changes
git restore .
```

### Workflow 2: Unstage Files

```bash
# Added too much
git add .

# Unstage specific file
git restore --staged unwanted-file.txt

# Commit only what you want
git commit -m "Focused commit"
```

### Workflow 3: Get File from Another Branch

```bash
# Get version of file from main branch
git restore --source=main config.js

# Keep your current changes in other files
```

### Workflow 4: Restore Deleted File

```bash
# Accidentally deleted file
rm important.txt

# Restore it
git restore important.txt
```

### Workflow 5: Partial File Restore

```bash
# Some changes are good, some bad
git restore -p file.txt

# Selectively discard bad changes
```

## Restore vs Other Commands

### Restore vs Checkout

**Old way (git checkout):**
```bash
git checkout -- file.txt
git checkout HEAD file.txt
```

**New way (git restore):**
```bash
git restore file.txt
git restore --source=HEAD file.txt
```

### Restore vs Reset

**git reset:**
- Moves branch pointer
- Can change commits
- More powerful, more dangerous

**git restore:**
- Only affects files
- Doesn't touch commits
- Safer for file operations

### When to Use Each

**Use `git restore` when:**
- Discarding file changes
- Unstaging files
- Getting file from different commit
- Working with files only

**Use `git reset` when:**
- Moving branch pointer
- Undoing commits
- Changing commit history

**Use `git checkout` (old) when:**
- Switching branches (use `git switch` instead)
- Creating branches (use `git switch -c` instead)

## Examples by Scenario

### Scenario 1: Discard All Changes

```bash
# Discard all unstaged changes
git restore .
```

### Scenario 2: Unstage Everything

```bash
# Unstage all staged files
git restore --staged .
```

### Scenario 3: Completely Revert File

```bash
# Revert file completely (staged + working)
git restore -SW file.txt
```

### Scenario 4: Get File from Last Commit

```bash
# Restore file from HEAD
git restore --source=HEAD file.txt
```

### Scenario 5: Get File from Previous Commit

```bash
# Restore from 3 commits ago
git restore --source=HEAD~3 file.txt
```

### Scenario 6: Undo Git Add

```bash
# Staged file by mistake
git add secret.env

# Unstage it
git restore --staged secret.env
```

### Scenario 7: Restore Directory

```bash
# Discard changes in entire directory
git restore src/
```

### Scenario 8: Restore Multiple Files

```bash
# Restore specific files
git restore file1.txt file2.js style.css
```

## Safety and Recovery

### Check Before Restoring

```bash
# See what will be discarded
git diff file.txt

# Then restore
git restore file.txt
```

### Can't Undo Restore!

⚠️ **Important:** `git restore` discards changes permanently. They **cannot** be recovered.

**Best practice:**
```bash
# Not sure? Create temporary commit first
git stash

# Or create temp branch
git stash branch temp-safety
```

### Recover After Accidental Restore

If you restored by mistake:

1. **Check reflog** (for committed changes):
```bash
git reflog
```

2. **Check stash** (if you stashed):
```bash
git stash list
git stash pop
```

3. **IDE recovery** (some IDEs have local history):
- VSCode: Local History extension
- IntelliJ: Local History built-in
- Vim: undo files

Unfortunately, **unstaged changes cannot be recovered** after restore!

## Best Practices

### 1. Review Before Restoring

```bash
# See what you're about to lose
git diff file.txt

# Then restore
git restore file.txt
```

### 2. Use Patch Mode for Precision

```bash
# Selective restoration
git restore -p file.txt
```

### 3. Stash If Unsure

```bash
# Not sure if you need changes?
git stash

# Work on something else

# Decide later
git stash pop  # or git stash drop
```

### 4. Commit Often

```bash
# Commit frequently to avoid losing work
git add .
git commit -m "WIP: work in progress"

# Amend later if needed
git commit --amend
```

### 5. Use Descriptive Sources

```bash
# Be explicit about source
git restore --source=main file.txt

# Not just
git restore file.txt
```

## Configuration

### Set Restore Defaults

```bash
# No special configuration needed
# git restore works out of the box
```

### Aliases for Common Operations

```bash
# Discard changes
git config --global alias.discard 'restore'

# Unstage
git config --global alias.unstage 'restore --staged'

# Complete revert
git config --global alias.revert-file 'restore -SW'
```

## Troubleshooting

### Restore Doesn't Work

```bash
$ git restore file.txt
error: pathspec 'file.txt' did not match any files
```

**Solution:**
- Check file exists
- Check spelling
- Check current directory
- File might be untracked (use `git clean`)

### Can't Restore Untracked File

```bash
$ git restore new-file.txt
error: pathspec 'new-file.txt' did not match any file(s) known to git
```

**Solution:**
- `git restore` only works on tracked files
- For untracked files, just delete them: `rm new-file.txt`
- Or use: `git clean -f`

### Restore from Non-Existent Commit

```bash
$ git restore --source=wrong-commit file.txt
fatal: Invalid object name 'wrong-commit'
```

**Solution:**
- Check commit exists: `git log`
- Use correct commit SHA
- Use HEAD~n for relative references

## Summary

Git restore is essential for:
- ✅ Discarding unwanted changes
- ✅ Unstaging files
- ✅ Getting files from other commits
- ✅ Cleaning up working directory
- ✅ Managing staged/unstaged states

**Key Commands:**
- `git restore <file>` - Discard changes
- `git restore --staged <file>` - Unstage
- `git restore -SW <file>` - Complete revert
- `git restore --source=<commit> <file>` - Get from commit
- `git restore -p <file>` - Interactive restore

**Key Takeaways:**
- Modern alternative to `git checkout` for files
- Clearer purpose than `git reset` for files
- **Cannot recover** discarded unstaged changes
- Always review before restoring
- Use patch mode for precision

## See Also

- [Git Reset](./reset.md) - Reset commits and branches
- [Git Checkout](./branch.md#switching-branches) - Switch branches (deprecated for files)
- [Git Stash](./stash.md) - Temporarily save changes
- [Git Diff](./diff.md) - View changes
- [Git Add](./add.md) - Stage changes
- [Git Status](./status.md) - Check repository status
