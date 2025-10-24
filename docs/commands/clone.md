# Git Clone

`git clone` creates a copy of a remote repository on your local machine. It's typically the first command you use when starting work on an existing project.

## Basic Clone

### Clone a Repository

```bash
git clone <repository-url>
```

**Example:**
```bash
# Clone via HTTPS
git clone https://github.com/user/repo.git

# Clone via SSH
git clone git@github.com:user/repo.git
```

This creates a directory named `repo` with the repository contents.

### Clone into Specific Directory

```bash
git clone <repository-url> <directory-name>
```

**Example:**
```bash
# Clone into custom directory
git clone https://github.com/user/repo.git my-project

# Clone into current directory
git clone https://github.com/user/repo.git .
```

## Clone Options

### Shallow Clone

Clone only recent history (faster, smaller):

```bash
# Clone only last commit
git clone --depth 1 <url>

# Clone last 10 commits
git clone --depth 10 <url>
```

**Use cases:**
- CI/CD pipelines
- Quick downloads
- Saving disk space
- Large repositories

**Example:**
```bash
$ git clone --depth 1 https://github.com/torvalds/linux.git
Cloning into 'linux'...
remote: Enumerating objects: 79322, done.
remote: Counting objects: 100% (79322/79322), done.
```

### Clone Specific Branch

```bash
# Clone only specific branch
git clone --branch <branch-name> <url>

# Shorthand
git clone -b <branch-name> <url>
```

**Example:**
```bash
# Clone develop branch
git clone -b develop https://github.com/user/repo.git

# Clone and create new directory
git clone -b feature-login https://github.com/user/repo.git my-feature
```

### Clone Single Branch

Clone only one branch (no other branch information):

```bash
git clone --single-branch --branch <branch-name> <url>
```

**Example:**
```bash
# Clone only main branch
git clone --single-branch -b main https://github.com/user/repo.git
```

### Shallow Clone of Specific Branch

```bash
# Combine shallow and single branch
git clone --depth 1 --single-branch --branch develop <url>
```

## Advanced Clone Options

### Clone with Submodules

```bash
# Clone repository and its submodules
git clone --recurse-submodules <url>

# Alternative
git clone --recursive <url>
```

If you forgot to clone with submodules:
```bash
git clone <url>
cd repo
git submodule update --init --recursive
```

### Bare Clone

Clone without a working directory (for servers):

```bash
git clone --bare <url>
```

Creates a `.git` repository without checked-out files.

### Mirror Clone

Complete mirror including all refs:

```bash
git clone --mirror <url>
```

**Use case:** Backing up or migrating repositories.

### Quiet Clone

Suppress output:

```bash
git clone --quiet <url>
# or
git clone -q <url>
```

### Verbose Clone

Show detailed progress:

```bash
git clone --verbose <url>
# or
git clone -v <url>
```

### Clone with Different Remote Name

```bash
# Clone and name remote something other than 'origin'
git clone --origin upstream <url>
```

### Template Directory

```bash
# Clone using template directory
git clone --template=<template-dir> <url>
```

## Clone Protocols

### HTTPS Clone

```bash
git clone https://github.com/user/repo.git
```

**Pros:**
- Works through firewalls
- Easy to set up
- No SSH key needed

**Cons:**
- Requires password (unless using credential helper)
- Slower for large repos

### SSH Clone

```bash
git clone git@github.com:user/repo.git
```

**Pros:**
- No password needed (uses SSH key)
- More secure
- Faster

**Cons:**
- Requires SSH key setup
- May be blocked by firewalls

### Local Clone

```bash
# Clone from local path
git clone /path/to/repo

# Clone from file:// protocol
git clone file:///path/to/repo
```

## After Cloning

### What Clone Does

When you clone:
1. Creates new directory
2. Initializes `.git` folder
3. Downloads all repository data
4. Checks out default branch
5. Creates `origin` remote pointing to source

### View Clone Information

```bash
# Check remote
git remote -v

# Check branches
git branch -a

# Check current branch
git branch --show-current

# View clone configuration
git config --list
```

## Common Workflows

### Workflow 1: Basic Clone and Start Working

```bash
# Clone repository
git clone https://github.com/user/repo.git

# Enter directory
cd repo

# Create feature branch
git checkout -b feature-new

# Make changes
# ... edit files ...

# Commit
git add .
git commit -m "Add new feature"

# Push
git push -u origin feature-new
```

