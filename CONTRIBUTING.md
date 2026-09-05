# Contributing

Quick guide for adding or editing pages in this Git guide.

## Writing a page

- Open with what the command does and why you'd reach for it, not a dictionary definition. Nobody has ever finished reading "X is a command that allows users to..." and felt something.
- Keep the "why is this useful" reasoning. Shorter isn't the goal, useful is.
- Show a real before/after when something stateful changes (a rebase todo file, a conflict), not just an abstract placeholder. `<commit-sha>` has never taught anyone anything.
- Keep the inline `#` comments in multi-line command blocks. Some people read the code before they read your beautiful prose. Rude, but true.
- End with a `## See Also` linking related pages: `- [Title](/path) - one-line reason`.

## Voice

Write like a human explaining this to a friend, not like a press release for the letter G. Skip the em dashes, skip "Git is a powerful tool that...", skip anything that could describe literally any product ever made. AI-assisted writing is fine, AI slop is not, if a sentence sounds like it's performing enthusiasm instead of saying something, cut it. No rocket emoji on headings either. A warning emoji (⚠️ ❗ 🚫 💣) earns its keep, decoration doesn't.

## Accuracy

Know what you're writing about, or at least look like you do. If you're not sure a flag exists, run it or read `git <command> --help` before you commit a sentence to it, Git will tell you the truth even when you'd rather it didn't. And before you call an edit done, diff it against what was there (`git diff HEAD -- <file>`), it's shockingly easy to polish the prose right off of a command that actually worked.

One more: this project uses **pnpm**, not npm. `npm install` will run without complaint and then quietly betray you later.
