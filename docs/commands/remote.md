# Git Remote

Git remotes are versions of your repository hosted on the internet or network. Managing remotes effectively is essential for collaboration and backup. This guide covers everything about working with remote repositories.

## Understanding Remotes

A **remote** is a common repository that all team members use to exchange their changes. When you clone a repository, Git automatically creates a remote called `origin` pointing to the cloned repository.

## Viewing Remotes

### List Remotes

```bash
# List all configured remotes
git remote
```

**Example:**
```bash
$ git remote
origin
upstream
```

### List Remotes with URLs

```bash
# Show remote names and URLs
git remote -v
```

**Example:**
```bash
$ git remote -v
origin  https://github.com/user/repo.git (fetch)
origin  https://github.com/user/repo.git (push)
upstream    https://github.com/original/repo.git (fetch)
upstream    https://github.com/original/repo.git (push)
```

### Show Remote Details

```bash
# Get detailed information about a remote
git remote show origin
```

**Example:**
```bash
$ git remote show origin
* remote origin
  Fetch URL: https://github.com/user/repo.git
  Push  URL: https://github.com/user/repo.git
  HEAD branch: main
  Remote branches:
    main     tracked
    develop  tracked
    feature  tracked
  Local branch configured for 'git pull':
    main merges with remote main
  Local ref configured for 'git push':
    main pushes to main (up to date)
```

## Adding Remotes

### Add a New Remote

```bash
git remote add <name> <url>
```

**Example:**
```bash
# Add origin remote
git remote add origin https://github.com/user/repo.git

# Add upstream remote (for forks)
git remote add upstream https://github.com/original/repo.git

# Add with SSH
git remote add origin git@github.com:user/repo.git
```

### Add Remote for Fork Workflow

Common pattern when working with forks:

```bash
# Your fork
git remote add origin https://github.com/yourusername/repo.git

# Original repository
git remote add upstream https://github.com/original/repo.git
```

## Removing Remotes

### Remove a Remote

```bash
git remote remove <name>
# or
git remote rm <name>
```

**Example:**
```bash
# Remove upstream remote
git remote remove upstream

# Verify removal
git remote -v
```

## Renaming Remotes

### Rename a Remote

```bash
git remote rename <old-name> <new-name>
```

**Example:**
```bash
# Rename origin to github
git remote rename origin github

# Verify
git remote -v
```

## Changing Remote URLs

### Change Remote URL

```bash
git remote set-url <name> <new-url>
```

**Example:**
```bash
# Change to HTTPS
git remote set-url origin https://github.com/user/repo.git

# Change to SSH
git remote set-url origin git@github.com:user/repo.git

# Verify change
git remote -v
```

### Add Push URL (Different from Fetch)

```bash
# Set different URL for pushing
git remote set-url --push origin <push-url>
```

**Example:**
```bash
# Fetch from HTTPS, push to SSH
git remote set-url origin https://github.com/user/repo.git
git remote set-url --push origin git@github.com:user/repo.git
```

### Add Multiple URLs for Same Remote

```bash
# Add additional push URL
git remote set-url --add --push origin <url>
```

**Example:**
```bash
# Push to multiple repositories
git remote set-url --add --push origin https://github.com/user/repo.git
git remote set-url --add --push origin https://gitlab.com/user/repo.git
```

## Working with Remote Branches

### Fetch Remote Branches

```bash
# Fetch all remotes
git fetch --all

# Fetch specific remote
git fetch origin

# Fetch specific branch
git fetch origin main
```

### List Remote Branches

```bash
# List all remote branches
git branch -r

# List all branches (local and remote)
git branch -a
```

**Example:**
```bash
$ git branch -r
  origin/main
  origin/develop
  origin/feature-login
  upstream/main
```

### Track Remote Branch

```bash
# Create local branch tracking remote
git checkout -b local-name origin/remote-branch

# Shorter form (same name)
git checkout remote-branch
```

