# Git Revert

`git revert` undoes a commit by creating a brand new commit with the opposite changes, rather than deleting or rewriting the original. That makes it the safe choice for undoing something that's already been pushed and shared, unlike `git reset`, it never rewrites history, so it won't create a diverged-branch mess for anyone else who's already pulled the commit you're undoing.

You'll reach for it in a few common situations:

- A commit turns out to contain a mistake or a bug, and you want it gone without touching anything that came after it.
- A range of commits was made in error and needs undoing together, not one at a time.
- You want to temporarily back out a change to test a different approach, then bring it back later if the experiment doesn't pan out, reverting the revert works just as well.

Since it adds a commit instead of erasing one, it's also easy to undo the undo if you change your mind.

## Reverting a Single Commit

```
git revert <commit-sha>
```

```
git revert 56789abc
```

This creates a new commit that undoes exactly what `56789abc` did, whatever it added, this removes; whatever it removed, this restores.

## Controlling the Commit Message

```
git revert --edit <commit-sha>
```

Opens the auto-generated revert message in your editor so you can add context before committing, useful when "why" matters more than the default "Revert '...'" message conveys.

```
git revert --no-edit <commit-sha>
```

The opposite: commits immediately with the default message, no editor. Good for a quick, low-stakes revert where the default message says enough.

## Reverting Without Committing

```
git revert --no-commit <commit-sha>
# or -n
```

Stages the reverted changes but stops short of committing, so you can review them, combine the revert with something else, or revert several commits into one combined commit before committing anything.

```
git revert --no-commit abc123
git revert --no-commit def456
git commit -m "Revert two related commits together"
```

## Reverting Multiple Commits

```
git revert <commit1> <commit2> <commit3>
```

Reverts each commit individually, one revert commit per original commit.

```
git revert abc123 def456 xyz789
```

## Reverting a Range of Commits

```
git revert <first-bad-commit>^..<last-bad-commit>
```

Reverts every commit in that range at once, from `<first-bad-commit>` through `<last-bad-commit>` inclusive. The `^` after the first SHA is what makes the range inclusive of it, without it, that commit would be excluded.

```
git revert abc123^..ghi789
```

## Reverting a Merge Commit

Merge commits need an extra flag because they have two parents, and Git needs to know which one represents "how things should look" once the revert is done:

```
git revert -m 1 <merge-commit-sha>
```

`-m 1` is what you want in the overwhelming majority of cases: it undoes everything the merge introduced, restoring the state as if the merge had never happened, while leaving the merge commit itself in history untouched (revert never deletes commits, it only adds one).

```
git revert -m 2 <merge-commit-sha>
```

`-m 2` reverts relative to the *other* parent instead, a rare, easy-to-misuse operation that usually isn't what you actually want. Unless you specifically understand why you need the second parent's perspective, stick with `-m 1`.

⚠️ **Note:** `-m` here means "mainline parent number," it has nothing to do with commit messages, despite `git commit -m` using the same letter for something completely different. `-m` is also *only* valid when reverting a merge commit, using it on a regular commit is a usage error.

## Reverting One File's Changes From a Commit

There's no `git revert` flag for this, revert always operates on whole commits. To undo just one file's changes from a specific commit, check out that file's pre-commit state directly and commit it as a normal change:

```
git checkout <commit>^ -- path/to/file
git commit -m "Revert path/to/file to its state before <commit>"
```

This restores `path/to/file` to how it looked right before `<commit>`, without touching anything else that commit changed.

## See Also

- [Git Reset](/commands/reset) - rewrites history instead of adding to it, faster but unsafe on shared branches
- [Git Cherry-Pick](/commands/cherry-pick) - the opposite operation, reapplying a commit rather than undoing one
- [Git Merge](/commands/merge) - how merge commits and their parents work
- [Git Log](/commands/log) - finding the commit SHA you need to revert
