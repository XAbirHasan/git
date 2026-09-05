# Git Worktree

Normally, a Git repository has one working directory attached to it. If you're mid-way through a feature and suddenly need to fix a bug on `main`, you're forced to `git stash` your changes, switch branches, fix the bug, switch back, and pop the stash. It works, but it's disruptive, especially if you had a build running or a bunch of files open in your editor.

`git worktree` solves this by letting you check out multiple branches at the same time, each into its own folder, all sharing the same underlying repository. No stashing, no switching: you just move to a different folder.

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

This is the quickest way to try worktrees, but it doesn't scale well. Every worktree you add lives as a sibling folder next to wherever you happened to clone the repo (`../app-hotfix`, `../../app-review`, ...). As you add more, there's no single folder that represents "the project," just your original clone plus a growing pile of scattered siblings. For anything beyond a one-off, the setup below is worth the extra minute.

> **Note:** This is also the version covered by most `git worktree` tutorials online, since it's the fastest way to see the command working. In practice, though, if you're working on a large-scale application with several worktrees going at once, a pile of dangling sibling folders scattered next to your repo gets messy fast, which is exactly what the setup below avoids.

## Option 2: Bare Repository Setup (Recommended)

Instead of a normal clone, clone the repository as **bare** directly into a folder named `.git`, inside a folder that will hold your whole project:

```
mkdir my-project && cd my-project
git clone --bare <repo-url> .git
```

Because Git looks for a `.git` folder to find "the repository," naming the bare clone exactly `.git` means every plain Git command you run from inside `my-project` just works, no `--git-dir` flag needed. Your worktrees can now live as clean sibling folders inside `my-project`, instead of being scattered around your filesystem.

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
├── .git/               # bare repo, shared Git data, no working files
├── main/                # worktree checked out to main
└── feature/login/       # worktree checked out to feature/login
```

Everything (the repo data and every branch you're working on) lives under one `my-project` folder, instead of leaking into sibling directories next to it.

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

## Why Worktrees? Benefits & Pro Workflow

Once worktrees are set up, they change how you handle day-to-day context switching, and they're especially useful if you work with AI coding agents.

### Everyday Benefits

- **No more stash juggling.** A hotfix, a code review, an urgent question: each gets its own folder on its own branch, and your in-progress work stays exactly as you left it.
- **Keep long-running processes alive.** A dev server, a build, or a test watcher running against one branch doesn't need to be killed just because you want to look at another branch.
- **Review a PR without disturbing your work.** Check out a colleague's branch into its own worktree, look through it, run it. Your actual working branch never moves.
- **Parallel builds and tests.** Since each worktree is a real checkout, you can run a full test suite on one branch while continuing to edit another.

### Using Worktrees Like a Pro

- **Name folders after branches.** Keeping `feature/login` as the folder name for the `feature/login` branch (as in the bare setup above) means you never have to guess what's checked out where.
- **One editor window per worktree.** Open each worktree as its own editor window instead of switching branches inside a single window, so your open tabs, breakpoints, and terminal state stay put per branch.
- **Use throwaway worktrees for spikes.** `git worktree add -b spike/idea-name spike/idea-name main` gives you an isolated space to try something risky; if it doesn't pan out, `git worktree remove` it and the branch, no cleanup of your main working copy required.
- **Prune after deleting branches.** Make `git worktree prune` a habit after you delete branches you were done with, since stale worktree metadata otherwise lingers.

### Agentic Workflow Benefit

AI coding agents work by directly reading, editing, and running commands in a working directory. If you point one at the same folder you're actively coding in, its edits and yours end up mixed together in the same uncommitted diff, making it hard to review and hard to undo cleanly.

Give an agent its own worktree instead. It gets a real, isolated checkout to work in, free to edit files, install dependencies, and run commands, while your own working copy stays untouched. When it's done, you review that worktree's diff on its own terms: merge it if it's good, or just `git worktree remove` the folder and delete the branch if it isn't. Running several agents on different tasks at once works the same way: one worktree per agent, each with its own branch, none of them stepping on each other.
