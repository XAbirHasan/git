# Patch: what & why?

A patch is a file that contains a description of the changes made to a specific file or set of files. It is used to share changes with others or to apply changes to a different version of the same codebase.

The patch file contains information about the changes made in the form of a "diff", which is a standard format used to describe the differences between two sets of data. The <b>diff</b> describes the lines that have been added, removed, or modified in a file, and also indicates the location of these changes.

A patch file can be useful when you want to share changes with others without giving them access to your entire codebase. It can also be useful when you want to apply changes made by others to your codebase or when you have different versions of the same codebase and you want to merge them.

It's important to note that patch files can be complex, and applying them can sometimes cause conflicts with the existing code. Therefore, it's advisable to test the patch file before applying it to your codebase, specially when you are applying it to a different version of the same codebase.

## Make Patch File

```
git diff > fileName.patch
```
The `git diff` command can be used to create a patch file. This command is useful when you want to share changes with others without giving them access to your entire codebase. It is also useful when you want to apply changes to a different version of the same codebase.

Example:

Let's say you have made changes to a file called `main.c` and you want to share those changes with a collaborator. You can use the following command to create a patch file:

```
git diff > main.c.patch
```
This will create a patch file called `main.c.patch` that contains a description of the changes made to the `main.c` file.

## Make Patch File from Stage

If you want to create a patch file that contains only the changes that have been staged using `git add`, you can use the `--staged` or `--cached` option with the `git diff` command.
```
git diff --staged > fileName.patch
// or
git diff --cached > fileName.patch
```
This command is useful when you want to create a patch file that contains only the changes that are ready to be committed. It is also useful when you want to share changes that are not yet committed with others.

Example:

Let's say you have made changes to a file called `main.c` and you have staged some of those changes using `git add`. You can use the following command to create a patch file that contains only the staged changes:

```
git diff --staged > main.c.patch
```

## Apply Patch Changes

Once you have a patch file, you can use the `git apply` command to apply the changes to a different version of the same codebase.

```
git apply fileName.patch
```
This command is useful when you want to apply changes made by others to your codebase. It is also useful when you want to apply changes made to a different version of the same codebase.

Example:

Let's say you have a patch file called `main.c.patch` that contains changes made to the `main.c` file. You can use the following command to apply those changes to your codebase:

```
git apply main.c.patch
```

## Patch from n top commits

If you want to create a patch file that contains the changes made in several commits, you can use the `git format-patch` command. The `-n` option can be used to specify the number of commits you want to include in the patch file.

```
git format-patch -n <sha>
```
Example:

Let's say you have made 5 commits and you want to create a patch file that contains the changes made in the last 3 commits. You can use the following command:

```
git format-patch -3 HEAD
```
This will create 3 patch files, one for each of the last 3 commits, that you can share with others or apply to a different version of the same codebase.

## Apply Patch Changes (format-patch)

Once you have created a patch file using the `git format-patch` command, you can use the `git am` command to apply the changes to your codebase.

```
git am < file.patch
```
This command is useful when you want to apply changes made by others to your codebase, especially when the changes are made in multiple commits. It is also useful when you want to apply changes made to a different version of the same codebase and you have them in a patch file format.

It's important to note that the `git am` command will create new commits for each patch, whereas the `git apply` command will make changes to the working tree and will not create new commits.

Example:

Let's say you have a patch file called `main.c.patch` that contains changes made to the `main.c` file. You can use the following command to apply those changes to your codebase:

```
git am < main.c.patch
```

## Revert a patch
You can use the `git apply -R` command to revert changes made by a patch file. This command works similarly to git apply, but it undoes the changes made by the patch file.

```
git apply -R fileName.patch
```

Example:

Let's say you have applied a patch file called `main.c.patch` to your codebase and now you want to undo the changes made by the patch file. You can use the following command:

```
git apply -R main.c.patch
```

## Check the status of a patch
You can use the `git apply --check` command to check if a patch file can be applied without errors. This command does not make any changes to your codebase, it only checks for conflicts or other issues.
```
git apply --check fileName.patch
```

Example:

Let's say you want to check if a patch file called `main.c.patch` can be applied to your codebase without errors. You can use the following command:

```
git apply --check main.c.patch
```

## Check the details of a patch
You can use the `git show` command to view the details of a patch file, including the changes made, the author, and the commit message.
```
git show fileName.patch
```

Example:

Let's say you want to view the details of a patch file called `main.c.patch`. You can use the following command:

```
git show main.c.patch
```

## Create patch file for specific files
You can use the `git diff` command to create a patch file for specific files. This command works similarly to `git diff > fileName.patch`, but you can specify the files you want to include in the patch file.
```
git diff -- file1 file2 > fileName.patch
```
Example:

Let's say you want to create a patch file that contains changes made to the files `main.c` and `main.h`. You can use the following command:

```
git diff -- main.c main.h > main.patch
```
These commands can be useful in different situations, depending on what you want to achieve with your patch files.


## Create patch file for specific commits
You can use the `git diff` command to create a patch file for specific commits. This command works similarly to `git format-patch`, but it only includes the changes made in the specified commits.

```
git diff <commit-sha1> <commit-sha2> > fileName.patch
```

Example:

Let's say you want to create a patch file that contains changes made between commits `abc123` and `def456`. You can use the following command:

```
git diff abc123 def456 > changes.patch
```

## Create patch file for specific branch
You can use the `git diff` command to create a patch file for specific branch. This command is useful when you want to compare changes between two branches.

```
git diff <branch1> <branch2> > fileName.patch
```

Example:

Let's say you want to create a patch file that contains changes made between the master and the feature branches. You can use the following command:

```
git diff master feature > changes.patch
```
## Create patch file for specific files in specific commits
You can use the `git diff` command to create a patch file for specific files in specific commits. This command is useful when you want to compare changes between two commits or branches.

```
git diff <commit-sha1> <commit-sha2> -- <file1> <file2> > fileName.patch
```

Example:

Let's say you want to create a patch file that contains changes made to the files `main.c` and `main.h` between the commits `abc123` and `def456`. You can use the following command:

```
git diff abc123 def456 -- main.c main.h > changes.patch
```

## Notes
These commands can be useful in different situations, depending on what you want to achieve with your patch files. It's important to note that you should use them carefully❗ and test them before applying them to your codebase, specially when you are using them for specific commits or files.