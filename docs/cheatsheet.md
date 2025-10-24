# Git Command Cheatsheet

Quick reference for the most commonly used Git commands. This cheatsheet provides fast access to essential Git operations.

## Getting Started

### Clone a Repository
```bash
# Clone via HTTPS
git clone https://github.com/user/repo.git

# Clone via SSH
git clone git@github.com:user/repo.git

# Shallow clone (faster)
git clone --depth 1 <url>

# Clone specific branch
git clone -b branch-name <url>
```

## Checking Status of Your Files
  
### View File Status
```bash
git status
```

### View Short Status
```bash
git status --short
```

### View in Machine Readable Format
```bash
git status --porcelain
```
The `--porcelain` option causes git status to display the status in a machine-readable format, which is intended to be easy to parse by scripts and other automated tools.

## Viewing the Commit History

### View Git Logs
```bash
git log
```

### View Logs in Single Line
```bash
git log --oneline
```

### View N Numbers of Logs
```bash
git log -n
```

### Single Line & N Number of Logs
```bash
git log --oneline -n
```

### Log with Patch Changes
```bash
git log --patch
```

### Showing Stats
```bash
git log --stat
```
Shows how many files were changed, and how many lines in those files were added and removed. It also puts a summary of the information at the end.

### Short Stats
```bash
git log --shortstat
```

### Graphical View
```bash
git log --graph
```

### Logs Without Merge Commits
```bash
git log --no-merges
```

### Showing References with Dates
```bash
git log --pretty=reference
```

### View Git History of Specific Line
```bash
git log --pretty=short -u -L <start line>,<end line>:<file path>
```

### Search for Code Within Git History
```bash
git log -S "CodeSnippet or searchString"
```

### Search for Commit Message Within Git History
```bash
git log --grep=<pattern>
```

## Commit

### Add Commit Message
```bash
git commit -m "your message"
```

### Add Headline and Details
```bash
git commit -m "Headline" -m "details"
```

### Re-use Commit Message from Another Commit
```bash
git commit --reuse-message=<commit-sha>
# or 
git commit -C <commit-sha>
```

### Re-use Commit Message and Enable Editing
```bash
git commit --reedit-message=<commit-sha>
# or
git commit -c <commit-sha>
```

### Add Something on Last Commit
```bash
git commit --amend
```

### Add Something on Last Commit Without Updating Message
```bash
git commit --amend --no-edit
```

## Staging Files (Git Add)

### Add Specific Files
```bash
git add file.txt
git add file1.txt file2.txt
```

### Add All Changes
```bash
git add .
git add --all
git add -A
```

### Interactive Staging (Patch Mode)
```bash
# Stage changes interactively
git add -p

# Stage specific hunks
git add --patch file.txt
```

### Add Modified Files Only
```bash
# Don't add new files
git add -u
```

## Viewing Differences (Git Diff)

### View Unstaged Changes
```bash
git diff
```

### View Staged Changes
```bash
git diff --staged
# or
git diff --cached
```

### Compare Branches
```bash
git diff branch1..branch2
git diff main...feature
```

### Compare Commits
```bash
git diff commit1 commit2
git diff HEAD~1
```

### Diff Specific File
```bash
git diff file.txt
git diff --staged file.txt
```

### Show Only Changed Files
```bash
git diff --name-only
git diff --name-status
```

## Merging Branches

### Merge Branch into Current
```bash
git merge branch-name
```

### Merge with No Fast-Forward
```bash
git merge --no-ff branch-name
```

### Squash Merge
```bash
git merge --squash branch-name
git commit -m "Squashed changes"
```

### Abort Merge
```bash
git merge --abort
```

## Remote Repositories

### View Remotes
```bash
git remote
git remote -v
```

### Add Remote
```bash
git remote add origin https://github.com/user/repo.git
git remote add upstream https://github.com/original/repo.git
```

### Remove Remote
```bash
git remote remove remote-name
```

### Change Remote URL
```bash
git remote set-url origin new-url
```

## Fetching & Pulling

### Fetch from Remote
```bash
git fetch
git fetch origin
git fetch --all
```

