# Cherry-pick
The `git cherry-pick` is a command used to apply a specific commit from one branch onto another branch. It allows you to pick a commit and apply its changes to a different branch, even if they are not directly connected through merging.
 
## Use-case
### Applying bug fixes to a stable branch

Imagine you're working on a feature that will take a few more days to complete. However, within the same branch, you've also fixed some critical bugs. In such a scenario, you can utilize Git cherry-pick to selectively copy the bug fixes from one branch to another (e.g., from a bug-fix branch to your main branch) and proceed with making a release.

### Incorporating a specific feature from another branch

Suppose you are working on a long-term feature branch `(feature-a)` but need to include a specific feature that was developed and committed in a different branch `(feature-b)`. You can cherry-pick the commit containing the desired feature from `feature-b` onto your `feature-a` branch:
```
git checkout feature-a
git cherry-pick <feature-b-commit-hash>
```
This allows you to selectively merge the specific feature commit into your branch without merging the entire feature-b branch.

### Command
Here's an example of how to use `git cherry-pick`:

1. Start by checking out the branch where you want to apply the commit:
    ```
    git checkout <target_branch>
    ```
2. Identify the commit you want to cherry-pick. You can find the commit hash by using `git log` or other Git history visualization tools.
3. Cherry-pick the commit onto the target branch:
    ```
    git cherry-pick <commit_hash>
    ```
Replace `<commit_hash>` with the actual commit hash you want to cherry-pick.

Once the cherry-pick command is executed, Git will apply the changes made by the chosen commit onto the current branch.

## Cherry-pick multiple commits onto the current branch
You can cherry pick multiple commits at once.

- Cherry-pick multiple commits using individual commit hashes:
    ```
    git cherry-pick <commit_hash1> <commit_hash2> <commit_hash3>
    ```
This command applies the changes from each specified commit onto the current branch one by one.
- Cherry-pick a range of commits using commit hashes:
    ```
    git cherry-pick <start_commit_hash>^..<end_commit_hash>
    ```
This command applies the changes from all the commits within the specified range onto the current branch.

When `cherry-picking` multiple commits, conflicts may arise if the changes overlap. Git will pause the `cherry-pick` process and allow you to resolve conflicts before proceeding.

It's worth noting that cherry-picking multiple commits can change the order or content of the commits compared to their original order in the source branch. Make sure to review and test the cherry-picked commits to ensure the desired outcome.

## Do not want to immediately create a new commit
If you want to pick a change from another commit using git cherry-pick but do not want to immediately create a new commit, you can use the `-n` or `--no-commit` option. This option allows you to apply the changes from the specified commit without automatically committing them.
```
git cherry-pick -n <commit-hash>
```

## Want to edit the commit message
If you want to edit the commit message while cherry-picking a commit, you can use the `--edit` or `-e` option with the git commit command.
```
git cherry-pick <commit-hash>
```

## Canceling a Git Cherry-Pick Operation

There are different scenarios where you may need to cancel a Git cherry-pick operation. Here's how you can handle each scenario:

### Merge conflicts during cherry-pick
If you encounter merge conflicts while running `git cherry-pick <commit_hash>`, the cherry-pick operation is not complete yet. To cancel the process and return to the previous state, you can use the following command:
```
git cherry-pick --abort
```
This command will abort the cherry-pick operation and restore your repository to its state before the cherry-pick was attempted.

### Completed cherry-pick and you want to revert it
If the cherry-pick operation is already complete, and you want to go back to the previous state, you can treat the cherry-picked commit as any other commit. To undo it, you can use the following command:
```
git reset --hard HEAD~1
```
This command resets the HEAD pointer to the previous commit, effectively removing the cherry-picked commit from the branch. Keep in mind that this command is a hard reset, which discards any local changes. Make sure to stash your changes before executing this command if you have any.

If you have cherry-pick multiple commits and want to undo them, you can use the `git reset --hard HEAD~n` command, where `n` represents the number of commits you want to go back. This command will reset the branch to the commit n steps before the current HEAD commit.

For example, if you cherry-picked `3` commits and want to undo them all, you can run:
```
git reset --hard HEAD~3
```
This command will remove the last `3` commits from the branch's history, discarding any changes made in those commits. The branch pointer and the working directory will be reset to the state of the commit `n` steps before the current `HEAD`.

It's important to note that a hard reset with git reset `--hard` is a destructive operation, as it permanently discards commits and changes. Make sure you have a backup or have a copy of any important changes before performing a hard reset.
