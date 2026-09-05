# Git Bisect

`git bisect` finds which commit introduced a **bug**, using **binary search** instead of scrolling through history guessing. You tell it one commit you know was good and one you know was bad, and it checks out commits in between, one at a time, halving the search space each time you tell it whether that commit is good or bad, until it lands on the exact commit that broke things.

That's the real value: if a bug could have been introduced by any of 1,000 commits, manually bisecting by hand would take forever, but binary search finds it in about 10 steps.

## Start Debugging

```
git bisect start
git bisect good <sha-of-good-commit>
git bisect bad <sha-of-bad-commit>
```

If you skip the bad commit, Git assumes `HEAD` is bad, which is usually right since you're normally starting this because something's currently broken.

## Specify Good State

```
git bisect good
```

Marks the commit Git just checked out as good, i.e., the bug wasn't present yet.

## Specify Bad State

```
git bisect bad
```

Marks the commit Git just checked out as bad, i.e., the bug is already there.

## Terminate Bisect

```
git bisect reset
```

Ends the bisect session and returns you to the branch you were on before you started.

## Walkthrough

Say your code was working fine a few weeks ago, and now there's a bug. You know roughly which commit was good and which was bad, but not exactly where the bug crept in.

1. Start the process:
    ```
    $ git bisect start
    ```
2. Mark a known-good commit:
    ```
    $ git bisect good 83dba5d
    ```
3. Mark a known-bad commit:
    ```
    $ git bisect bad 2072b7e
    ```
4. Git checks out a commit roughly halfway between the two. Test it, however you'd normally check if the bug is present:
    ```
    $ ./run_tests.sh
    ```
5. Tell Git the result:
    ```
    $ git bisect bad   # if the test failed
    $ git bisect good  # if the test passed
    ```
6. Git checks out the next midpoint automatically. Repeat steps 4 and 5:
    ```
    Bisecting: 7 revisions left to test after this (roughly 3 steps)
    [7d90ee34a05c7f7f257300c7dcf98c83721a1b0c] Fix bug
    ```
7. Once Git narrows it down to a single commit, it stops and reports it. Investigate, fix the bug, then clean up:
    ```
    $ git bisect reset
    ```

## Automated Bisect

Testing each commit by hand works, but if you already have a script or test suite that can tell good from bad, you can hand the whole loop to Git:

```
git bisect run <shell-script>
```

The script needs to exit `0` for a good commit and a non-zero code (typically `1`) for a bad one, Git reads that exit code the same way it reads your manual `good`/`bad` answers. (Exit code `125` is special: it tells Git "this commit can't be tested, skip it," useful if a commit doesn't even build.)

If you already have a test suite, this is as simple as pointing bisect at it, most test runners already exit non-zero on failure by default:

```
git bisect start
git bisect good <sha-of-good-commit>
git bisect bad <sha-of-bad-commit>
git bisect run ./run_tests.sh
git bisect reset
```

Often though, there's no existing test for the specific regression, you just know the symptom. In that case, write a small script that checks for exactly that. Say a calculation in `main.py` used to print `42` and now prints something else:

```bash
#!/bin/bash
# check.sh - exit 0 if the bug is absent, 1 if it's present

output=$(python main.py)

if [ "$output" == "42" ]; then
    exit 0  # good: bug not present
else
    exit 1  # bad: bug present
fi
```

```
$ git bisect start
$ git bisect good 83dba5d
$ git bisect bad HEAD
$ git bisect run ./check.sh
running ./check.sh
Bisecting: 3 revisions left to test after this (roughly 2 steps)
[3f3d85d] Refactor calculation logic
running ./check.sh
...
7d90ee3 is the first bad commit
```

Git runs `check.sh` against each candidate commit automatically and reports the first one where it exited non-zero, no manual `good`/`bad` typing required.

## Bisect Skip

```
git bisect skip
```

Tells Git it can't test the current commit (doesn't build, unrelated breakage, etc.) and to try a different one instead of forcing a good/bad answer.

## Bisect Log

```
git bisect log
```

Shows every commit tested so far and how it was marked, useful for reviewing the search or sharing it with someone else.

## Bisect Visualize

```
git bisect visualize
```

Opens a graphical view (via `gitk`, if available) of the commit history with the current good/bad boundaries and the commit under test highlighted, useful for seeing how much search space is left at a glance rather than reading it off the terminal output.

For example, with history `A-B-C-D-E-F-G-H-I-J` where `A` is good and `J` is bad:

```
$ git bisect start
$ git bisect good A
$ git bisect bad J
$ git bisect visualize
```

This opens a view with `A` and `J` marked, and the current midpoint (say, `E`) highlighted as the commit to test next. Mark it good or bad, and the search continues, halving the remaining range each time, until it converges on the exact commit that introduced the bug.

## See Also

- [Git Log](/commands/log) - browsing history to pick good/bad candidates
- [Git Reset](/commands/reset) - `git bisect reset` uses the same underlying mechanism to return you to your original branch
