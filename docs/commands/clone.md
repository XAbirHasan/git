# Git Clone

`git clone` downloads a repository and sets it up as a working copy on your machine. It's usually the very first command you run on a project, and because Git is distributed, it doesn't just grab the latest snapshot, it downloads the entire history, so you get a fully independent copy the moment cloning finishes.

## Basic Clone

```bash
git clone <repository-url>
```

```bash
# HTTPS
git clone https://github.com/user/repo.git

# SSH
git clone git@github.com:user/repo.git
```

This creates a directory named `repo`. To use a different name, or clone into the current (empty) directory:

```bash
git clone https://github.com/user/repo.git my-project   # into a named directory
git clone https://github.com/user/repo.git .              # into the current directory
```

## HTTPS vs. SSH

Both protocols do the same job, the difference is in setup and daily friction:

- **HTTPS**: works anywhere, even through restrictive firewalls, no key setup needed. But it usually prompts for credentials on push unless you've set up a credential helper.
- **SSH**: no password prompts once your key is set up, generally faster for large repos. But it requires that one-time key setup, and some networks block the SSH port.

If you push often, the SSH setup pays for itself quickly. For a one-off clone, HTTPS is less friction.

## Shallow and Single-Branch Clones

Full history can be a lot of data on an old or large repository. If you don't need it:

```bash
# Only the latest commit
git clone --depth 1 <url>

# Last 10 commits
git clone --depth 10 <url>
```

Good for CI/CD pipelines and quick throwaway checkouts, anywhere you just need the code as it is right now, not its history.

```bash
# Only one branch, no others
git clone --single-branch --branch develop <url>

# Combine both for the smallest possible clone
git clone --depth 1 --single-branch --branch main <url>
```

If you later need the full history after all:

```bash
git fetch --unshallow
```

## Clone with Submodules

If the repository references other repositories as submodules, a plain clone leaves them as empty folders:

```bash
git clone --recurse-submodules <url>
```

Forgot the flag? Fetch them after the fact:

```bash
git clone <url>
cd repo
git submodule update --init --recursive
```

## Bare and Mirror Clones

```bash
git clone --bare <url>
```

A bare clone has no working directory, just the repository data, meant to be pushed to and fetched from, not edited in. This is what you'd set up on a server to host a repository others push to.

```bash
git clone --mirror <url>
```

A mirror clone is a bare clone that also stays in lockstep with every ref on the source, branches, tags, and deletions included, rather than only the branches you'd get by default. Use it for a full backup or when migrating a repository to a new host, where "everything, exactly as it was" is the point.

## Other Useful Options

```bash
# Name the remote something other than 'origin'
git clone --origin upstream <url>

# Suppress or expand output
git clone --quiet <url>
git clone --verbose <url>

# Clone from a local path instead of a URL
git clone /path/to/repo
```

## After Cloning

A clone does five things: creates the directory, initializes `.git`, downloads all the data, checks out the default branch, and points a remote (named `origin` by default) back at where it came from. Worth checking that it landed the way you expected:

```bash
git remote -v          # confirm origin points where you expect
git branch -a          # see local and remote branches
git status              # confirm you're on the expected default branch
git log --oneline -5    # confirm the history actually came through
```

## Common Workflows

**Contributing to a fork:**
```bash
# Clone your fork
git clone https://github.com/yourusername/repo.git

# Add upstream remote
cd repo
git remote add upstream https://github.com/original/repo.git

# Verify remotes
git remote -v
```
`origin` is your fork, `upstream` is the original, this is the standard setup for keeping your fork in sync while contributing back.

**CI pipeline:**
```bash
git clone --depth 1 --single-branch --branch main <url>
```
Fast and disposable, since a CI run doesn't need history, just the code.

## Troubleshooting

**Permission denied (SSH):**
```
Permission denied (publickey).
fatal: Could not read from remote repository.
```
Check your key works at all (`ssh -T git@github.com`), set one up if it doesn't, or fall back to HTTPS.

**Repository not found:**
```
fatal: repository '...' not found
```
Usually a typo in the URL, or the repo is private and you don't have access yet.

**Cloning is slow or the repo is huge:**
Use `--depth 1`, or SSH instead of HTTPS if you haven't already, both address different bottlenecks (data volume vs. connection overhead) so try whichever fits the actual problem.

## See Also

- [Git Remote](/commands/remote) - managing remotes after cloning
- [Git Fetch & Pull](/commands/pull) - updating a clone with new changes
- [Git Branch](/commands/branch) - working with branches once cloned
- [Getting Started](/guide/getting-started) - the full first-commit walkthrough