**Example:**
```bash
# Track origin/develop
git checkout -b develop origin/develop

# Or simply
git checkout develop
```

### Set Upstream Branch

```bash
# Set upstream for current branch
git branch --set-upstream-to=origin/main

# Or during push
git push -u origin main
```

### Unset Upstream Branch

```bash
# Remove upstream tracking
git branch --unset-upstream
```

## Pushing to Remotes

### Push to Remote

```bash
# Push to default remote and branch
git push

# Push to specific remote and branch
git push origin main

# Push and set upstream
git push -u origin feature-branch
```

### Push All Branches

```bash
# Push all branches to origin
git push origin --all

# Push all branches to all remotes
git push --all
```

### Push Tags

```bash
# Push specific tag
git push origin v1.0.0

# Push all tags
git push origin --tags

# Push tags to all remotes
git push --tags
```

### Force Push

```bash
# Force push (DANGER: can overwrite remote)
git push --force

# Safer force push (fails if remote has changes you don't have)
git push --force-with-lease
```

**⚠️ Warning:** Only force push on branches you own!

### Delete Remote Branch

```bash
# Delete remote branch
git push origin --delete branch-name

# Alternative syntax
git push origin :branch-name
```

**Example:**
```bash
# Delete feature branch from remote
git push origin --delete feature-old
```

## Pulling from Remotes

### Pull from Remote

```bash
# Pull from default remote
git pull

# Pull from specific remote and branch
git pull origin main

# Pull with rebase
git pull --rebase origin main
```

### Pull from Upstream (Forks)

```bash
# Pull changes from upstream
git pull upstream main

# Then push to your fork
git push origin main
```

## Pruning Remote Branches

### Remove Stale Remote References

When branches are deleted on the remote, local references may remain. Clean them up:

```bash
# Prune during fetch
git fetch --prune

# Prune specific remote
git remote prune origin

# Dry run to see what would be pruned
git remote prune origin --dry-run
```

**Example:**
```bash
$ git remote prune origin --dry-run
 * [would prune] origin/old-feature
 * [would prune] origin/deleted-branch
```

### Auto-Prune Configuration

```bash
# Always prune on fetch
git config --global fetch.prune true
```

## Remote Configuration

### View Remote Configuration

```bash
# See remote configuration in .git/config
cat .git/config

# Or use git config
git config --get remote.origin.url
git config --get remote.origin.fetch
```

### Configure Remote Fetch

```bash
# Set custom fetch refspec
git config remote.origin.fetch "+refs/heads/*:refs/remotes/origin/*"
```

### Configure Remote Push

```bash
# Set push default behavior
git config --global push.default simple

# Options: nothing, current, upstream, simple, matching
```

## Common Remote Workflows

### Workflow 1: Initial Repository Setup

```bash
# Create local repository
git init

# Add remote
git remote add origin https://github.com/user/repo.git

# Create and commit files
git add .
git commit -m "Initial commit"

# Push to remote
git push -u origin main
```

### Workflow 2: Fork Workflow

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

### Workflow 3: Sync Fork with Upstream

```bash
# Fetch upstream changes
git fetch upstream

# Switch to main
git checkout main

# Merge upstream changes
git merge upstream/main

# Push to your fork
git push origin main
```

### Workflow 4: Working with Multiple Remotes

```bash
# Add multiple remotes
git remote add github https://github.com/user/repo.git
git remote add gitlab https://gitlab.com/user/repo.git

# Push to both
git push github main
git push gitlab main

# Or push to all
git push --all
```

### Workflow 5: Change Remote URL (HTTP to SSH)

```bash
# Check current URL
git remote -v

# Change to SSH
git remote set-url origin git@github.com:user/repo.git

# Verify
git remote -v
```

## Troubleshooting

### Remote Already Exists

```bash
$ git remote add origin https://github.com/user/repo.git
fatal: remote origin already exists.
```

