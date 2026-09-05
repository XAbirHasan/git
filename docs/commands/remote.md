# Git Remote

A remote is another copy of your repository, usually hosted on a server, that you exchange commits with by pushing and pulling. When you clone a repository, Git automatically sets up a remote called `origin` pointing back at wherever you cloned from, that's the connection `git push` and `git pull` use by default.

## Viewing Remotes

```bash
git remote        # names only
git remote -v     # names with URLs
```
```
$ git remote -v
origin    https://github.com/user/repo.git (fetch)
origin    https://github.com/user/repo.git (push)
upstream  https://github.com/original/repo.git (fetch)
upstream  https://github.com/original/repo.git (push)
```

```bash
git remote show origin
```
```
$ git remote show origin
* remote origin
  Fetch URL: https://github.com/user/repo.git
  Push  URL: https://github.com/user/repo.git
  HEAD branch: main
  Remote branches:
    main     tracked
    develop  tracked
  Local branch configured for 'git pull':
    main merges with remote main
```

## Adding, Removing, and Renaming

```bash
git remote add <name> <url>
```
```bash
git remote add origin https://github.com/user/repo.git
git remote add upstream https://github.com/original/repo.git   # common fork pattern
```

```bash
git remote remove <name>
# or
git remote rm <name>
```

```bash
git remote rename <old-name> <new-name>
```

## Changing a Remote's URL

```bash
git remote set-url origin https://github.com/user/repo.git   # switch to HTTPS
git remote set-url origin git@github.com:user/repo.git       # switch to SSH
```

You can fetch and push through different URLs for the same remote, useful if you fetch over HTTPS (no auth needed) but push over SSH:
```bash
git remote set-url --push origin git@github.com:user/repo.git
```

Or push to more than one place at once, useful for mirroring to two hosts:
```bash
git remote set-url --add --push origin https://github.com/user/repo.git
git remote set-url --add --push origin https://gitlab.com/user/repo.git
```

## Remote Branches

```bash
git branch -r   # remote branches only
git branch -a   # local and remote together
```

```bash
git checkout -b local-name origin/remote-branch   # track under a different local name
git checkout remote-branch                         # shorthand, same name locally and remotely
```

```bash
git branch --set-upstream-to=origin/main   # link current branch to a remote one
git branch --unset-upstream                # remove that link
```

## Pushing and Pulling

Once a remote is set up, `git push` and `git pull` (optionally naming the remote, e.g. `git push origin main`) are how you actually exchange commits with it. That's covered in full on their own pages:

- [Git Push](/commands/push) - uploading commits, force push, deleting remote branches
- [Git Fetch & Pull](/commands/pull) - downloading and merging commits

## Pruning Stale Remote-Tracking Branches

When someone deletes a branch on the remote, your local reference to it (`origin/their-branch`) doesn't disappear on its own:

```bash
git fetch --prune              # prune during a normal fetch
git remote prune origin        # prune without fetching anything new
git remote prune origin --dry-run   # preview what would be removed
```
```
$ git remote prune origin --dry-run
 * [would prune] origin/old-feature
 * [would prune] origin/deleted-branch
```

Set it once instead of remembering the flag: `git config --global fetch.prune true`.

## Remote Configuration

```bash
git config --get remote.origin.url      # see the configured URL
git config --get remote.origin.fetch    # see the fetch refspec
```

```bash
# Customize what a fetch actually pulls down, rarely needed but occasionally useful
git config remote.origin.fetch "+refs/heads/*:refs/remotes/origin/*"
```

```bash
# Control what a bare `git push` (no branch named) actually pushes
git config --global push.default simple   # the modern default: push only the current branch, to its own upstream
```

## Advanced

**Fetch GitHub pull requests directly:**
```bash
git config --add remote.origin.fetch "+refs/pull/*/head:refs/remotes/origin/pr/*"
git fetch origin
git checkout origin/pr/123
```

**Check or update the remote's default branch pointer** (useful after a repo renames its default branch, `master` to `main`, say):
```bash
git remote show origin | grep "HEAD branch"   # what Git currently thinks it is
git remote set-head origin --auto              # ask the remote and fix it automatically
git remote set-head origin main                # or set it explicitly yourself
```

## Useful Aliases

If you find yourself typing the same remote-related command chains often, save them as Git aliases:

```bash
git config --global alias.pullr 'pull --rebase'
git config --global alias.pushu 'push -u origin HEAD'
git config --global alias.sync '!git fetch upstream && git merge upstream/main'
```
Now `git pullr`, `git pushu`, and `git sync` work as shortcuts for the commands above, the last one is especially handy for keeping a fork's `main` in sync with upstream in one step.

## Common Workflows

**Fork workflow, end to end:**
```bash
# Clone your fork
git clone https://github.com/yourusername/repo.git
cd repo

# Add upstream remote
git remote add upstream https://github.com/original/repo.git

# Fetch upstream changes
git fetch upstream

# Merge upstream into your main
git checkout main
git merge upstream/main

# Push to your fork
git push origin main
```

**Working with multiple remotes** (e.g. mirroring to two hosts):
```bash
# Add multiple remotes
git remote add github https://github.com/user/repo.git
git remote add gitlab https://gitlab.com/user/repo.git

# Push to both
git push github main
git push gitlab main
```

## Troubleshooting

**Remote already exists:**
```bash
$ git remote add origin https://github.com/user/repo.git
fatal: remote origin already exists.
```
Either remove and re-add it, or just change its URL directly:
```bash
git remote set-url origin https://github.com/user/repo.git
```

**Could not read from remote:**
```
fatal: Could not read from remote repository.
```
Check the URL (`git remote -v`), your connection (`ssh -T git@github.com` for SSH), and that you actually have access to the repository.

**Branch not found locally:**
```
error: pathspec 'feature' did not match any file(s) known to git
```
You probably haven't fetched it yet:
```bash
git fetch --all
git checkout -b feature origin/feature
```

## Best Practices

1. **Use descriptive remote names** for multi-remote setups, `upstream`/`my-fork` reads far better than `remote2`.
2. **Verify URLs before pushing** with `git remote -v`, especially right after cloning a fork.
3. **Prefer SSH over HTTPS** once you've set up a key, no password prompts and slightly faster.
4. **Prune regularly** (`git fetch --prune` or the config equivalent) so stale branches don't clutter `git branch -r`.

## See Also

- [Git Clone](/commands/clone) - creates your first remote (`origin`) automatically
- [Git Fetch & Pull](/commands/pull) - downloading from a remote
- [Git Push](/commands/push) - uploading to a remote
- [Git Branch](/commands/branch) - branches and tracking