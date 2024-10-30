---
id: git-gitignore 
slug: gitignore 
sidebar_position: 20  
title: Git File Ignoring Rules
description: Git file ignoring rules 
sidebar_label: Git File Ignoring Rules
date: 2024-10-27
authors: lian
tags: [git, github]
keywords: [git, github, gitignore]

---

In a complete project, there is usually a file named `.gitignore`.

This file is used to manage and configure the files that do not need to be included in version control.

### Configuration Syntax
* Lines starting with the hash symbol `#` are considered comments.
* Lines starting with a slash `/` represent directories.
* The asterisk `*` is used to match multiple characters.
* The question mark `?` is used to match a single character.
* Square brackets `[]` are used to contain a list of single-character matches.
* The exclamation mark `!` indicates that files or directories previously excluded by a pattern should not be ignored. If the parent directory of a file is excluded, the file cannot be re-included.

### Example 1
```
Rule: test/*
Explanation: Ignore all the contents under the test directory; note that whether it is the /test/ directory at the root level or the /child/test/ directory in a subdirectory, they will all be ignored.

Rule: /test/*
Explanation: Ignore all the contents of the /test/ directory at the root level.

Rule: test
Explanation: Ignore the test file and the test directory.

Rule: test/
Explanation: Only ignore the test directory, not the test file.

Rule: test
!test/
Explanation: Only ignore the test file, not the test directory.

Rule: /test
Explanation: Only ignore the test file and directory in the current directory. The test in subdirectories is not within the ignoring range.

Rule: *.[oa]
Explanation: Ignore all files ending with.o or.a.

Rule: **/node_modules/
Explanation: Ignore the node_modules folders named as such in all folders, which is the same as directly writing node_modules/.
```

### Example 2
```
Rules:
/*
!/test
/test/*
!/test/inner.js

Explanation: Ignore all contents, but do not ignore the /test directory and the /test/inner.js file at the root level.
```

### The Issue of the.gitignore File Not Taking Effect
#### Problem Description
> Before the.gitignore file was generated, some files already existed in the local repository, and the rules included in the.gitignore file do not have an effect on those files.

#### Cause of the Issue:
This is because the file was created and committed to the local repository before the files to be ignored, so **it results in the file already being in the local cache**.

This causes the rules of.gitignore to not directly affect the file, resulting in it not taking effect.

#### Solution:
Delete the file from the local cache using the command: `git rm --cached <file>`
```
# The -- in front of <file> can be omitted.
$ git rm --cached -- <file>
rm '<file>'
$ git commit -m "Delete cached file"
```
This command means: Delete the file from the cache area, but keep the physical file. So after you execute this command and commit, you will find that the local file still exists, and its contents remain unchanged.

There is just one more commit in the whole process.


### Reference Links:
* [Git Ignore Commit Rules](https://www.cnblogs.com/kevingrace/p/5690241.html)
* [Git Ignore Commit](https://www.cnblogs.com/youyoui/p/8337147.html)