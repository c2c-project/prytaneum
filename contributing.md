# Contributing

- [Contributing](#contributing)
  - [Commits](#commits)
  - [Setup](#setup)
    - [Required](#required)
    - [Optional](#optional)
    - [I want to open a PR into dev](#i-want-to-open-a-pr-into-dev)
      - [Step 1. Fetch upstream](#step-1-fetch-upstream)
      - [Step 2. Rebase](#step-2-rebase)
      - [Step 2a. What commits do I keep](#step-2a-what-commits-do-i-keep)
      - [Step 2b. Resolving conflicts](#step-2b-resolving-conflicts)
      - [Step 3. Pushing to your forked branch](#step-3-pushing-to-your-forked-branch)
    - [FAQ](#faq)

## Commits

https://www.conventionalcommits.org/en/v1.0.0/

Commits are linted via using [commitlint](https://github.com/conventional-changelog/commitlint)

## Setup

### Required

In an effort to keep PR's clean, we use rebase/squash git workflow.

Please read up on [what rebasing is if you are unfamiliar](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase). The tl;dr is that rather than merging two linked lists (`git merge`) and creating a new merge commit, we're cutting and pasting (`git rebase`) from one branch onto another. The rest of the guide will assume a basic understanding of `git rebase`.

Please run the following commands

```bash
git remote add upstream git@github.com:c2c-project/prytaneum.git # You may need to setup ssh keys
git fetch upstream
```
**NOTE**: You can name the remote anything you want `upstream`,`c2c`, or `something`.  The above and following examples uses the name `upstream`.
You can think of this as setting up another "source" from which your git client can fetch updates from. You're probably already familiar with `origin` as a source. When you first clone a repository, origin is a remote repository already set up for you based on the address from which you cloned the repository. Disclaimer: I'm not a git expert, but I've gotten by with thinking of things in this way.

### Optional

```bash
git config --global core.editor "code --wait" # RECOMMENDED set vim as the preferred text editor instead of vim, you may also need to install the gitlens extension on vscode
git config --global pull.rebase true # pull will now fetch+rebase instead of fetch+merge
```

### I want to open a PR into dev

#### Step 1. Fetch upstream

```bash
git fetch upstream
```

#### Step 2. Rebase

```bash
git rebase -i  upstream/dev
```

#### Step 2a. What commits do I keep

You should keep any **new** commits and drop everything else, _usually_ (also drop any merge commits if there are any). If you see a commit that you know was merged in a different PR that is yours, drop it. The commit shows up because we use a squash/rebase workflow. Meaning that commit has probably been squashed into another, different, commit.

#### Step 2b. Resolving conflicts

Rebasing onto `upstream/dev` will re-run your commits on top of the new `upstream/dev` HEAD (cutting and pasting your commits on top of `upstream/dev`). This may result in some conflicts.

You probably made your modifications iteratively. If you have 10 commits, and there's a merge conflict in commit 1, you will only see your work up to commit 1. Resolve the merge conflict with respect to how commit 1 should look if you had started on the latest `upstream/dev`. As you continue to rebase, you will see more and more of your completed work.

#### Step 3. Pushing to your forked branch

When you push to your forked branch you'll probably have to force push. That's okay since only you are working on that branch. You'll need to do this every time you rebase.

### FAQ

1. What is rebasing?  
   [This will probably answer most of your questions](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase)

2. Why rebase instead of merging?  
   Honestly, it's just preference. Rebasing in interactive mode forces you to make sure your changes are merged correctly commit-by-commit instead of all at one time in a git merge (the default strategy in a git pull). **Pro-tip:** you can change the default behavior of `git pull` to rebase: `git config --global pull.rebase true`. If you don't want to change it for all of your projects with git, just remove the `--global` flag.

    If you're interested to hear more of an explanation, ask in slack.

3. Is there something wrong with merging?  
   Nope. This is all just preference. There is a tradeoff with rebasing: rebasing changes history. When you're rebasing, any changes you make or conflicts you resolve is actively changing the history. If you're rebasing a public branch, this can be problematic. If you're the only one editing said branch, then it's not really an issue to `git push --force`, however, this should always be done with caution. If you google "git rebase vs merge" you'll find lots of passionate discussion :)

4. I have a merge commit, is that bad?  
   Not at all. We'll still merge the PR, just make sure the diff isn't something outrageous.

5. I think something is wrong in this guide.
   That's certainly possible! Open a PR or send a message with what you believe is wrong/the fix.
