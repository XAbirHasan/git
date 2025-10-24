# Git Add

`git add` stages changes for your next commit. It's one of the most frequently used Git commands and the bridge between your working directory and the Git repository.

## Understanding Git Add

Git add moves changes from:
- **Working Directory** → **Staging Area (Index)**

The staging area lets you prepare a commit by selectively choosing what changes to include.

## Basic Add Commands

### Add Specific File

```bash
git add <file>
```

**Example:**
```bash
# Add single file
git add README.md

# Add multiple files
git add file1.txt file2.txt file3.txt
```

### Add All Changes

```bash
# Add all changes in current directory and subdirectories
git add .

# Add all changes in entire repository
git add --all

# Shorthand
git add -A
```

### Add by Pattern

```bash
# Add all JavaScript files
git add *.js

# Add all files in directory
git add src/

# Add all txt files in any directory
git add **/*.txt
```

## Interactive Adding

### Interactive Mode

```bash
git add --interactive
# or
git add -i
```

This opens an interactive menu with options to stage changes selectively.

**Example:**
```bash
$ git add -i
           staged     unstaged path
  1:    unchanged        +4/-2 file1.txt
  2:    unchanged        +1/-0 file2.txt

*** Commands ***
  1: status       2: update       3: revert       4: add untracked
  5: patch        6: diff         7: quit         8: help
What now>
```

### Patch Mode (Most Useful!)

```bash
git add --patch
# or
git add -p
```

This lets you stage changes **hunk by hunk** (chunk by chunk).

**Example:**
```bash
$ git add -p
diff --git a/file.txt b/file.txt
index 1234567..abcdefg 100644
--- a/file.txt
+++ b/file.txt
@@ -1,3 +1,4 @@
 Line 1
+Line 2 (added)
 Line 3
 Line 4
Stage this hunk [y,n,q,a,d,s,e,?]?
```

