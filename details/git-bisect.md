# Git bisect

Git bisect is a powerful tool that allows developers to find the source of a <b>bug</b> in their code by systematically searching through the Git history. The process of using `git bisect` involves finding a known good commit, then marking it as such, and finding a known bad commit, then marking it as such. Then, Git will perform a binary search through the Git history, checking out the code at different points and allowing you to test the application.

One common use case for git bisect is when a bug has been reported in your application, but you're not sure when it was introduced. You could manually search through the Git history, but this can be time-consuming and error-prone. With git bisect, you can quickly narrow down the range of commits to the one that introduced the bug.

Git Bisect starts by marking a known good commit and a known bad commit. It then splits the commit history in the middle and tests the code at that point. Based on the results of the test, the tool marks the tested commit as either good or bad, and splits the commit history in the middle again. This process continues until the exact commit that introduced the bug is found.

Commands:

### Start debugging: 
To start debugging using Git Bisect, you need to run the following commands:

```
git bisect start
git bisect good sha-good-sate-old-commit
git bisect bad sha-bad-state-new-commit
```
If you do not provide the sha-bad-state-new-commit, the default value is the last commit. Then, you need to test your application and provide info about which state is good and which state is bad.

### Specify good state: 
To specify a good state, use the following command:
```
git bisect good
```
### Specify bad state: 
To specify a bad state, use the following command:

```
git bisect bad
```
### Terminate bisect: 
To terminate the Git Bisect process, you can use the following command:

```
git bisect reset
```

Let's say you have a codebase that was working perfectly fine a few weeks ago. But now, there's a bug that is affecting your code's functionality. You want to find out which commit introduced the bug. With Git Bisect, you can start by marking the last commit where your code was working fine as a good commit and the latest commit as a bad commit. Then, Git Bisect will perform a binary search on the commit history and test the code in each step. When the exact commit that introduced the bug is found, you can fix it and continue your development process.

Example:

- Step 1: Start bisect process
    ```
    $ git bisect start
    ```
- Step 2: Specify a good commit
    ```
    $ git bisect good 83dba5d
    ```
- Step 3: Specify a bad commit
    ```
    $ git bisect bad 2072b7e
    ```
- Step 4: Run the test (or do it manually) to check if the current state is good or bad
    ```
    $ ./run_tests.sh
    ```
- Step 5: If the test fails, the current state is considered bad. Mark it as bad.
    ```
    $ git bisect bad
    ```
- Step 6: If the test passes, the current state is considered good. Mark it as good.
    ```
    $ git bisect good
    ```
- Step 7: Repeat steps `4` to `6` until git bisect finds the commit that introduced the bug.
    ```
    Bisecting: 7 revisions left to test after this (roughly 3 steps)
    [7d90ee34a05c7f7f257300c7dcf98c83721a1b0c] Fix bug
    ```
- Step 8: Once `git bisect` finds the commit that introduced the bug, it will stop. You can then investigate that commit and fix the bug. Then reset bisect process
    ```
    $ git bisect reset
    ```
That's the basic process of using git bisect to find the commit that introduced a bug.

## Automated Bisect 
Git Bisect can be automated with the help of shell scripts. The script should exit with status `0` for good commits and status `1` for bad commits.

```
git bisect run <shell-script>
```

here's an example of how to automate Git Bisect using a shell script:

1. Start the bisect process:
    ```
    git bisect start
    git bisect good sha-of-good-commit
    git bisect bad sha-of-bad-commit
    ```
2. Write a shell script that tests the state of the application. The script should return a `0` status code if the state is good and a `1` status code if the state is bad:
    ```
    #!/bin/bash

    # Run the test script
    ./run_tests.sh

    # Get the exit status of the test script
    exit_status=$?

    # Exit with the status code
    exit $exit_status
    ```
3. Automate the bisect process using the shell script:
    ```
    git bisect run shell-script.sh
    ```
4. After the bisect process is complete, reset the bisect process:
    ```
    git bisect reset
    ```

The above steps will run the shell script for each commit, and Git Bisect will automatically determine which commit is good or bad based on the exit status code returned by the shell script. Once the bisect process is complete, Git Bisect will report the commit that introduced the bug.

### The shell script example
```
#!/bin/sh

# Start the bisect process
git bisect start

# Specify the good commit
git bisect good <sha-of-good-commit>

# Specify the bad commit
git bisect bad <sha-of-bad-commit>

# Define a function to check if the state is good or bad
check_state() {
  # run tests or checks to determine if the state is good or bad
  # ...

  # If the state is good, return 0
  if [ $state = "good" ]; then
    return 0
  fi

  # If the state is bad, return 1
  if [ $state = "bad" ]; then
    return 1
  fi
}

# Call the check_state function
git bisect run check_state

# Reset the bisect process
git bisect reset
```
### The test case example
```
# A function to run tests or checks to determine if the state is good or bad
check_state() {
  # run tests or checks here
  # ...

  # If the state is good, return 0
  if [ $state = "good" ]; then
    return 0
  fi

  # If the state is bad, return 1
  if [ $state = "bad" ]; then
    return 1
  fi
}

# Call the check_state function
git bisect run check_state
```

In the above code, the shell script starts the Git bisect process, specifies the good and bad commits, and then runs the check_state function to determine if the state is good or bad. The check_state function should contain any tests or checks necessary to determine the state of the application.

This script can be saved as a shell script file, such as `bisect.sh`, and run using the command `sh bisect.sh`. This will automate the Git bisect process, allowing you to quickly and easily find the source of a bug in your application.

## Bisect Skip 
Sometimes, Git Bisect may not be able to test a specific commit, so it can be skipped by using the following command:
```
git bisect skip
```
## Bisect Log
To view a log of all the commits that have been bisected, use the following command:
```
git bisect log
```
## Bisect Visualize 
To visualize the bisect process, use the following command:
```
git bisect visualize
```

This command opens up a visual interface that displays the commit history, with the good and bad commits marked, and the current bisection state indicated.

For example, let's say you have a Git repository with the following commit history:

```
A-B-C-D-E-F-G-H-I-J
```
And you want to find the commit that introduced a bug in your code. You know that the latest commit (J) is bad, and that commit A is good. To visualize the bisection process, you would run the following commands:

```
$ git bisect start
$ git bisect good A
$ git bisect bad J
$ git bisect visualize
```
This will open a visual interface that shows the commit history, with `A` and `J` marked as good and bad, respectively. The current bisection state (`B` in this case) is indicated with a red arrow. You can then test your code to determine whether `B` is good or bad, and run git bisect good or git bisect bad accordingly.

This process is repeated until the bad commit is found. In the visual interface, the history of the bisection process is shown as a tree, with branches representing different possibilities. The visual representation helps you see the progress of the bisection and helps you understand the history of the codebase.

##
In conclusion, Git Bisect is a powerful tool that helps in debugging the Git repository by finding the commit that introduced a bug. These commands provide a comprehensive solution to various debugging problems faced by developers.
