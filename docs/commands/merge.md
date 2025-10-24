# Git Merge

Git merge is a fundamental command used to integrate changes from one branch into another. It's essential for collaborative development and managing different lines of work in your project.

## Understanding Git Merge

When you merge, Git combines the changes from different branches. There are different types of merges:

- **Fast-forward merge**: When the target branch hasn't diverged from the source branch
- **Three-way merge**: When both branches have new commits, creating a merge commit
- **Squash merge**: Combining all commits from a branch into a single commit

## Basic Merge Commands

### Simple Merge

Merge another branch into your current branch:

```bash
git merge branch-name
```

**Example:**
```bash
# Switch to main branch
git checkout main

# Merge feature branch into main
git merge feature-branch
```

### Fast-Forward Merge

When there are no new commits on the target branch:

```bash
$ git merge feature
Updating abc123..def456
Fast-forward
 file.txt | 10 ++++++++++
 1 file changed, 10 insertions(+)
```

Git simply moves the pointer forward—no merge commit is created.

## Merge Options

### No Fast-Forward

Force creation of a merge commit even when fast-forward is possible:

```bash
git merge --no-ff branch-name
```

**Why use it?**
- Preserves branch history
- Makes it clear a feature was merged
- Easier to revert entire features

**Example:**
```bash
$ git merge --no-ff feature-login
Merge made by the 'recursive' strategy.
 login.js | 50 ++++++++++++++++++++++++++++++++++++++++++++++++++
 1 file changed, 50 insertions(+)
```

### Fast-Forward Only

Refuse to merge unless it can be done with fast-forward:

```bash
git merge --ff-only branch-name
```

If fast-forward isn't possible, the merge will fail.

### Squash Merge

Combine all commits from the branch into a single commit:

```bash
git merge --squash branch-name
```

This stages all changes but doesn't commit them. You need to commit manually.

**Example:**
```bash
$ git merge --squash feature
Squash commit -- not updating HEAD
Automatic merge went well; stopped before committing as requested

$ git commit -m "Add login feature"
```

**Use cases:**
- Clean up messy commit history
- Merge work-in-progress branches
- Keep main branch history clean

## Merge with Custom Message

```bash
# Provide custom merge commit message
git merge branch-name -m "Merge feature: Add user authentication"

# Open editor for detailed merge message
git merge branch-name --edit
```

## Merge Strategies

### Recursive Strategy (Default)

```bash
git merge -s recursive branch-name
```

The default strategy for merging two branches. Good for most cases.

### Ours Strategy

```bash
git merge -s ours branch-name
```

Ignores all changes from the other branch. Useful for marking branches as merged without actually merging changes.

### Theirs Strategy Option

```bash
git merge -X theirs branch-name
```

When there are conflicts, automatically prefer changes from the branch being merged.

### Ours Strategy Option

```bash
git merge -X ours branch-name
```

When there are conflicts, automatically prefer changes from the current branch.

**Example:**
```bash
# Always prefer current branch changes on conflict
git merge -X ours feature-branch
```

## Handling Merge Conflicts

### Understanding Conflicts

When Git can't automatically merge changes, you get a conflict:

```bash
$ git merge feature
Auto-merging file.txt
CONFLICT (content): Merge conflict in file.txt
Automatic merge failed; fix conflicts and then commit the result.
```

### Conflict Markers

Git marks conflicts in files like this:

```
<<<<<<< HEAD
This is the content from your current branch
=======
This is the content from the branch being merged
>>>>>>> feature-branch
```

### Resolving Conflicts

**Step 1:** Check which files have conflicts:
```bash
git status
```

**Step 2:** Open conflicted files and edit them:
- Remove conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)
- Choose which changes to keep (or combine them)
- Save the file

**Step 3:** Stage the resolved files:
```bash
git add file.txt
```

**Step 4:** Complete the merge:
```bash
git commit
```

Or commit with a custom message:
```bash
git commit -m "Merge feature-branch: resolved conflicts in file.txt"
```

### Aborting a Merge

If you want to cancel the merge and return to the pre-merge state:

```bash
git merge --abort
```

### Using Merge Tools

Open a visual merge tool to resolve conflicts:

```bash
git mergetool
```

Configure your preferred tool:
```bash
git config --global merge.tool vimdiff
# or
git config --global merge.tool meld
# or
git config --global merge.tool vscode
```

## Advanced Merge Techniques

### Merge Specific Commits

Use `git cherry-pick` instead for specific commits, but you can merge up to a specific commit:

```bash
git merge branch-name~5
```

### Merge Without Committing

Stage the merge but don't create a commit:

```bash
git merge --no-commit branch-name
```

Review the changes, make adjustments, then commit:
```bash
git commit
```

### Verify Merge Result

Before completing a merge, verify the result:

```bash
# See what will be merged
git merge --no-commit --no-ff branch-name

# Review changes
git diff --cached

# If satisfied, commit
git commit

# If not, abort
git merge --abort
```

### Allow Unrelated Histories

Merge branches that don't share a common ancestor:

```bash
git merge --allow-unrelated-histories branch-name
```

**Use case:** Combining two separate projects.

## Checking Merge Status

### See What's Been Merged

```bash
# List branches merged into current branch
git branch --merged

# List branches not yet merged
git branch --no-merged
```

### View Merge History

