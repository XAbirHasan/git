# Git commands: Boost your productivity with git

Welcome everyone! 

When I first started using Git, I have to admit, I was a bit intimidated. I had heard so much about it and knew it was an essential tool for any developer, but I didn't know where to begin. I struggled with understanding the basic commands and couldn't seem to wrap my head around the whole concept of version control.

I started by going through online tutorials, reading documentation, and experimenting with different commands. I would spend hours trying to understand the different branches, commits, and merge conflicts, but I was determined to make it work. And eventually, with a lot of practice and patience, it clicked.

I hope that by sharing my experience, I can help others who may be struggling with Git at the beginning. I know it can be overwhelming, but trust me, it's worth it. With the right mindset, patience and resources, you too can master Git and improve your workflow.

This guide is designed for both beginners and advanced users who want to master the art of Git and improve their workflow. Whether you are a new developer just starting out with version control or an experienced professional looking to optimize your Git skills, this guide has something for everyone. We will cover essential Git commands, advanced techniques, and helpful hacks that will help you work more efficiently and effectively with Git. So let's dive in and discover the full power of Git!

## Git in-depth
  - [what is git](./details/git.md)
  - [git status](./details/git-status.md)
  - [git log](./details/git-log.md)
  - [git commit](./details/git-commit.md)
  - [git branch](./details/git-branch.md)
  - [git stash](./details/git-stash.md)
  - [patch](./details/patch.md)
  - [git tag](./details/git-tag.md)
  - [git reset](./details/git-reset.md)
  - [git revert](./details/git-revert.md)
  - [git rebase](./details/git-rebase.md)
  - [git bisect](./details/git-bisect.md)
  - [git reflog](./details/git-reflog.md)
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
  - show current branch
    ```
    git branch --show-current
    ```
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
  - see the branches that have been merged into the current branch
    ```
    git branch --merged
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

### Patch
  - make patch file
    ```
    git diff > fileName.patch
    ```
  - make patch file from stage
    ```
    git diff --staged > fileName.patch
    // or
    git diff --cached > fileName.patch
    ```
  - apply patch changes
    ```
    git apply fileName.patch
    ```
  - patch from n top commits
    ```
    git format-patch -n <sha>
    ```
  - apply patch changes (format-patch)
    ```
    git am < file.patch
    ```

### Rebase git commit history

  - rebase your branch head
    ```
    git rebase <parent-branch>
    ```
  - interactive rebase (change specific commit or update branch history)
    ```
    git rebase --interactive <commit-sha>^
    ```
    (here ^(caret) means parent to that commit) 
  - continue rebasing
    ```
    git rebase --continue
    ```
  - abort rebase
    ```
    git rebase --abort
    ```
  - add fixup commit
    ```
    git commit --fixup=<commit-sha>
    ```
  - auto squash commit
    ```
    git rebase --interactive --autosquash <commit-sha>
    ```
### Debugging with git (bisect)

  - To start debugging
    ```
    git bisect start
    git bisect good sha-of-good-commit
    git bisect bad sha-of-bad-commit
    ```
    If bad commit is not provided, default is the last commit.
    Then *Test* your application and provide info about which state is good and which sate is bad.
  - to specify good state
    ```
    git bisect good
    ```
  - to specify bad state
    ```
    git bisect bad
    ```
  - terminate bisect
    ```
    git bisect reset
    ```




### Reflog (insurance in git)
  
  - The reference logs
    ```
    git reflog
    ```
    reference logs expiry time: default is 90 days
  - set expiry time 
    ```
    git config gc.reflogExpire <time>
    // set for 90 days
    git config gc.reflogExpire 90.days
    // set never
    git config gc.reflogExpire never
    ```
  - view expiry time
    ```
    git config --get gc.reflogExpire
    ```
  - unset expiry time
    ```
    git config --unset gc.reflogExpire
    ```
  - tree view of git reflog (works with gitk)
    ```
    gitk --all `git reflog | cut -c1-7`
    ```

#### Recover deleted commit
  - delete or reset your last commit (mostly used: `git reset --hard HEAD~1`)
    To get back on previous state
    ```
    git reset --hard HEAD@{1}
    ```
  - if you make any commit after deleting or get back an old deleted commit:
    1. List the reflog history
        ```
        git reflog
        ```
    2. find your commit from the reflog history
    3. add commit using git cherry-pick command
        ```
        git cherry-pick <commit-sha | @HEAD{number}>
        ```
  - we can also copy commit message from the reflog
    ```
    git commit --reuse-message=<commit-sha | @HEAD{number}>
    // or 
    git commit -C <commit-sha | @HEAD{number}>
    ```
  - copy commit message from the reflog and enable editing
    ```
    git commit --reedit-message=<commit-sha | @HEAD{number}> 
    // or 
    git commit -c <commit-sha | @HEAD{number}>
    ```
#### Recover deleted branch
  - if you delete your old branch or accidentally delete any branch
    1. List the reflog history
        ```
        git reflog
        ```
    2. find your list commit on your deleted branch
    3. then checkout to your branch
        ```
        git checkout -b "branch-name" <commit-sha | @HEAD{number}>
        ```
#### ❌ Don’t use this commands

  ⚠️ Ensure that you are doing what you are supposed to.
  - clean old or unapproachable reflog entries
    ```
    git reflog expire
    ```
  - delete reflog entries
    ```
    git reflog delete  
    ```
  This command causes data loss (use this at you own risk :bomb:)

## License

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.
