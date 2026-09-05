# Commit

`git commit` saves your staged changes as a snapshot in the project's history: a point you can always come back to, compare against, or point someone to later. Think of each commit as a checkpoint you can return to if something goes wrong.

## Adding a Commit Message

The most basic form of committing is a short message describing what changed, using the `-m` option:

```
git commit -m "your message"
```

Example: you've changed `main.py` and want to commit it with the message "Added new feature":

```
$ git add main.py
$ git commit -m "Added new feature"
[master c1f2e3d4] Added new feature
 1 file changed, 1 insertion(+), 1 deletion(-)
```

## Adding a Headline and Details

For a change that needs more explanation than a single line, pass `-m` twice: the first becomes the headline, the second becomes the body of the commit message. This is useful when the *what* is obvious from the diff but the *why* isn't.

```
git commit -m "Headline" -m "details"
```

Example:
```
$ git commit -m "Added new feature" -m "added new function to calculate average"
[master c1f2e3d4] Added new feature
 1 file changed, 1 insertion(+), 1 deletion(-)
```

## Reusing a Commit Message from Another Commit

Git lets you reuse a commit message from an earlier commit instead of retyping it. This is handy when you're making a similar change across multiple files, or grouping related commits under a consistent message.

### `--reuse-message` / `-C`

```
git commit --reuse-message=<commit-sha>
```

Reuses the message *and timestamp* from `<commit-sha>` exactly as they were, without opening an editor.

```
$ git log --oneline
f6c9a6b Fix typo in README
8ecab1a Add new feature

$ git add README.md
$ git commit --reuse-message=f6c9a6b
```

This creates a new commit carrying the message "Fix typo in README" and the timestamp from `f6c9a6b`.

### `--reedit-message` / `-c`

```
git commit --reedit-message=<commit-sha>
```

Same idea as `-C`, but opens the message in your editor first so you can adjust it before committing. Useful when the old message is a good starting point but not quite right for this commit.

```
$ git add README.md
$ git commit --reedit-message=f6c9a6b
```

## Amending a Commit

```
git commit --amend
```

Rewrites the most recent commit instead of creating a new one. This is useful when you forgot to include a file in your last commit, or want to change its message. Rather than making a separate "oops, forgot this" commit, you fold the fix into the one it belongs to. Git reopens the commit message in your editor; save and exit to apply the change.

```
$ git commit -m "Initial commit"
$ git add forgot_to_include.txt
$ git commit --amend
```

Here, the initial commit was missing `forgot_to_include.txt`. Staging it and running `--amend` adds it to that same commit instead of creating a new one.

### Amending Without Changing the Message

```
git commit --amend --no-edit
```

Same as `--amend`, but keeps the existing commit message untouched. Useful for a quick fix, like a forgotten file or a typo in the code, where the original message still accurately describes the commit.

```
$ git commit -m "initial commit"
[master (root-commit) abcdef0] initial commit
 1 file changed, 2 insertions(+)
 create mode 100644 file.txt

$ git add forgotten-file.txt
$ git commit --amend --no-edit
[master abcdef0] initial commit
 2 files changed, 2 insertions(+)
 create mode 100644 file.txt
 create mode 100644 forgotten-file.txt
```

⚠️ **Please note:** `--amend` **rewrites commit history**. Use it with caution if the commit has already been pushed to a remote or shared with other collaborators: anyone who already pulled the old commit will run into a diverged history.

## See Also

- [Git Add](/commands/add) - staging changes before committing
- [Git Log](/commands/log) - viewing commit history
- [Git Reflog](/commands/reflog) - recovering commits after a bad amend or reset