### Pull Changes
```bash
git pull
git pull origin main
git pull --rebase
```

### Pull with Fast-Forward Only
```bash
git pull --ff-only
```

## Pushing Changes

### Push to Remote
```bash
git push
git push origin main
```

### Push and Set Upstream
```bash
git push -u origin branch-name
```

### Push All Branches
```bash
git push --all
```

### Push Tags
```bash
git push --tags
git push origin v1.0.0
```

### Force Push (Use with Caution!)
```bash
git push --force-with-lease
```

### Delete Remote Branch
```bash
git push origin --delete branch-name
```

## Restoring Files (Git Restore)

### Discard Changes in File
```bash
git restore file.txt
git restore .
```

### Unstage File
```bash
git restore --staged file.txt
```

### Restore from Specific Commit
```bash
git restore --source=HEAD~1 file.txt
git restore --source=main file.txt
```

### Interactive Restore
```bash
git restore -p file.txt
```



## Git Branching

### Show Current Branch
```bash
git branch --show-current
```

### List of All Local Branches
```bash
git branch
# or
git branch --list
```

### List All Remote Branches
```bash
git branch --remotes
```

### List Branch with Last Commit
```bash
git branch --verbose
# or
git branch -v
```

### See Merged Branches
```bash
git branch --merged
```

### Create a New Branch
```bash
git branch -b "branch name"
```

### Rename a Branch
```bash
git branch -m "the renamed branch"
```

### Delete a Branch
```bash
git branch --delete "branch name"
```

### Force Delete a Branch
```bash
git branch --delete --force "branch name"
# or
git branch -D "branch name"
```

### Delete Remote Branch
```bash
git push origin --delete "branch name"
```

### Checkout to a Specific Branch
```bash
git checkout "branch name"
```

### Switch Between Recent Two Branches
```bash
git checkout -
```

### Git Switch (Git 2.23 and onwards)

#### Create a Branch
```bash
git switch --create "branch name"
```

#### Checkout to a Specific Branch
```bash
git switch "branch name"
```

#### Switch Between Recent Two Branches
```bash
git switch -
```

## Git Tags

Git supports two types of tags: 1. lightweight tag, 2. annotated tag

### Add a Lightweight Tag
```bash
git tag "tag name"
``` 

### Add an Annotated Tag
```bash
git tag --annotate "tag name"
# or
git tag -a "tag name"
```

### Add Tag to a Specific Commit
```bash
git tag --annotate "tag name" <commit-sha>
``` 

### Push Tags to Origin
```bash
git push origin 'tag name'
```

### Push All Tags at Once
```bash
git push origin --tags 
```

### List All Tags
```bash
git tag --list
# or
git tag
```

### List Remote Tags
```bash
git ls-remote --tags origin
```

## Git Stash (Temporary Storage)

### Stash Changes
```bash
git stash
```

### Add Custom Message When Stashing
```bash
git stash push -m "your message"
```

### Include Untracked (New) Files
```bash
git stash --include-untracked
# or
git stash -u
```

### Include Untracked + Ignored Files
```bash
git stash --all
```

### View Stash List
```bash
git stash list
```

### Apply Last Stash Changes
```bash
git stash pop
```

### Apply Nth Stash Changes
```bash
git stash pop <stash-head>
```

### Apply Stash Without Deleting It
```bash
git stash apply <stash-head>
```

### Delete a Stash
```bash
git stash drop <stash-head>
```

### ❗ Clear All Stashes
```bash
git stash clear
```
⚠️ Make sure you know what you are doing!

### See Stash Changes
```bash
git stash show <stash-head>
```

### View Patch Changes
```bash
git stash show --patch <stash-head>
```

### Create Branch from Stash
```bash
git stash branch "branch-name" <stash-head>
```
Useful when reapplying stash might create conflict and you want to test your stash changes or make a new branch.

## Reset Changes

### Reset Last Commit
```bash
git reset HEAD~1
```

### Reset Last N Number of Commits
```bash
git reset HEAD~n
```

### Reset Modes
- `--soft`: does not reset the index or working tree files
- `--hard`: reset the index + working tree files
- `--mixed`: reset the index but *not* working tree files

