# Git Fetch & Pull

Understanding the difference between `git fetch` and `git pull` is crucial for effective collaboration. These commands help you synchronize your local repository with remote repositories.

## The Key Difference

- **`git fetch`**: Downloads changes but doesn't merge them
- **`git pull`**: Downloads changes AND merges them (fetch + merge)

Think of it as:
- **Fetch** = "Show me what's new"
- **Pull** = "Get what's new and apply it"

## Git Fetch

### Basic Fetch

Download changes from the remote repository without merging:

```bash
git fetch
```

This updates your remote-tracking branches (like `origin/main`) but doesn't change your working directory.

**Example:**
```bash
$ git fetch
remote: Counting objects: 10, done.
remote: Compressing objects: 100% (8/8), done.
remote: Total 10 (delta 5), reused 0 (delta 0)
Unpacking objects: 100% (10/10), done.
From https://github.com/user/repo
   abc123..def456  main       -> origin/main
```

### Fetch Specific Remote

```bash
# Fetch from specific remote
git fetch origin

# Fetch from different remote
git fetch upstream
```

### Fetch Specific Branch

```bash
# Fetch only a specific branch
git fetch origin main

# Fetch multiple branches
git fetch origin main develop
```

### Fetch All Remotes

```bash
# Fetch from all configured remotes
git fetch --all
```

### Fetch with Prune

Remove remote-tracking branches that no longer exist on the remote:

```bash
git fetch --prune
# or shorthand
git fetch -p
```

**Example:**
```bash
$ git fetch --prune
From https://github.com/user/repo
 - [deleted]         (none)     -> origin/old-feature
   abc123..def456    main       -> origin/main
```

### Dry Run Fetch

See what would be fetched without actually fetching:

```bash
git fetch --dry-run
```

## After Fetching

### Check What Was Fetched

```bash
# See remote branches
git branch -r

# See all branches (local and remote)
git branch -a

# View fetched changes
git log origin/main

# Compare with your branch
git diff main origin/main
```

### Merge Fetched Changes

```bash
# After fetch, merge manually
git fetch origin
git merge origin/main

# Or merge specific remote branch
git merge origin/feature-branch
```

### View Fetched Commits

```bash
# See new commits from remote
git log main..origin/main

# See what changed
git diff main origin/main
```

## Git Pull

### Basic Pull

Fetch and merge changes from remote in one command:

```bash
git pull
```

This is equivalent to:
```bash
git fetch
git merge origin/current-branch
```

**Example:**
```bash
$ git pull
remote: Counting objects: 5, done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 5 (delta 2), reused 0 (delta 0)
Unpacking objects: 100% (5/5), done.
From https://github.com/user/repo
   abc123..def456  main     -> origin/main
Updating abc123..def456
Fast-forward
 file.txt | 10 +++++++++-
 1 file changed, 9 insertions(+), 1 deletion(-)
```

### Pull from Specific Remote and Branch

```bash
# Pull from specific remote and branch
git pull origin main

# Pull from upstream
git pull upstream main
```

### Pull with Rebase

Pull changes and rebase instead of merge:

```bash
git pull --rebase
```

This is equivalent to:
```bash
git fetch
git rebase origin/current-branch
```

**Why use rebase?**
- Creates linear history
- Avoids merge commits
- Cleaner project history

**Example:**
```bash
$ git pull --rebase
First, rewinding head to replay your work on top of it...
Applying: Your local commit
```

### Pull All Branches

```bash
# Pull and update all tracking branches
git pull --all
```

### Pull with Fast-Forward Only

Refuse to pull if fast-forward isn't possible:

```bash
git pull --ff-only
```

If merge is required, the pull will fail. This prevents accidental merge commits.

### Pull Quietly

Suppress detailed output:

```bash
git pull --quiet
# or
git pull -q
```

### Pull with Specific Strategy

```bash
# Pull with specific merge strategy
git pull --strategy=ours

# Pull preferring their changes on conflict
git pull -X theirs
```

## Pull vs Fetch: When to Use Each

### Use Fetch When:

✅ You want to see changes before merging  
✅ You're reviewing what others have pushed  
✅ You want to compare branches first  
✅ You're not ready to integrate changes  
✅ You want more control over the process  

**Example workflow:**
```bash
# Fetch changes
git fetch origin

# Review changes
git log origin/main

# Compare with your branch
git diff main origin/main

# Decide to merge or not
git merge origin/main
```

### Use Pull When:

✅ You trust the remote branch  
✅ You want to quickly sync  
✅ You're alone on the branch  
✅ You want convenience  
✅ Fast-forward merge is likely  

**Example workflow:**
```bash
# Quick sync with remote
git pull origin main
```

## Common Workflows

### Workflow 1: Safe Update (Fetch First)

```bash
# 1. Fetch changes
git fetch origin

# 2. Check what changed
git log --oneline main..origin/main

# 3. Review differences
git diff main origin/main

# 4. Merge if satisfied
git merge origin/main
```

### Workflow 2: Quick Update (Pull)

```bash
# Quick pull when you're confident
git pull origin main
```

### Workflow 3: Pull with Rebase

```bash
# Pull and rebase your commits on top
git pull --rebase origin main

# If conflicts occur, resolve and continue
git add .
git rebase --continue
```

### Workflow 4: Sync Fork from Upstream

```bash
# Add upstream remote (once)
git remote add upstream https://github.com/original/repo.git

# Fetch from upstream
git fetch upstream

# Merge upstream changes
git checkout main
git merge upstream/main

# Push to your fork
git push origin main
```