**Options:**
- `y` - stage this hunk
- `n` - don't stage this hunk
- `q` - quit (don't stage this or remaining)
- `a` - stage this and all remaining hunks
- `d` - don't stage this or any remaining hunks
- `s` - split into smaller hunks
- `e` - manually edit the hunk
- `?` - help

**Why use patch mode?**
- Stage only relevant changes
- Create focused commits
- Review changes before staging
- Separate unrelated changes

### Patch Specific File

```bash
# Interactive staging for specific file
git add -p file.txt
```

## Advanced Add Options

### Add Modified and Deleted Files Only

```bash
# Don't add new (untracked) files
git add -u

# or
git add --update
```

**Example:**
```bash
# Only stages modified and deleted files, ignores new files
$ git add -u
```

### Add with Intent

```bash
# Mark untracked file for tracking without staging content
git add --intent-to-add <file>
# or
git add -N <file>
```

**Use case:** See diff of untracked files before staging.

**Example:**
```bash
# Add intent to track new file
git add -N newfile.txt

# Now you can see diff
git diff newfile.txt
```

### Force Add Ignored Files

```bash
# Add file even if it's in .gitignore
git add --force <file>
# or
git add -f <file>
```

**Example:**
```bash
# Add file listed in .gitignore
git add -f config/secret.env
```

⚠️ **Warning:** Be careful adding ignored files!

### Dry Run

```bash
# Show what would be added without actually adding
git add --dry-run .
# or
git add -n .
```

**Example:**
```bash
$ git add -n .
add 'file1.txt'
add 'file2.txt'
add 'src/app.js'
```

### Verbose Add

```bash
# Show files being added
git add --verbose .
# or
git add -v .
```

## What to Add

### Add Modified Files

Files that already exist and have been changed:

```bash
git add modified-file.txt
```

### Add New Files

Files that are untracked:

```bash
git add new-file.txt
```

### Add Deleted Files

Files that you've deleted:

```bash
# Mark deletion for staging
git add deleted-file.txt

# Or use git rm
git rm deleted-file.txt
```

### Add Renamed Files

Git usually detects renames automatically:

```bash
# After renaming (Git detects it)
git add old-name.txt new-name.txt

# Or use git mv
git mv old-name.txt new-name.txt
```

## Checking What's Staged

### See Staged Changes

```bash
# Show what's staged
git diff --staged

# or
git diff --cached
```

### See Status

```bash
# Check what's staged and unstaged
git status
```

**Example:**
```bash
$ git status
On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   file1.txt
        new file:   file2.txt

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
        modified:   file3.txt
```

## Common Workflows

### Workflow 1: Add Everything

```bash
# Stage all changes
git add .

# Commit
git commit -m "Your message"
```

### Workflow 2: Selective Staging

```bash
# Stage specific files
git add file1.txt file2.txt

# Check what's staged
git status

# Commit
git commit -m "Update files 1 and 2"
```

### Workflow 3: Interactive Staging

```bash
# Interactive mode
git add -i

# Or patch mode for granular control
git add -p

# Review staged changes
git diff --staged

# Commit
git commit -m "Carefully staged changes"
```

### Workflow 4: Stage Modified Only

```bash
# Stage only modified files (not new files)
git add -u

# Commit
git commit -m "Update existing files"
```

### Workflow 5: Review Before Adding

```bash
# See what changed
git diff

# Add specific changes
git add -p

# Verify what's staged
git diff --staged

# Commit
git commit -m "Reviewed changes"
```

## Unstaging Files

### Unstage File

```bash
# Modern way (Git 2.23+)
git restore --staged <file>

# Traditional way
git reset HEAD <file>

# Unstage everything
git restore --staged .
# or
git reset HEAD
```

**Example:**
```bash
# Unstage specific file
git restore --staged README.md

# Check status
git status
```

## Best Practices

### 1. Review Before Adding

```bash
# Always check what changed
git diff

# Then add
git add file.txt
```

### 2. Use Patch Mode for Mixed Changes

```bash
# When file has unrelated changes
git add -p file.txt
```

### 3. Make Atomic Commits

```bash
# Stage related changes together
git add feature1.js feature1.test.js
git commit -m "Add feature 1"

git add feature2.js feature2.test.js
git commit -m "Add feature 2"
```

### 4. Check Status Frequently

```bash
# Before adding
git status

# After adding
git status

# Before committing
git status
```

### 5. Use Meaningful Stages

Don't just `git add .` mindlessly. Stage changes that belong together.

## Common Patterns

### Add All Modified and New Files

```bash
git add -A
# or
git add --all
```

### Add All Files in Directory

```bash
git add src/
```

### Add Files by Extension

```bash
# Add all JS files
git add *.js

# Add all CSS files in any directory
git add **/*.css
```

### Add Multiple Specific Files

```bash
git add file1.txt file2.js src/app.css
```

## Troubleshooting

### Nothing to Add

```bash
$ git add .
# No output (nothing staged)
```

**Solution:**
- Check if files changed: `git status`
- Make sure you're in the right directory
- Check if files are already staged

### File Not Staged

```bash
$ git add file.txt
fatal: pathspec 'file.txt' did not match any files
```

**Solution:**
- Check file exists: `ls file.txt`
- Check spelling
- Check you're in correct directory
- File might be in .gitignore

### Added Wrong Files

```bash
# Unstage everything
git restore --staged .

# Or unstage specific file
git restore --staged wrong-file.txt

# Re-add correct files
git add correct-file.txt
```

### Can't Add Ignored File

```bash
$ git add config.env
The following paths are ignored by one of your .gitignore files:
config.env
```

**Solution:**
```bash
# Force add if really needed
git add -f config.env

# Or remove from .gitignore
```

## Git Add vs Git Commit

### Add Then Commit (Normal Way)

```bash
# Stage changes
git add file.txt

# Commit staged changes
git commit -m "Update file"
```

### Commit with Auto-Add

```bash
# Add and commit modified files in one step
git commit -am "Update file"
```

⚠️ **Note:** This only works for **modified** files, not new files!

## Understanding the Staging Area

### Why Stage?

1. **Review changes** before committing
2. **Selective commits** - choose what to include
3. **Atomic commits** - group related changes
4. **Flexibility** - stage parts of files

### Three States of Files

1. **Modified** - changed but not staged
2. **Staged** - marked for next commit
3. **Committed** - stored in repository

## Configuration

### Set Default Behavior

```bash
# Auto-stage deleted files
git config --global add.ignoreRemoval false
```

### Ignore Whitespace

```bash
# Ignore whitespace changes when adding
git config --global apply.whitespace nowarn
```

## Summary

Git add is essential for:
- ✅ Staging changes for commits
- ✅ Selective change management
- ✅ Creating focused commits
- ✅ Reviewing changes before committing
- ✅ Building commit history

**Key Commands:**
- `git add <file>` - Stage specific file
- `git add .` - Stage all changes
- `git add -p` - Interactive patch mode
- `git add -u` - Stage modified only
- `git add -A` - Stage everything

**Key Takeaways:**
- Always review before adding (`git diff`)
- Use patch mode for granular control
- Stage related changes together
- Check status frequently
- Unstage with `git restore --staged`

## See Also

- [Git Commit](./commit.md) - Committing changes
- [Git Status](./status.md) - Checking status
- [Git Diff](./diff.md) - Viewing changes
- [Git Restore](./restore.md) - Restoring files
- [Git Reset](./reset.md) - Resetting changes
