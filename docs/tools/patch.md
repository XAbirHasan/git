# Patch: what & why?

A patch is a file describing the changes made to one or more files, in the standard `diff` format: which lines were added, removed, or modified, and where. Use it to share changes without handing over your whole codebase, or to apply someone else's changes to your own copy.

Patches can conflict with the target code, especially when applying them to a different version of the codebase than they were generated against. Check with `git apply --check` before applying for real (see below).

## Make a patch file

```
git diff > fileName.patch
```

`git diff` writes your unstaged changes to stdout; redirect it to a file to save them as a patch. Handy for handing a change to a collaborator, or attaching it to an issue, without giving them repo access.

```
git diff > main.c.patch
```

This captures your unstaged changes to `main.c` into `main.c.patch`.

## Patch from staged changes

Add `--staged` (or the equivalent `--cached`) to include only what's staged with `git add`. Use this when you've staged part of a larger change and only want to share that slice.

```
git diff --staged > fileName.patch
// or
git diff --cached > fileName.patch
```

```
git diff --staged > main.c.patch
```

## Apply patch changes

```
git apply fileName.patch
```

`git apply` applies the patch to your working tree directly, without creating a commit. Good for a quick local test of someone's change before you decide whether to commit it.

```
git apply main.c.patch
```

## Patch from the last n commits

`git format-patch -n <sha>` writes one patch file per commit, starting from `<sha>`. Use it over plain `git diff` when you want to preserve commit boundaries, authors, and messages, for example to email a series of patches or hand off a reviewable commit history.

```
git format-patch -3 HEAD
```

This produces three files, one for each of the last three commits reachable from `HEAD`.

## Apply patch changes (format-patch)

```
git am < file.patch
```

`git am` applies a patch created by `format-patch` and creates a commit for each one, including the original author and message. This is the key difference from `git apply`, which only touches the working tree.

```
git am < main.c.patch
```

## Revert a patch

`git apply -R` undoes a patch that was applied with `git apply`. Use it when a patch turns out to be wrong or unwanted after the fact, instead of hand-reverting the edits.

```
git apply -R fileName.patch
```

```
git apply -R main.c.patch
```

## Check a patch before applying it

`git apply --check` verifies a patch will apply cleanly without touching your files:

```
git apply --check fileName.patch
```

```
git apply --check main.c.patch
```

## Inspect a patch

`git show` prints a patch file's changes, author, and commit message:

```
git show fileName.patch
```

```
git show main.c.patch
```

## Patch for specific files

Pass paths after `--` to limit the diff to those files. Useful when your working tree has unrelated changes mixed in and you only want to patch out one feature's worth.

```
git diff -- file1 file2 > fileName.patch
```

```
git diff -- main.c main.h > main.patch
```

## Patch between two commits

Compares two commits directly, without generating one file per commit in between. Good for seeing the net effect of a range at once.

```
git diff <commit-sha1> <commit-sha2> > fileName.patch
```

```
git diff abc123 def456 > changes.patch
```

## Patch between two branches

Same idea, applied to branch tips. Handy for previewing what a feature branch would change before merging it into master.

```
git diff <branch1> <branch2> > fileName.patch
```

```
git diff master feature > changes.patch
```

## Patch for specific files between two commits

Combine the file filter with a commit range:

```
git diff <commit-sha1> <commit-sha2> -- <file1> <file2> > fileName.patch
```

```
git diff abc123 def456 -- main.c main.h > changes.patch
```

## Notes

Test patches, especially cross-commit or cross-branch ones, with `git apply --check` before applying them for real: conflicts are easy to hit when the target code has diverged.
