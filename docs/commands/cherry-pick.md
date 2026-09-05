# Cherry-Pick

Ever needed just one commit from another branch, without merging the whole thing? That's what `git cherry-pick` is for: it takes a specific commit and replays it onto your current branch, as if you'd made that change here yourself.

## When You'd Use It

**Applying a bug fix to a stable branch.** Say you're mid-way through a feature that'll take a few more days, but you've also fixed a critical bug on the same branch. You don't want to wait for the whole feature to ship before the fix goes out. Cherry-pick lets you copy just that bug fix onto your stable branch and release it right away.

**Grabbing one feature out of a long-running branch.** Say `feature-b` has a specific improvement you need in `feature-a`, but `feature-b` isn't ready to merge as a whole. Cherry-pick the one commit you actually need:

```
git checkout feature-a
git cherry-pick <feature-b-commit-hash>
```

## Basic Usage

1. Check out the branch you want the commit applied to:
    ```
    git checkout <target_branch>
    ```
2. Find the commit you want, `git log` works, or any Git history tool.
3. Cherry-pick it:
    ```
    git cherry-pick <commit_hash>
    ```

Git applies that commit's changes on top of your current branch as a new commit.

## Cherry-Picking Multiple Commits

By individual hashes, applied one after another:
```
git cherry-pick <commit_hash1> <commit_hash2> <commit_hash3>
```

Or as a range:
```
git cherry-pick <start_commit_hash>^..<end_commit_hash>
```
This applies every commit from `<start_commit_hash>` through `<end_commit_hash>`, inclusive.

If the commits touch overlapping code, you may hit conflicts partway through. Git pauses and lets you resolve them before continuing. And since cherry-picking multiple commits replays them individually onto a new base, always double-check the result actually matches what you expected, it's easy for the combined effect to come out slightly different than it looked on the original branch.

## Cherry-Pick Without Committing

```
git cherry-pick -n <commit-hash>
# or
git cherry-pick --no-commit <commit-hash>
```

Applies the commit's changes to your working directory and staging area, but doesn't create a commit. Useful when you want to review or combine the change with something else before committing it yourself.

## Editing the Commit Message

```
git cherry-pick --edit <commit-hash>
# or
git cherry-pick -e <commit-hash>
```

Opens the commit message in your editor before finalizing, so you can adjust it (for example, to note that this is a cherry-pick from another branch) instead of keeping the original message as-is.

## Canceling a Cherry-Pick

**Mid-conflict, not finished yet:**
```
git cherry-pick --abort
```
Backs out completely and restores your branch to how it was before you started.

**Already completed, and you want to undo it:**
```
git reset --hard HEAD~1
```
This removes the most recent commit, which is the one the cherry-pick created. If you cherry-picked several commits and want to undo all of them, use `HEAD~n` for however many you applied:
```
git reset --hard HEAD~3
```

⚠️ `--hard` discards any uncommitted changes along with the cherry-picked commits. Stash anything you want to keep before running it.

## See Also

- [Git Rebase](/commands/rebase) - moving a whole branch instead of individual commits
- [Git Revert](/commands/revert) - undoing a commit without rewriting history
- [Git Reflog](/commands/reflog) - recovering a commit after an accidental hard reset