**Solution:**
```bash
# Remove and re-add
git remote remove origin
git remote add origin https://github.com/user/repo.git

# Or change URL
git remote set-url origin https://github.com/user/repo.git
```

### Could Not Read from Remote

```bash
fatal: Could not read from remote repository.
```

**Solution:**
```bash
# Check remote URL
git remote -v

# Check connection
ssh -T git@github.com

# Update URL if wrong
git remote set-url origin <correct-url>

# Check permissions
# Ensure you have access to the repository
```

### Remote Branch Not Found

```bash
$ git checkout feature
error: pathspec 'feature' did not match any file(s) known to git
```

**Solution:**
```bash
# Fetch all branches
git fetch --all

# List remote branches
git branch -r

# Checkout the branch
git checkout -b feature origin/feature
```

### Push Rejected

```bash
$ git push
 ! [rejected]        main -> main (fetch first)
error: failed to push some refs
```

**Solution:**
```bash
# Pull first
git pull origin main

# Or pull with rebase
git pull --rebase origin main

# Then push
git push origin main
```

## Best Practices

### 1. Use Descriptive Remote Names

```bash
# Good
git remote add upstream https://github.com/original/repo.git
git remote add my-fork https://github.com/me/repo.git

# Avoid generic names for multiple remotes
```

### 2. Always Verify Remote URLs

```bash
# Check before pushing
git remote -v
```

### 3. Use SSH for Better Security

```bash
# Use SSH instead of HTTPS
git remote set-url origin git@github.com:user/repo.git
```

### 4. Keep Remotes Clean

```bash
# Regularly prune stale branches
git fetch --prune

# Remove unused remotes
git remote remove old-remote
```

### 5. Set Upstream When Pushing New Branches

```bash
# Set upstream during first push
git push -u origin new-feature
```

### 6. Use --force-with-lease Instead of --force

```bash
# Safer than --force
git push --force-with-lease
```

## Advanced Remote Operations

### Get Remote HEAD Branch

```bash
# See default branch on remote
git remote show origin | grep "HEAD branch"
```

### Update Remote HEAD

```bash
# Set remote HEAD to match remote default branch
git remote set-head origin --auto

# Set remote HEAD to specific branch
git remote set-head origin main
```

### Fetch Pull Requests (GitHub)

```bash
# Configure to fetch PRs
git config --add remote.origin.fetch "+refs/pull/*/head:refs/remotes/origin/pr/*"

# Fetch all PRs
git fetch origin

# Checkout a PR
git checkout origin/pr/123
```

## Remote Shortcuts

### Create Useful Aliases

```bash
# Add common remote operations as aliases
git config --global alias.pullr 'pull --rebase'
git config --global alias.pushu 'push -u origin HEAD'
git config --global alias.sync '!git fetch upstream && git merge upstream/main'
```

## Summary

Git remotes are essential for:
- ✅ Collaboration with team members
- ✅ Backup and synchronization
- ✅ Working with forks
- ✅ Deploying code
- ✅ Multiple repository mirrors

**Key Commands:**
- `git remote -v` - View remotes
- `git remote add` - Add remote
- `git remote remove` - Remove remote
- `git remote set-url` - Change URL
- `git fetch` - Download changes
- `git push` - Upload changes
- `git pull` - Fetch and merge

**Key Takeaways:**
- `origin` is the default remote name
- Use `upstream` for original repository in forks
- SSH is more secure than HTTPS
- Always verify remotes with `git remote -v`
- Prune regularly to keep clean
- Use `--force-with-lease` instead of `--force`

## See Also

- [Git Clone](./clone.md) - Cloning repositories
- [Git Fetch & Pull](./pull.md) - Fetching and pulling
- [Git Push](./push.md) - Pushing changes  
- [Git Branch](./branch.md) - Branch management
- [Getting Started](../guide/getting-started.md) - Initial setup