```bash
# Show merge commits in log
git log --merges

# Show merge commits with details
git log --merges --oneline

# Exclude merge commits from log
git log --no-merges
```

### Check if Branch Can Be Merged

```bash
# Dry run to see if merge would succeed
git merge --no-commit --no-ff branch-name

# If successful, abort
git merge --abort
```

## Common Merge Workflows

### Feature Branch Workflow

```bash
# Create and switch to feature branch
git checkout -b feature-login

# Make changes and commit
git add .
git commit -m "Add login functionality"

# Switch back to main
git checkout main

# Pull latest changes
git pull origin main

# Merge feature branch
git merge feature-login

# Push merged changes
git push origin main

# Delete feature branch
git branch -d feature-login
```

### Merge with Rebase First

Clean merge by rebasing feature branch first:

```bash
# On feature branch
git checkout feature

# Rebase onto main
git rebase main

# Switch to main
git checkout main

# Merge (will be fast-forward)
git merge feature
```

### Merge from Remote Branch

```bash
# Fetch latest changes
git fetch origin

# Merge remote branch
git merge origin/feature-branch
```

## Best Practices

### 1. Always Pull Before Merging

```bash
git checkout main
git pull origin main
git merge feature-branch
```

### 2. Use --no-ff for Feature Branches

Preserve branch history:
```bash
git merge --no-ff feature-branch
```

### 3. Write Descriptive Merge Messages

```bash
git merge feature-login -m "Merge feature: User authentication system

- Added login page
- Implemented JWT authentication
- Added password reset functionality"
```

### 4. Test Before Merging

```bash
# Create a test merge
git merge --no-commit feature-branch

# Run tests
npm test

# If tests pass, complete merge
git commit

# If tests fail, abort
git merge --abort
```

### 5. Resolve Conflicts Carefully

- Understand both changes before resolving
- Test after resolving conflicts
- Ask for help if unsure
- Use merge tools for complex conflicts

## Merge vs Rebase

### When to Use Merge

✅ Merging release branches  
✅ Incorporating finished features  
✅ Public/shared branches  
✅ Preserving exact history  
✅ Working with others on same branch  

### When to Use Rebase

✅ Cleaning up local commits  
✅ Feature branches before merging  
✅ Keeping history linear  
✅ Private/local branches  

## Common Merge Scenarios

### Scenario 1: Simple Feature Merge

```bash
# On main branch
git merge feature-branch
# Fast-forward if possible, creates merge commit if needed
```

### Scenario 2: Merge with Guaranteed Merge Commit

```bash
git merge --no-ff feature-branch
# Always creates a merge commit, even if fast-forward is possible
```

### Scenario 3: Squash Multiple Commits

```bash
git merge --squash experimental-feature
git commit -m "Add experimental feature"
# All commits from experimental-feature become one commit
```

### Scenario 4: Merge Conflict Resolution

```bash
git merge feature
# CONFLICT!

# Edit conflicted files
vim conflicted-file.txt

# Stage resolved files
git add conflicted-file.txt

# Complete merge
git commit
```

### Scenario 5: Partial Merge Undo

```bash
# Started merge but want to undo
git merge --abort

# Or reset if merge was completed
git reset --hard HEAD~1
```

## Troubleshooting

### Merge Conflicts Are Overwhelming

```bash
# Abort and try a different approach
git merge --abort

# Consider rebasing first to reduce conflicts
git checkout feature
git rebase main
git checkout main
git merge feature
```

### Accidental Merge

```bash
# Undo last merge (if not pushed)
git reset --hard HEAD~1

# Or use reflog to find previous state
git reflog
git reset --hard HEAD@{1}
```

### Merge Creates Unwanted Files

```bash
# Check what changed
git diff HEAD~1

# Undo merge
git reset --hard HEAD~1

# Fix the issue on the branch and re-merge
```

### Can't Fast-Forward

```bash
# If you require fast-forward but it fails:
$ git merge --ff-only feature
fatal: Not possible to fast-forward, aborting.

# Solution: Rebase the branch first
git checkout feature
git rebase main
git checkout main
git merge --ff-only feature
```

## Merge Configuration

### Set Default Merge Strategy

```bash
# Always create merge commit
git config --global merge.ff false

# Only allow fast-forward
git config --global merge.ff only

# Default behavior (fast-forward when possible)
git config --global merge.ff true
```

### Configure Conflict Style

```bash
# Show common ancestor in conflicts (diff3)
git config --global merge.conflictstyle diff3
```

This shows:
```
<<<<<<< HEAD
Your changes
||||||| merged common ancestors
Original content
=======
Their changes
>>>>>>> branch
```

## Summary

Git merge is essential for:
- ✅ Integrating feature branches
- ✅ Combining work from multiple developers
- ✅ Managing release workflows
- ✅ Keeping branches synchronized

**Key Takeaways:**
- `git merge` combines branches
- `--no-ff` preserves branch history
- `--squash` creates clean history
- Always resolve conflicts carefully
- Test before and after merging

## See Also

- [Git Branch](./branch.md) - Branch management
- [Git Rebase](./rebase.md) - Alternative to merge
- [Git Cherry-Pick](./cherry-pick.md) - Merge specific commits
- [Git Diff](./diff.md) - See changes before merging
- [Git Reset](./reset.md) - Undo merges
