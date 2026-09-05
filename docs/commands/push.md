# Git Push

`git push` uploads your local commits to a remote repository, it's the other half of `git pull`: without it, your commits stay on your machine and nobody else ever sees them.

## Basic Push

```bash
git push                # push current branch to its upstream
git push origin main    # push to a specific remote and branch
```

**First push on a new branch** needs `-u` to set up tracking, so future pushes know where to go:
```bash
git push -u origin branch-name
# from then on, just:
git push
```
```
$ git push -u origin feature-login
To https://github.com/user/repo.git
 * [new branch]      feature-login -> feature-login
Branch 'feature-login' set up to track remote branch 'feature-login' from 'origin'.
```

## Push Options

```bash
git push --all             # push every local branch
git push origin --all      # same, to a specific remote

git push origin v1.0.0     # push one tag
git push --tags            # push every tag

git push origin --delete branch-name   # delete a branch on the remote
# or, older syntax with the same effect
git push origin :branch-name

git push --dry-run         # see what would be pushed, without pushing it
```

**Force push:**
```bash
git push --force              # DANGER: overwrites whatever is on the remote
git push --force-with-lease   # safer: fails if the remote has commits you haven't seen
```
⚠️ Only force push branches you own. `--force-with-lease` refuses to overwrite anything you haven't already fetched, so it can't accidentally erase a teammate's work the way plain `--force` can, use it as the default and reach for plain `--force` only when you're certain.

## Pushing to a Different Name or Multiple Branches

```bash
git push origin feature:feature-v2      # push local 'feature' as remote 'feature-v2'
git push origin main develop feature    # push several branches at once
```

## Common Scenarios

**After a rebase**, you'll need to force push, since rebasing rewrites commit hashes and a plain push will be rejected:
```bash
git rebase main
git push --force-with-lease   # never plain --force here, someone may have pushed since
```

**Pushing to a fork's upstream** (if you have write access):
```bash
git push origin main      # your fork
git push upstream main    # the original repo
```

## Troubleshooting

**Rejected, non-fast-forward:**
```bash
$ git push
To https://github.com/user/repo.git
 ! [rejected]        main -> main (non-fast-forward)
error: failed to push some refs to 'https://github.com/user/repo.git'
```
Someone else pushed since you last pulled. Pull first, then push:
```bash
git pull origin main
# or, to avoid a merge commit
git pull --rebase origin main
git push
```

**No upstream branch:**
```bash
$ git push
fatal: The current branch feature has no upstream branch.
```
to fix this:

```bash
git push -u origin feature
```

**Permission denied:**
```bash
$ git push
ERROR: Permission to user/repo.git denied
```
Check that you actually have write access, that your SSH key is set up (`ssh -T git@github.com`), and that the remote URL is correct (`git remote -v`).

## Best Practices

1. **Always pull before pushing**, so you find out about conflicts locally instead of getting rejected.
2. **Use `--force-with-lease` instead of `--force`**, it refuses to overwrite commits you haven't seen.
3. **Push regularly**, even to a feature branch, so your work is backed up somewhere besides your own machine.
4. **Avoid force pushing to shared branches.** If you absolutely have to, tell everyone else on that branch first, a force push can silently drop commits they've already pulled.
5. **Push feature branches early**, not just when they're finished, it's a free backup while you work.

## See Also

- [Git Fetch & Pull](/commands/pull) - the other direction
- [Git Remote](/commands/remote) - managing where you push to
- [Git Rebase](/commands/rebase) - why a rebase forces you to force push
- [Git Branch](/commands/branch) - branch and tracking basics
