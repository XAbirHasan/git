# Git Reflog

Ever run a `--hard` reset, a rebase, or a branch delete and immediately regretted it? `git reflog` is often the way back. Unlike `git log`, which shows commit history along your branch's current path, reflog records every place `HEAD` has pointed on your local machine, checkouts, commits, resets, rebases, all of it. That means it can find commits that no longer show up in `git log` at all, because as far as your branches are concerned, they're gone.

## Viewing the Reflog

```
git reflog
```

```
$ git reflog
8b5a5ba HEAD@{0}: checkout: moving from master to test
f5c3376 HEAD@{1}: commit: add new feature
2e67ae6 HEAD@{2}: checkout: moving from test to master
a5b2411 HEAD@{3}: commit: fix bug
```

Each entry is a snapshot of where `HEAD` was at that point, referenced as `HEAD@{n}`, counting back from your current position (`HEAD@{0}`).

```
git reflog show --date=local      # with actual dates
git reflog show --date=relative   # "3 hours ago" style
```

## How Long Entries Last

Reflog entries expire after 90 days by default, old enough for most "oh no" moments, but not forever.

```
git config gc.reflogExpire 180.days   # keep them longer
git config gc.reflogExpire never      # don't expire them at all
git config --get gc.reflogExpire      # check the current setting
git config --unset gc.reflogExpire    # back to the 90-day default
```

## Recovering a Deleted Commit

Say you ran `git reset --hard HEAD~1` and only afterward realized that commit mattered:

```
git reset --hard HEAD~1
```

As long as you haven't run `git gc`, the commit is still sitting in the reflog, just not reachable from any branch anymore.

1. Find it:
    ```
    $ git reflog
    a1b2c3d HEAD@{0}: reset: moving to HEAD~1
    2a468b8 HEAD@{1}: commit: Added new feature
    8b291ab HEAD@{2}: commit: Fixed bug
    ```
    `HEAD@{1}` is the commit that got reset away, "Added new feature," still sitting right there in the log.
2. Bring it back, two different ways depending on what you want:
    ```
    git reset --hard HEAD@{1}      # move your branch back to it directly
    # or
    git cherry-pick HEAD@{1}       # reapply it as a new commit on top of what you have now
    ```
    Reset rewinds you to exactly that point, discarding anything after it. Cherry-pick keeps your current work and adds the recovered commit on top, usually the better choice if you've done anything since the mistake.

If instead of `cherry-pick` you'd rather make a fresh commit but reuse the recovered one's message:
```
git commit --reuse-message=HEAD@{1}    # or -C, use the message as-is
git commit --reedit-message=HEAD@{1}   # or -c, edit it before committing
```

**Jumping back to a recent `HEAD` position directly**, without searching the reflog first:
```
git reset --hard HEAD@{1}          # one step back
git reset --hard HEAD@{<number>}   # a specific number of steps back
```

## Recovering a Deleted Branch

Deleting a branch doesn't delete its commits, they're still in the reflog until they expire.

1. List the reflog and find the branch's last commit before deletion:
    ```
    git reflog
    ```
2. Recreate the branch pointing at that commit:
    ```
    git checkout -b "branch-name" <commit-sha | @HEAD{number}>
    ```

```
$ git reflog
7f0736d HEAD@{0}: branch: deleted feature-branch
b2d25b7 HEAD@{1}: checkout: moving from feature-branch to master
...

$ git checkout -b "feature-branch" 7f0736d
Switched to a new branch 'feature-branch'
```

The branch is back, pointing exactly where it did before you deleted it.

## Visualizing the Reflog

```
gitk --all `git reflog | cut -c1-7`
```

Opens `gitk` with the reflog's commits highlighted, useful for seeing the relationships between them graphically instead of reading hashes in a terminal.

## What Reflog Can't Do

- **It's local only.** Reflog lives in your `.git` directory and was never pushed anywhere, it can't help a teammate recover something, and cloning a repository doesn't carry someone else's reflog with it.
- **Entries do eventually disappear.** Beyond the expiry time (`gc.reflogExpire`), running `git gc` will prune old entries. There's actually a second, shorter-lived setting for commits that are already unreachable from any branch, `gc.reflogExpireUnreachable` (30 days by default), so setting only `gc.reflogExpire` to `never` doesn't fully stop pruning, set both to `never` if you genuinely want entries to stick around indefinitely.
- **It's not a backup strategy.** It's a safety net for recent local mistakes, not a substitute for pushing your work somewhere else.

## 🚫 Avoid Using These Commands

❗ Ensure that you are doing what you are supposed to do before using these commands, both cause permanent, unrecoverable data loss.

**Force-expire entries immediately**, instead of waiting for the normal 90-day window:
```
$ git reflog expire --expire=now --all
```
This marks every reflog entry across every ref as expired right now. Anything that was only reachable through the reflog (like a commit from a `--hard` reset) becomes eligible for garbage collection immediately, run `git gc` afterward and it's gone for good, no more recovery window.

**Delete one specific entry:**
```
$ git reflog delete HEAD@{2}
```
Removes just that entry from the reflog, without touching the others. Rarely needed day to day, mainly useful for scrubbing a specific accidental commit (one with a leaked secret, say) out of local reflog history.

## See Also

- [Git Reset](/commands/reset) - what you're usually recovering from
- [Git Cherry-Pick](/commands/cherry-pick) - reapplying a recovered commit without losing later work
- [Git Commit](/commands/commit) - reusing a recovered commit's message
