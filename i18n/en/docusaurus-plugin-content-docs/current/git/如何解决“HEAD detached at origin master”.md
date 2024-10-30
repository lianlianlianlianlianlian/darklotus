---
id: git-hdaom 
slug: hdaom 
sidebar_position: 100  
title: How to Solve "HEAD detached at origin master
description: How to solve the issue of "HEAD detached at origin master
sidebar_label: How to Solve "HEAD detached at origin master
date: 2024-10-27
authors: lian
tags: [git, github]
keywords: [git, github]

---

> Problem Description: There are multiple remote repositories locally. One day, when you need to push to one of them, the following prompt appears:

```
HEAD detached at origin_game/maste
```

## HEAD
Conclusion: The meaning of the above prompt is that the commit you are making does not belong to a branch.

This is an official explanation. To better understand this statement, we need to know what `HEAD` is.

The `HEAD` file is usually a symbolic reference, pointing to the currently active branch. A symbolic reference means it is a pointer that points to other references.

Normally, the `HEAD` should be in the following state. If yours is different, then you need to fix the detached `HEAD`.
```
$ cat.git/HEAD
ref: refs/heads/master
```

### Fixing the Detached HEAD
If for some reason the `HEAD` points to a commit that does not belong to a branch, you need to create a temporary branch and let this branch point to the commit that the detached `HEAD` is currently pointing to:

```
# Because the remote repository for this commit is origin_game, so you need to switch to this branch.
# git checkout origin_game/master

# Create a temporary branch on this branch.
$ git checkout -b temp_branch
```

The purpose of this is to reconnect our `HEAD` to the temporary branch `temp_branch`.

Next, we can use some commands to check if it meets our expectations.

```
# Compare the historical commits of the remote branch and the temporary branch.
$ git log --graph --decorate --pretty=oneline --abbrev-commit master origin/master temp_branch

# Compare the specific differences between the master branch and the temporary branch.
$ git diff master temp_branch

# Compare the specific differences between the remote branch and the temporary branch.
$ git diff origin/master temp_branch
```

Point the `HEAD` of the temporary branch to `master`.

```
# The temporary branch will be used to determine where the `HEAD` of the master branch should point.
$ git branch -f master temp_branch

# Switch back to the master branch.
$ git checkout master

# The above two commands can be abbreviated as
$ git checkout -B master temp_branch
```

At this point, the `master` branch is consistent with `origin_game/master`, so the temporary branch can be deleted.

```
$ git branch -d temp_branch
```

Finally, update the remote repository on the `master` branch.

```
# Merge the feature branch.
$ git merge fire_bug

$ git push origin_game/master
```

Since then, the detached `HEAD` can be successfully fixed.

Note:
* You cannot make commits on the `origin/master` branch. Commits can only be made on the `master` branch.

### Reference Links
* [head detached from origin-master](https://www.loekvandenouweland.com/content/head-detached-from-origin-master.html)
* [How can I reconcile detached HEAD with master/origin?](https://stackoverflow.com/questions/5772192/how-can-I-reconcile-detached-head-with-master-origin)