# Git Tags

A tag marks a specific commit as significant, usually a release (`v1.0`, `v2.1.3`), so you can refer back to "the code as it was at this release" without hunting through `git log` for the right commit. Unlike a branch, a tag doesn't move once created, it stays pointed at that one commit forever.

Git has two kinds: lightweight and annotated.

## Lightweight Tags

```
git tag "tag name"
```

Just a name pointing at a commit, nothing more, no message, no author, no date. Quick to create, but with no metadata if you ever need to know who tagged it or why.

```
git tag v1.0
```

## Annotated Tags

```
git tag --annotate "tag name" -m "message"
# or
git tag -a "tag name" -m "message"
```

Stores a full Git object: tagger name, email, date, and a message, alongside the commit reference. Use these for anything you'd actually want to look back on, releases especially, lightweight tags are really meant for quick, throwaway local markers.

```
git tag -a v1.0 -m "Release version 1.0"
```

Tag a specific commit instead of the current one by adding its SHA:
```
git tag -a "tag name" <commit-sha> -m "message"
```
```
git tag -a v1.0 abc123 -m "Release version 1.0"
```

## Pushing Tags

Tags don't travel with a normal `git push`, they need to be pushed explicitly:

```
git push origin "tag name"      # one tag
git push origin --tags          # every local tag at once
```

```
git push origin v1.0
```

## Listing Tags

```
git tag
# or
git tag --list
# filtered by pattern
git tag --list "v1.*"
# only tags already merged into the current branch
git tag --merged
# only tags NOT yet merged into the current branch
git tag --no-merged
```
`--merged`/`--no-merged` are useful for cleanup: they tell you which release tags actually made it into your current branch's history and which didn't, handy for spotting a tag that got created on the wrong branch.

```
$ git tag
v1.0
v1.1
v1.2
```

**Remote tags**, without fetching them first:
```
git ls-remote --tags origin
```
```
$ git ls-remote --tags origin
de3fa3dccfa6a08fa1127e82e1747f9a57f9c9d6	refs/tags/v1.0
65ba4e6ac71ac6c3a16a84a9c74d1b078f44c5d2	refs/tags/v2.0
```

**In chronological order**, useful for seeing the release timeline at a glance:
```
git for-each-ref --sort=creatordate refs/tags
```
Use `creatordate` rather than `taggerdate` here, `taggerdate` only exists on annotated tags, lightweight tags have no tagger and sort strangely (often to one end, regardless of when they were actually created). `creatordate` falls back to the underlying commit's date for lightweight tags, so it sorts correctly either way.

## Deleting a Tag

```
git tag -d "tag name"
```
```
$ git tag -d v2.0
Deleted tag 'v2.0' (was 65ba4e6)
```

This only deletes it locally. If you already pushed it, the remote still has its own copy, delete that separately:
```
git push origin --delete "tag name"
# or, older syntax with the same effect
git push origin :refs/tags/"tag name"
```

## Displaying Tag Information

```
git show "tag name"
```

For an annotated tag, this shows the tag's own message and metadata, then the commit it points to:
```
$ git show v3.0
commit 9e874b8af9270824e6784eebb79cc3bc3f863fa8
Author: XAbirHasan <abir@example.com>
Date: Tue Jan 10 14:00:00 2023 -0800

    Fixed a bug in the code

diff --git a/file.txt b/file.txt
index e69de29..1b2e1d63 100644
--- a/file.txt
+++ b/file.txt
@@ -0,0 +1 @@
+This is a new line in the file
```

## See Also

- [Git Log](/commands/log) - finding the commit you want to tag
- [Git Push](/commands/push) - the general push mechanics tags build on
- [Git Branch](/commands/branch) - the moving counterpart to a tag's fixed point
