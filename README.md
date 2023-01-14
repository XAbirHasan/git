# Git commands: Boost your productivity with git

Welcome everyone! 

When I first started using Git, I have to admit, I was a bit intimidated. I had heard so much about it and knew it was an essential tool for any developer, but I didn't know where to begin. I struggled with understanding the basic commands and couldn't seem to wrap my head around the whole concept of version control.

I started by going through online tutorials, reading documentation, and experimenting with different commands. I would spend hours trying to understand the different branches, commits, and merge conflicts, but I was determined to make it work. And eventually, with a lot of practice and patience, it clicked.

I hope that by sharing my experience, I can help others who may be struggling with Git at the beginning. I know it can be overwhelming, but trust me, it's worth it. With the right mindset, patience and resources, you too can master Git and improve your workflow.

This guide is designed for both beginners and advanced users who want to master the art of Git and improve their workflow. Whether you are a new developer just starting out with version control or an experienced professional looking to optimize your Git skills, this guide has something for everyone. We will cover essential Git commands, advanced techniques, and helpful hacks that will help you work more efficiently and effectively with Git. So let's dive in and discover the full power of Git!

## Git in-depth

## Cheatsheet

### Checking status of your files
  
  - view file status
    ```
    git status
    ```
  - view short status
    ```
    git status --short
    ```
  - view in machine readable format
    ```
    git status --porcelain
    ```
    The `--porcelain` option causes git status to display the status in a machine-readable format, which is intended to be easy to parse by scripts and other automated tools.



### Viewing the Commit History

  - view git logs
    ```
    git log
    ```
  - view logs in single line
    ```
    git log --oneline
    ```
  - view n numbers of logs
    ```
    git log -n
    ```
  - single line & n number of logs
    ```
    git log --oneline -n
    ```
  - log with patch changes
    ```
    git log --patch
    ```
  - showing stats
    ```
    git log --stat
    ```
    `stats`: how many files were changed, and how many lines in those files were added and removed. It also puts a summary of the information at the end.
  - sort stats
    ```
    git log --shortstat
      ```
  - graphical view
    ```
    git log --graph
    ```
  - logs without merge commits
    ```
    git log --no-merges
    ```
  - showing references with dates
    ```
    git log --pretty=reference
    ```

### Commit

  - add commit message
    ```
    git commit -m "your message"
    ```
  - add headline and details
    ```
    git commit -m "Headline" -m "details"
    ```
  - re-use commit message from another commit
    ```
    git commit --reuse-message=<commit-sha>
    // or 
    git commit -C <commit-sha>
    ```
  - re-use commit message from another commit and enable editing
    ```
    git commit --reedit-message=<commit-sha>
    // or
    git commit -c <commit-sha>
    ```
  - add something on last commit
    ```
    git commit --ammend
    ```
  - add something on last commit and  don’t want to update commit message
    ```
    git commit --ammend --no-edit
    ```


### Git Branching

  - list of all local branch
    ```
    git branch
    // or
    git branch --list
    ```
  - list all remotes branch
    ```
    git branch --remotes
    ```
  - list branch with last commit
    ```
    git branch --verbose
    // or
    git branch -v
    ```
  - create a new branch
    ```
    git branch -b "branch name"
    ```
  - rename a branch
    ```
    git branch -m "the renamed branch"
    ```
  - delete a branch
    ```
    git branch --delete "branch name
    ```
  - force delete a branch
    ``` 
    git branch --delete --force "branch name"
    // or
    git branch -D "branch name"
    ```
  - delete remote branch
    ```
    git push origin --delete "branch name"
    ```
  - checkout to a specific branch
    ```
    git checkout "branch name"
    ```
  - switch between recent two branches
    ```
    git checkout -
    ```

  #### You can use also use git switch (git 2.23 and onwards)

  - create a branch
    ```
    git switch --create "branch name"
    ```
  - checkout to a specific branch
    ```
    git switch "branch name"
    ```
  - switch between recent two branches
    ```
    git switch -
    ```

### Git tags

  Git supports two types of tag: 1. lightweight tag, 2. annotated tag
  - add a lightweight tag
    ```
    git tag "tag name"
    ``` 
  - add an annotated tag
    ```
    git tag --annotate "tag name"
    // or
    git tag -a "tag name"
    ```
  - add tag to a specific commit
    ```
    git tag --annotate "tag name" <commit-sha>
    ``` 
  - push tags to origin
    ```
    git push origin 'tag name'
    ```
  - push all tags at once
    ```
    git push origin --tags 
    ```
  - list all tags
    ```
    git tag --list
    // or
    git tag
    ```
  - list remotes tag
    ```
    git ls-remote --tags origin
    ```

### Git stash (Temporary storage)

  - stash changes
    ```
    git stash
    ```
  - add custom message when stash
    ```
    git stash push -m "your message"
    ```
  - include untracked (new) file
    ```
    git stash --include-untracked
    // or
    git stash -u
    ```
  - include untracked + ignored files 
    ```
    git stash --all
    ```
  - view stash list
    ```
    git stash list
    ```
  - apply last stash changes
    ```
    git stash pop
    ```
  - apply nth stash changes
    ```
    git stash pop <stash-head>
    ```
  - apply stash changes without deleting it
    ```
    git stash apply <stash-head>
    ```
  - delete a stash changes
    ``` 
    git stash drop <stash-head>
    ```
  - ❗ clear all stash _(make sure you know what you are doing!)_
    ```
    git stash clear
    ```
  - see stash changes
    ```
    git stash show <stash-head>
    ```
  - view path changes
    ```
    git stash show --patch <stash-head>
    ```
  - creating branch from stash
    ``` 
    git stash branch "branch-name" <stash-head>
    ```
    (usable when reapplying stash might create conflict and you want to test you stash changes or make new branch)

### Reset changes

  - reset last commit
    ```
    git reset HEAD~1
    ```
  - reset last n number of commits
    ```
    git reset HEAD~n
    ```
  - reset modes: 
    - `--soft`: does not reset the index or working tree files
    - `--hard`: reset the index + working tree files
    - `--mixed`: reset the index but *not* working tree files
  - reset the HEAD to origin/remote branch
    ```
    git reset origin/<branch-name>
    ```
  - reset last merge commit
    ```
    git reset --merge HEAD~1
    ```
  - abort merge commit (not commit yet)
    ```
    git reset --merge
    // or
    git merge --abort
    ```

### Revert changes
  - revert a commit
    ```
    git revert <commit-sha>
    ```
  - edit message
    ```
    git revert --edit <commit-sha>
    ```
  - don’t want to edit message
    ```
    git revert --no-edit <commit-sha>
    ```
  - stage changes instead of auto commit 
    ```
    git revert --no-commit <commit-sha>
    ```
  - revert range of commits
    ```
    git revert first-bad-commit^..last-bad-commit
    ```

