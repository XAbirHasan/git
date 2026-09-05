# What is Git?

Ever wished you could undo a mistake in your code, see exactly who changed a line and why, or try out a risky idea without any danger of breaking what already works? That's the problem Git was built to solve.

Git is a version control system: it records every change made to a set of files over time, so you always know what changed, when, and by whom. That history lets developers collaborate on the same project, revert to an earlier version when something breaks, and branch off to try out new ideas without putting the main codebase at risk.

Unlike tools that keep one shared copy of a project on a server, Git is distributed: cloning a repository gives you its entire history, not a thin pointer to it. That's what makes branching, offline work, and recovering from mistakes so cheap in Git compared to older version control systems.

## Checking where you stand

Two commands answer most day-to-day questions about a repository:

- `git status` shows what's changed in your working copy right now: modified files, staged files, untracked files.
- `git log` shows what happened before now: the full history of commits, their authors, and their messages.

Everything else in Git builds on top of these two views: you check what changed, decide what to do about it, and the history in `git log` records the result.

## How teams actually use it

**Software development.** Each person on a team clones the repository, makes changes on their own copy, and pushes them back. Everyone can work at the same time without conflicts, and if a feature turns out to be a bad idea, the team can revert to the commit before it was introduced instead of hand-undoing the damage.

**Data science.** The same model works for Jupyter notebooks, Python scripts, and even datasets: version them alongside the code that produces them, and you can reproduce a past result exactly, compare two versions of a model, or roll back a notebook to before an experiment went wrong.

## Why it matters

- **Full history, always recoverable.** Every commit is permanent, so you can see who changed what and why, and revert to any earlier state whenever you need to.
- **Every clone is a full backup.** There's no single point of failure. If the server hosting your repository disappears, any clone can restore it completely.
- **Branches are cheap.** Creating one just adds a pointer to a commit, so trying out a risky idea costs nothing and never touches the main line of work until you choose to merge it.
- **Collaboration without exclusive locks.** Everyone works on their own copy and reconciles by pushing and pulling, instead of needing sole access to shared files.

## Next steps

- [Getting Started](/guide/getting-started) - install Git and make your first commit
- [Git Status](/commands/status) - the full `git status` reference
- [Git Log](/commands/log) - the full `git log` reference
- [Complete Cheatsheet](/cheatsheet) - quick reference for all commands