### Workflow 5: Update All Branches

```bash
# Fetch all remotes
git fetch --all --prune

# Switch to main and pull
git checkout main
git pull

# Switch to develop and pull
git checkout develop
git pull
```

## Handling Pull Conflicts

### When Pull Conflicts Occur

```bash
$ git pull
Auto-merging file.txt
CONFLICT (content): Merge conflict in file.txt
Automatic merge failed; fix conflicts and then commit the result.
```

### Resolving Pull Conflicts

**Step 1:** Check status
```bash
git status
```

**Step 2:** Edit conflicted files
- Look for conflict markers
- Choose or combine changes
- Save files

**Step 3:** Stage resolved files
```bash
git add file.txt
```

**Step 4:** Complete the merge
```bash
git commit
```

### Aborting a Pull

```bash
# Cancel the pull and return to previous state
git merge --abort
```

## Advanced Fetch & Pull Techniques

### Fetch Specific Refs

```bash
# Fetch specific reference
git fetch origin refs/heads/main:refs/remotes/origin/main

# Fetch pull request (GitHub)
git fetch origin pull/123/head:pr-123
```

### Pull with Autostash

Automatically stash and re-apply local changes:

```bash
git pull --rebase --autostash
```

This is useful when you have uncommitted changes.

### Configure Default Pull Behavior

```bash
# Set default to rebase instead of merge
git config --global pull.rebase true

# Set to fast-forward only
git config --global pull.ff only

# Return to default (merge)
git config --global pull.rebase false
```

### Fetch Tags

```bash
# Fetch all tags
git fetch --tags

# Fetch without tags
git fetch --no-tags
```

### Shallow Fetch

Fetch limited history:

```bash
# Fetch only last commit
git fetch --depth 1

# Fetch last 10 commits
git fetch --depth 10
```

## Checking Remote Status

### See What's Different

```bash
# After fetch, see what's ahead/behind
git status

# Example output:
# Your branch is behind 'origin/main' by 3 commits
# Your branch is ahead of 'origin/main' by 2 commits
# Your branch and 'origin/main' have diverged
```

### Compare with Remote

```bash
# See commits in remote but not in local
git log main..origin/main

# See commits in local but not in remote
git log origin/main..main

# See differences in both
git log main...origin/main
```

### View Remote Branches

```bash
# List remote branches
git branch -r

# List all branches with tracking info
git branch -vv

# Show remote branches with last commit
git branch -r -v
```

## Troubleshooting

### Pull Rejected (Non-Fast-Forward)

```bash
$ git pull
error: Your local changes to the following files would be overwritten by merge:
    file.txt
Please commit your changes or stash them before you merge.
Aborting
```

**Solution:**
```bash
# Option 1: Commit your changes
git add .
git commit -m "Your message"
git pull

# Option 2: Stash your changes
git stash
git pull
git stash pop

# Option 3: Force pull (DANGER: loses local changes)
git fetch origin
git reset --hard origin/main
```

### Diverged Branches

```bash
$ git status
Your branch and 'origin/main' have diverged,
and have 2 and 3 different commits each, respectively.
```

**Solution:**
```bash
# Option 1: Merge
git pull

# Option 2: Rebase
git pull --rebase

# Option 3: Reset to remote (lose local commits)
git reset --hard origin/main
```

### Behind Remote

```bash
# Your branch is behind, just pull
git pull
```

### Ahead of Remote

```bash
# Your branch is ahead, push your changes
git push
```

## Best Practices

### 1. Fetch Regularly

```bash
# Fetch every morning
git fetch --all --prune
```

### 2. Review Before Merging

```bash
# Don't blindly pull, check first
git fetch
git log main..origin/main
git pull
```

### 3. Use Pull Rebase for Clean History

```bash
# Configure once
git config --global pull.rebase true

# Or use per pull
git pull --rebase
```

### 4. Keep Branches Updated

```bash
# Regularly sync main branch
git checkout main
git pull origin main
```

### 5. Handle Conflicts Promptly

Don't let conflicts linger. Resolve them as soon as they occur.

## Configuration Tips

### Set Default Remote

```bash
# Set upstream tracking branch
git branch --set-upstream-to=origin/main main

# Now simple git pull works
git pull
```

### Auto-Prune on Fetch

```bash
# Always prune deleted branches
git config --global fetch.prune true
```

### Set Pull Strategy

```bash
# Always use rebase
git config --global pull.rebase true

# Use fast-forward only
git config --global pull.ff only
```

## Summary

**Git Fetch:**
- ✅ Safe - doesn't change your files
- ✅ Review changes before merging
- ✅ More control over integration
- ✅ Great for checking updates

**Git Pull:**
- ✅ Convenient - fetch and merge in one
- ✅ Quick synchronization
- ✅ Good for trusted sources
- ✅ Can use with rebase for clean history

**Key Takeaways:**
- `fetch` = download without merging
- `pull` = fetch + merge
- `pull --rebase` = fetch + rebase
- Use `fetch` when you want to review first
- Use `pull` when you want quick sync
- Configure `pull.rebase` for cleaner history

## See Also

- [Git Remote](./remote.md) - Managing remotes
- [Git Merge](./merge.md) - Merging strategies
- [Git Rebase](./rebase.md) - Rebasing changes
- [Git Push](./push.md) - Pushing changes
- [Git Branch](./branch.md) - Branch management