### Reset HEAD to Origin/Remote Branch
```bash
git reset origin/<branch-name>
```

### Reset Last Merge Commit
```bash
git reset --merge HEAD~1
```

### Abort Merge Commit (Not Committed Yet)
```bash
git reset --merge
# or
git merge --abort
```

## Revert Changes

### Revert a Commit
```bash
git revert <commit-sha>
```

### Edit Message
```bash
git revert --edit <commit-sha>
```

### Don't Edit Message
```bash
git revert --no-edit <commit-sha>
```

### Stage Changes Instead of Auto Commit
```bash
git revert --no-commit <commit-sha>
```

### Revert Range of Commits
```bash
git revert first-bad-commit^..last-bad-commit
```

## Patch

### Make Patch File
```bash
git diff > fileName.patch
```

### Make Patch File from Stage
```bash
git diff --staged > fileName.patch
# or
git diff --cached > fileName.patch
```

### Apply Patch Changes
```bash
git apply fileName.patch
```

### Patch from N Top Commits
```bash
git format-patch -n <sha>
```

### Apply Patch Changes (format-patch)
```bash
git am < file.patch
```

## Rebase Git Commit History

### Rebase Your Branch Head
```bash
git rebase <parent-branch>
```

### Interactive Rebase
```bash
git rebase --interactive <commit-sha>^
```
The `^` (caret) means parent to that commit

### Continue Rebasing
```bash
git rebase --continue
```

### Abort Rebase
```bash
git rebase --abort
```

### Add Fixup Commit
```bash
git commit --fixup=<commit-sha>
```

### Auto Squash Commit
```bash
git rebase --interactive --autosquash <commit-sha>
```

## Debugging with Git (Bisect)

### Start Debugging
```bash
git bisect start
git bisect good sha-of-good-commit
git bisect bad sha-of-bad-commit
```
If bad commit is not provided, default is the last commit.
Then **Test** your application and provide info about which state is good and which state is bad.

### Specify Good State
```bash
git bisect good
```

### Specify Bad State
```bash
git bisect bad
```

### Terminate Bisect
```bash
git bisect reset
```

## Reflog (Insurance in Git)
  
### View Reference Logs
```bash
git reflog
```
Reference logs expiry time: default is 90 days

### Set Expiry Time
```bash
git config gc.reflogExpire <time>
# set for 90 days
git config gc.reflogExpire 90.days
# set never
git config gc.reflogExpire never
```

### View Expiry Time
```bash
git config --get gc.reflogExpire
```

### Unset Expiry Time
```bash
git config --unset gc.reflogExpire
```

### Tree View of Git Reflog (Works with gitk)
```bash
gitk --all `git reflog | cut -c1-7`
```

### Recover Deleted Commit

Delete or reset your last commit (mostly used: `git reset --hard HEAD~1`)

To get back to previous state:
```bash
git reset --hard HEAD@{1}
```

If you made any commit after deleting or want to get back an old deleted commit:

1. List the reflog history:
```bash
git reflog
```

2. Find your commit from the reflog history

3. Add commit using git cherry-pick command:
```bash
git cherry-pick <commit-sha | @HEAD{number}>
```

You can also copy commit message from the reflog:
```bash
git commit --reuse-message=<commit-sha | @HEAD{number}>
# or 
git commit -C <commit-sha | @HEAD{number}>
```

Copy commit message from the reflog and enable editing:
```bash
git commit --reedit-message=<commit-sha | @HEAD{number}> 
# or 
git commit -c <commit-sha | @HEAD{number}>
```

### Recover Deleted Branch

If you delete your old branch or accidentally delete any branch:

1. List the reflog history:
```bash
git reflog
```

2. Find your last commit on your deleted branch

3. Checkout to your branch:
```bash
git checkout -b "branch-name" <commit-sha | @HEAD{number}>
```

### ❌ Don't Use These Commands

⚠️ Ensure that you are doing what you are supposed to do.

#### Clean Old or Unapproachable Reflog Entries
```bash
git reflog expire
```

#### Delete Reflog Entries
```bash
git reflog delete  
```
💣 This command causes data loss (use this at your own risk!)