### Workflow 2: Fork Workflow

```bash
# Clone your fork
git clone https://github.com/yourusername/repo.git

# Add upstream remote
cd repo
git remote add upstream https://github.com/original/repo.git

# Verify remotes
git remote -v
```

### Workflow 3: Quick CI/CD Clone

```bash
# Shallow clone for CI/CD (fast)
git clone --depth 1 --single-branch --branch main <url>

# Run tests
npm test

# Deploy if tests pass
```

### Workflow 4: Clone Large Repository

```bash
# Start with shallow clone
git clone --depth 1 https://github.com/large/repo.git

# Later, fetch full history if needed
cd repo
git fetch --unshallow
```

## Troubleshooting

### Clone Fails: Permission Denied

```bash
$ git clone git@github.com:user/private-repo.git
Permission denied (publickey).
fatal: Could not read from remote repository.
```

**Solution:**
```bash
# Check SSH key
ssh -T git@github.com

# Add SSH key if not set up
ssh-keygen -t ed25519 -C "your_email@example.com"

# Or use HTTPS instead
git clone https://github.com/user/private-repo.git
```

### Clone Fails: Repository Not Found

```bash
$ git clone https://github.com/user/wrong-repo.git
fatal: repository 'https://github.com/user/wrong-repo.git/' not found
```

**Solution:**
- Verify repository URL
- Check repository visibility (private vs public)
- Check repository name spelling
- Ensure you have access

### Clone Too Slow

```bash
# Use shallow clone
git clone --depth 1 <url>

# Or use SSH instead of HTTPS
git clone git@github.com:user/repo.git
```

### Out of Disk Space

```bash
# Use shallow clone to save space
git clone --depth 1 <url>

# Clean up afterwards
git gc --aggressive
```

## Converting Clone Types

### Convert Shallow to Full

```bash
# After shallow clone, fetch full history
git fetch --unshallow
```

### Convert Single-Branch to All Branches

```bash
# Remove single-branch restriction
git config remote.origin.fetch "+refs/heads/*:refs/remotes/origin/*"

# Fetch all branches
git fetch origin
```

## Best Practices

### 1. Use SSH for Frequent Access

```bash
# Set up SSH keys once, use everywhere
git clone git@github.com:user/repo.git
```

### 2. Use Shallow Clones for CI/CD

```bash
# Faster builds
git clone --depth 1 <url>
```

### 3. Clone with Submodules When Needed

```bash
# Don't forget submodules if project uses them
git clone --recurse-submodules <url>
```

### 4. Use Specific Branch for Features

```bash
# Clone directly to the branch you need
git clone -b feature-branch <url>
```

### 5. Verify Clone Success

```bash
cd repo
git status
git log --oneline -5
```

## Clone Size Optimization

### Check Repository Size

```bash
# Before cloning, check repo size (GitHub)
# Look at repository page

# After cloning
du -sh .git/
```

### Reduce Clone Size

```bash
# Option 1: Shallow clone
git clone --depth 1 <url>

# Option 2: Sparse checkout (partial clone)
git clone --filter=blob:none <url>

# Option 3: Specific branch only
git clone --single-branch -b main <url>
```

## Cloning Behind Proxy

```bash
# Set proxy
git config --global http.proxy http://proxy.example.com:8080

# Clone
git clone https://github.com/user/repo.git

# Unset proxy later
git config --global --unset http.proxy
```

## Summary

Git clone is essential for:
- ✅ Getting started with projects
- ✅ Contributing to open source
- ✅ Setting up development environment
- ✅ Creating backups
- ✅ Testing projects

**Key Commands:**
- `git clone <url>` - Basic clone
- `git clone --depth 1` - Shallow clone
- `git clone -b branch` - Clone specific branch
- `git clone --recurse-submodules` - Clone with submodules

**Key Takeaways:**
- Clone creates local copy of remote repository
- Use HTTPS for simple setup, SSH for convenience
- Shallow clones are faster and smaller
- Always verify clone success
- Set up remote tracking after clone

## See Also

- [Git Remote](./remote.md) - Managing remotes
- [Git Fetch & Pull](./pull.md) - Updating repository
- [Git Branch](./branch.md) - Working with branches
- [Getting Started](../guide/getting-started.md) - Initial setup
