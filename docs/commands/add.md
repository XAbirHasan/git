# Git Add

`git add` moves changes from your working directory into the staging area (the "index"), which is where you assemble exactly what your next commit will contain. Nothing you edit becomes part of history until it passes through here, which is what lets you commit part of a change while leaving the rest for later.

## Adding Files

```bash
git add <file>
```

```bash
# Add single file
git add README.md

# Add multiple files
git add file1.txt file2.txt file3.txt
```

To stage everything at once:

```bash
# Add all changes in current directory and subdirectories
git add .

# Add all changes in entire repository
git add --all
# or, the shorthand
git add -A
```

These aren't quite the same: `git add .` stages changes in the current directory and below, while `-A`/`--all` stages changes across the entire repository regardless of where you run it from. If you're at the repo root they behave identically; if you're in a subdirectory, `.` won't touch changes elsewhere.

**Deletions and renames** stage the same way as any other change:
```bash
git add deleted-file.txt   # stages the deletion
# or, more explicit about intent
git rm deleted-file.txt

git mv old-name.txt new-name.txt   # renames and stages it in one step
```
Git detects renames automatically by comparing content, so `git add old-name.txt new-name.txt` after a manual rename works too, `git mv` is just a shortcut for the same result.

You can also add by pattern:

```bash
# All JavaScript files in the current directory
git add *.js

# Everything in a directory
git add src/

# All .txt files, any depth
git add **/*.txt
```

## Interactive and Patch Modes

```bash
git add --interactive
# or
git add -i
```

Opens a menu for staging changes selectively, one file or hunk at a time, instead of specifying paths on the command line:

```
$ git add -i
           staged     unstaged path
  1:    unchanged        +4/-2 file1.txt
  2:    unchanged        +1/-0 file2.txt

*** Commands ***
  1: status       2: update       3: revert       4: add untracked
  5: patch        6: diff         7: quit         8: help
What now>
```

The most useful mode within it, `patch`, has its own direct flag:

```bash
git add --patch
# or
git add -p
```

This walks you through your changes hunk by hunk (a hunk being one contiguous block of changed lines), asking what to do with each:

```
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

- `y` - stage this hunk
- `n` - don't stage this hunk
- `q` - quit, staging nothing else
- `a` - stage this and all remaining hunks
- `d` - stage neither this nor any remaining hunks
- `s` - split this hunk into smaller ones
- `e` - manually edit the hunk
- `?` - show this help

Patch mode is what makes atomic commits possible when a file has two unrelated changes mixed together: you can stage just the one that belongs in this commit and leave the other for later, without touching the file itself. It works on a specific file too:

```bash
git add -p file.txt
```

## Selective Staging

```bash
# Stage only files that already existed (skip new/untracked files)
git add -u
# or
git add --update
```

Useful when you've made a batch of edits across the repo but don't want to accidentally stage a scratch file you created alongside them.

```bash
# Track a new file without staging its contents yet
git add --intent-to-add <file>
# or
git add -N <file>
```

Normally `git diff` shows nothing for an untracked file, there's no previous version to compare against. `-N` tells Git "this file will exist" without staging its content, which makes `git diff` treat it as an empty file being modified, so you can review a new file's contents like any other change before committing it.

```bash
git add -N newfile.txt   # mark it as tracked, without staging content
git diff newfile.txt     # now shows the whole file as an addition
```

```bash
git add --dry-run .
# or
git add -n .
```

Shows what would be staged without actually staging it, useful for double-checking a broad pattern like `git add .` before committing to it.

```bash
# Add a file even though .gitignore excludes it
git add --force <file>
# or
git add -f <file>
```

```bash
git add -f config/secret.env   # forces a normally-ignored file in
```

⚠️ Only do this when you're certain the file belongs in version control. `.gitignore` usually excludes a file for a reason (build artifacts, secrets, local config), and forcing it in defeats that on purpose.

```bash
git add --verbose .
# or
git add -v .
```

Same as a normal add, but prints each file as it's staged, useful when a wildcard pattern makes it unclear exactly what got picked up.

## Checking What's Staged

```bash
git diff --staged
# or
git diff --cached
```

Shows exactly what will be in your next commit, as opposed to plain `git diff`, which shows unstaged changes. Get in the habit of running this right before committing.

```bash
git status
```

```
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

## Unstaging Files

```bash
git restore --staged <file>
# or, the pre-2.23 way
git reset HEAD <file>

# unstage everything
git restore --staged .
```

This moves a file back from staged to modified without discarding its changes, the opposite direction of `git add`. See [Git Restore](/commands/restore) for the full picture.

## Common Workflows

**Stage everything, quickly:**
```bash
git add .
git commit -m "Your message"
```

**Selective staging, for a focused commit:**
```bash
git add file1.txt file2.txt
git status
git commit -m "Update files 1 and 2"
```

**Interactive/patch staging, for mixed changes:**
```bash
git add -p
git diff --staged
git commit -m "Carefully staged changes"
```

## Troubleshooting

**Nothing seems to get staged:**
```
$ git add .
# no output
```
Check `git status` to confirm there really are changes, and that you're in the right directory. `git add` succeeding silently is normal, no output means it worked.

**Pathspec error:**
```
$ git add file.txt
fatal: pathspec 'file.txt' did not match any files
```
Check the spelling and your current directory (`ls file.txt`). It might also be excluded by `.gitignore`.

**File is ignored:**
```
$ git add config.env
The following paths are ignored by one of your .gitignore files:
config.env
```
Either it genuinely shouldn't be tracked, or `.gitignore` is too broad. Use `git add -f config.env` only if you're sure.

## Git Add vs. `commit -am`

```bash
# Add, then commit
git add file.txt
git commit -m "Update file"

# Add and commit modified files in one step
git commit -am "Update file"
```

`-am` is a shortcut, but only for files Git is already tracking. It won't pick up new, untracked files, so if your change includes a new file, you still need `git add` for that one explicitly.

## See Also

- [Git Commit](/commands/commit) - committing what you've staged
- [Git Status](/commands/status) - checking what's staged and what isn't
- [Git Diff](/commands/diff) - viewing changes before and after staging
- [Git Restore](/commands/restore) - unstaging and discarding changes
