# Git Push

`git push` uploads your local commits to a remote repository, making your changes available to others. It's the complement to `git pull` and essential for collaboration.

## Basic Push

### Push to Remote

```bash
# Push current branch to remote
git push

# Push to specific remote and branch
git push origin main
```

### First Push (Set Upstream)

```bash
# Push and set upstream tracking
git push -u origin branch-name

# Now future pushes just need
git push
```

**Example:**
```bash
$ git push -u origin feature-login
Counting objects: 5, done.
Writing objects: 100% (5/5), 450 bytes | 450.00 KiB/s, done.
Total 5 (delta 0), reused 0 (delta 0)
To https://github.com/user/repo.git
 * [new branch]      feature-login -> feature-login
Branch 'feature-login' set up to track remote branch 'feature-login' from 'origin'.
```

## Push Options

### Push All Branches

```bash
# Push all branches
git push --all

# Push all branches to specific remote
git push origin --all
```

### Push Tags

```bash
# Push specific tag
git push origin v1.0.0

# Push all tags
git push --tags

# Push tags to specific remote
git push origin --tags
```

### Force Push

```bash
# Force push (DANGER!)
git push --force

# Safer force push
git push --force-with-lease
```

⚠️ **Warning:** Only force push on branches you own!

### Delete Remote Branch

```bash
# Delete remote branch
git push origin --delete branch-name

# Alternative syntax
git push origin :branch-name
```

### Dry Run

```bash
# See what would be pushed without pushing
git push --dry-run
```

## Push Strategies

### Simple Push (Default)

Push current branch to its upstream:

```bash
git push
```

### Push to Different Branch Name

```bash
# Push local 'feature' to remote 'feature-v2'
git push origin feature:feature-v2
```

### Push Multiple Branches

```bash
# Push multiple branches at once
git push origin main develop feature
```

## Common Scenarios

### Scenario 1: First Time Push

```bash
# Create branch and commit
git checkout -b new-feature
git commit -m "Add feature"

# Push and set upstream
git push -u origin new-feature
```

### Scenario 2: Regular Push

```bash
# Make changes
git add .
git commit -m "Update feature"

# Push
git push
```

### Scenario 3: Push After Rebase

```bash
# Rebase your branch
git rebase main

# Force push (your branch only!)
git push --force-with-lease
```

### Scenario 4: Push to Fork

```bash
# Push to your fork
git push origin main

# Push to upstream (if you have write access)
git push upstream main
```

## Troubleshooting

### Push Rejected (Non-Fast-Forward)

```bash
$ git push
To https://github.com/user/repo.git
 ! [rejected]        main -> main (non-fast-forward)
error: failed to push some refs to 'https://github.com/user/repo.git'
```

**Solution:**
```bash
# Pull first
git pull origin main

# Or pull with rebase
git pull --rebase origin main

# Then push
git push
```

### No Upstream Branch

```bash
$ git push
fatal: The current branch feature has no upstream branch.
```

**Solution:**
```bash
git push -u origin feature
```

### Permission Denied

```bash
$ git push
ERROR: Permission to user/repo.git denied
```

**Solution:**
- Check repository access
- Verify SSH keys
- Check remote URL
- Ensure you're authenticated

## Best Practices

1. **Always pull before pushing**
2. **Use `--force-with-lease` instead of `--force`**
3. **Push regularly to backup your work**
4. **Don't force push to shared branches**
5. **Push feature branches to create backups**

## See Also

- [Git Fetch & Pull](./pull.md) - Fetching and pulling
- [Git Remote](./remote.md) - Managing remotes
- [Git Branch](./branch.md) - Branch management
