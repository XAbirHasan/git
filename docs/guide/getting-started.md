# Getting Started with Git

Welcome to your Git journey! This guide will help you get started with Git, from installation to your first commit.

## Installation

### Windows
Download Git from [git-scm.com](https://git-scm.com/) and run the installer.

### macOS
Install using Homebrew:
```bash
brew install git
```

Or download from [git-scm.com](https://git-scm.com/).

### Linux
Use your distribution's package manager:

**Ubuntu/Debian:**
```bash
sudo apt-get install git
```

**Fedora:**
```bash
sudo dnf install git
```

## Initial Configuration

After installing Git, configure your identity:

```bash
# Set your name
git config --global user.name "Your Name"

# Set your email
git config --global user.email "your.email@example.com"

# Set default branch name to main
git config --global init.defaultBranch main

# Check your configuration
git config --list
```

## Creating Your First Repository

### Initialize a New Repository

```bash
# Create a new directory
mkdir my-project
cd my-project

# Initialize Git
git init
```

### Clone an Existing Repository

```bash
git clone https://github.com/username/repository.git
```

## Basic Workflow

### 1. Check Status
```bash
git status
```

### 2. Add Files
```bash
# Add specific file
git add filename.txt

# Add all files
git add .
```

### 3. Commit Changes
```bash
git commit -m "Your commit message"
```

### 4. View History
```bash
git log
```

## Working with Remotes

### Add a Remote Repository
```bash
git remote add origin https://github.com/username/repository.git
```

### Push Your Changes
```bash
git push -u origin main
```

### Pull Changes from Remote
```bash
git pull origin main
```

## Essential Commands for Beginners

| Command | Description |
|---------|-------------|
| `git init` | Initialize a new repository |
| `git clone <url>` | Clone a repository |
| `git status` | Check repository status |
| `git add <file>` | Stage files for commit |
| `git commit -m "message"` | Commit staged changes |
| `git push` | Push commits to remote |
| `git pull` | Pull changes from remote |
| `git log` | View commit history |

## Common Scenarios

### Making Your First Commit

```bash
# Create a new file
echo "# My Project" > README.md

# Stage the file
git add README.md

# Commit the file
git commit -m "Initial commit: Add README"

# Push to remote (if set up)
git push origin main
```

### Checking What Changed

```bash
# See what files changed
git status

# See specific changes
git diff
```

### Undoing Changes

```bash
# Discard changes in a file
git checkout -- filename.txt

# Unstage a file
git reset HEAD filename.txt
```

## Best Practices for Beginners

1. **Commit Often**: Make small, focused commits
2. **Write Clear Messages**: Describe what and why, not how
3. **Pull Before Push**: Always pull latest changes before pushing
4. **Use Branches**: Keep your main branch stable
5. **Review Before Commit**: Check `git status` and `git diff`

## Common Pitfalls to Avoid

- ❌ Don't commit sensitive information (passwords, API keys)
- ❌ Don't make huge commits with unrelated changes
- ❌ Don't force push to shared branches
- ❌ Don't ignore merge conflicts
- ❌ Don't work directly on the main branch for features

## Getting Help

### Command Help
```bash
# Get help for any command
git help <command>
git <command> --help

# Quick reference
git <command> -h
```

### Useful Resources

- [Official Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Pro Git Book](https://git-scm.com/book/en/v2)

## Next Steps

Now that you have the basics, explore:

- [Git Status in Detail](/commands/status)
- [Mastering Git Commit](/commands/commit)
- [Working with Branches](/commands/branch)
- [Complete Command Cheatsheet](/cheatsheet)

Ready to dive deeper? Let's explore the powerful features of Git!
