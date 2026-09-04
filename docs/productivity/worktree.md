# Git Worktree

Normally, a Git repository has one working directory attached to it. If you're mid-way through a feature and suddenly need to fix a bug on `main`, you're forced to `git stash` your changes, switch branches, fix the bug, switch back, and pop the stash. It works, but it's disruptive, especially if you had a build running or a bunch of files open in your editor.

`git worktree` solves this by letting you check out multiple branches at the same time, each into its own folder, all sharing the same underlying repository. No stashing, no switching — you just move to a different folder.

There are two common ways to set this up. Both work, but one keeps your project organized as you add more worktrees over time.

## Option 1: Adding a Worktree to an Existing Clone (Not Recommended)

If you already have a normal clone, you can add a worktree straight from it:

```
git worktree add ../feature-branch feature-branch
```

This checks out `feature-branch` into a new folder at `../feature-branch`, right next to your existing clone. If the branch doesn't exist yet, create it at the same time with `-b`:

```
git worktree add -b feature-branch ../feature-branch main
```

Example:

Let's say you're working in `~/projects/app` on a feature, and a hotfix comes in. You can add a worktree for it without touching your current work:

```
$ cd ~/projects/app
$ git worktree add -b hotfix/login-bug ../app-hotfix main
$ cd ../app-hotfix
```

You now have two independent folders, `app` and `app-hotfix`, checked out to different branches at the same time.

This is the quickest way to try worktrees, but it doesn't scale well. Every worktree you add lives as a sibling folder next to wherever you happened to clone the repo (`../app-hotfix`, `../../app-review`, ...). As you add more, there's no single folder that represents "the project" — just your original clone plus a growing pile of scattered siblings. For anything beyond a one-off, the setup below is worth the extra minute.

> **Note:** This is also the version covered by most `git worktree` tutorials online, since it's the fastest way to see the command working. In practice, though, if you're working on a large-scale application with several worktrees going at once, a pile of dangling sibling folders scattered next to your repo gets messy fast — which is exactly what the setup below avoids.

## Option 2: Bare Repository Setup (Recommended)

Instead of a normal clone, clone the repository as **bare** directly into a folder named `.git`, inside a folder that will hold your whole project:

```
mkdir my-project && cd my-project
git clone --bare <repo-url> .git
```

Because Git looks for a `.git` folder to find "the repository," naming the bare clone exactly `.git` means every plain Git command you run from inside `my-project` just works — no `--git-dir` flag needed. Your worktrees can now live as clean sibling folders inside `my-project`, instead of being scattered around your filesystem.

One gotcha: a bare clone doesn't set up the usual fetch refspec, so future branches created on the remote won't show up automatically. Fix that once, right after cloning:

```
git config remote.origin.fetch "+refs/heads/*:refs/remotes/origin/*"
git fetch origin
```

Now add a worktree for each branch you want checked out:

```
git worktree add main
git worktree add feature/login
```

Your project folder ends up looking like this:

```
my-project/
├── .git/               # bare repo — shared Git data, no working files
├── main/                # worktree checked out to main
└── feature/login/       # worktree checked out to feature/login
```

Everything — the repo data and every branch you're working on — lives under one `my-project` folder, instead of leaking into sibling directories next to it.

## Managing Worktrees

A few commands you'll use regularly once you have more than one worktree:

```
git worktree list
```
Shows every worktree attached to the repository and which branch each one has checked out.

```
git worktree remove <path>
```
Removes a worktree you no longer need. The folder must be clean (no uncommitted changes) unless you pass `--force`.

```
git worktree prune
```
Cleans up leftover worktree metadata after you've deleted a worktree's folder manually instead of using `remove`.
