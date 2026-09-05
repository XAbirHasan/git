# Git Restore

Before Git 2.23, `git checkout` did three unrelated jobs: switching branches, creating branches, and restoring files, which made it confusing to reason about. Git 2.23 split it in two: `git switch` for branches, `git restore` for files. If you just want to discard a change or unstage something, `restore` is the clearer, purpose-built tool for it.

## Discarding Changes

```bash
git restore <file>
```

```bash
# Discard changes in single file
git restore file.txt

# Discard changes in multiple files
git restore file1.txt file2.txt

# Discard everything
git restore .
```

```
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

⚠️ This permanently discards uncommitted changes, there's no undo (more on recovering from a mistake below).

It also works for a file you deleted outright, not just edited, `restore` doesn't care how a tracked file changed, only that it did:
```bash
rm important.txt          # accidentally deleted
git restore important.txt # brought back from the last commit
```

## Unstaging

```bash
git restore --staged <file>
```

Moves a file from staged back to modified, without losing the changes themselves, the opposite of `git add`.


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

```bash
git restore --staged .                    # unstage everything
git restore --staged --worktree file.txt  # unstage AND discard, in one step
# or the shorthand
git restore -SW file.txt
```

## Working Tree vs. Staging Area

`restore` can target either half of a file's state independently, or both:

```bash
git restore --worktree <file>   # or -W, same as plain `git restore <file>`
git restore --staged <file>     # or -S, unstage only
git restore -SW <file>          # both: completely reverts the file to its last commit
```

## Restoring From a Specific Source

By default, restore pulls from your last commit. Point it elsewhere with `--source`:

```bash
git restore --source=HEAD~1 file.txt    # from the previous commit
git restore --source=main file.txt      # from another branch
git restore --source=abc123 file.txt    # from a specific commit
git restore --source=stash@{0} file.txt # from a stash
# shorthand: -s
```

## Restoring by Pattern

```bash
git restore src/          # a whole directory
git restore '*.js'        # everything matching a pattern
git restore **/*.css      # any depth
```

## Interactive Restore

```bash
git restore --patch <file>
# or
git restore -p <file>
```

Walks through the file's changes hunk by hunk, letting you discard some and keep others:

```
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

- `y` - discard this hunk
- `n` - keep this hunk
- `q` - quit
- `a` - discard this and all remaining
- `d` - keep this and all remaining
- `e` - manually edit
- `?` - help

Combine with `--staged` to unstage hunk by hunk instead: `git restore -Sp <file>`.

## Restore vs. Checkout vs. Reset

**Old way, `git checkout`:**
```bash
git checkout -- file.txt
git checkout HEAD file.txt
```
**New way, `git restore`:**
```bash
git restore file.txt
git restore --source=HEAD file.txt
```

**`git reset`** moves the branch pointer and can rewrite which commits exist, more powerful, more dangerous. **`git restore`** only ever touches files, never commits, which makes it the safer tool whenever a file is really all you're trying to fix.

Use `restore` for discarding or unstaging file changes. Use `reset` for undoing commits or moving where a branch points. Use `switch` (not the old `checkout`) for changing branches.

## Safety and Recovery

Before restoring, it's worth a quick look at what you're about to lose:
```bash
# See what will be discarded
git diff file.txt

# Then restore
git restore file.txt
```

If you're not sure yet, stash instead of restoring, it's reversible:
```bash
git stash
# work on something else, decide later:
git stash pop    # bring it back
git stash drop   # or actually discard it
```
Or, if you want to keep working on the change but somewhere separate, stash it straight into its own branch:
```bash
git stash branch temp-safety
```

**If you already restored by mistake:**
- If the change was ever committed (even briefly), `git reflog` may help you find it.
- If you'd stashed it, `git stash list` and `git stash pop` will bring it back.
- Some editors keep their own local history independent of Git (VSCode's Local History extension, IntelliJ's built-in Local History) worth checking immediately.

Content that was never staged, ever, is genuinely gone once restored, Git never created an object for it, so there's nothing left to find. If the change had been staged at some point before you restored it (even briefly, before further edits), there's a slim, unreliable chance it's still sitting in `.git/objects` as a dangling blob, findable with `git fsck --lost-found` until Git eventually garbage-collects it, but don't count on this working, it's a last resort, not a safety net. This is exactly why the "check the diff first" habit matters more here than almost anywhere else in Git.

## Aliases Worth Setting Up

```bash
# Discard changes
git config --global alias.discard 'restore'

# Unstage
git config --global alias.unstage 'restore --staged'

# Complete revert
git config --global alias.revert-file 'restore -SW'
```

## Troubleshooting

**Pathspec error:**
```bash
$ git restore file.txt
error: pathspec 'file.txt' did not match any files
```
Check the spelling and your current directory. If the file was never tracked, `restore` won't touch it, see below.

**Can't restore an untracked file:**
```bash
$ git restore new-file.txt
error: pathspec 'new-file.txt' did not match any file(s) known to git
```
`git restore` only works on files Git already tracks. For a genuinely untracked file, just delete it directly (`rm new-file.txt`) or use `git clean -f`.

**Restoring from a bad commit reference:**
```bash
$ git restore --source=wrong-commit file.txt
fatal: Invalid object name 'wrong-commit'
```
Double-check the SHA with `git log`, or use a relative reference like `HEAD~2` instead.

## See Also

- [Git Reset](/commands/reset) - resetting commits and branches, not just files
- [Git Branch](/commands/branch) - `git switch`, the modern replacement for `checkout`'s branch-switching half
- [Git Stash](/commands/stash) - temporarily setting changes aside instead of discarding them
- [Git Diff](/commands/diff) - reviewing changes before restoring
- [Git Add](/commands/add) - staging, the opposite direction of unstaging
