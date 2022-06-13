---
sidebar_position: 2
---

# Contributing

## General

In general, to work on prytaneum, these are the steps to follow:

1. Fork the project.
2. Make and commit your changes.
3. Open PR into the **`dev`** branch.

### Commits

Commits need to follow a specific format, which makes for a nicer commit history and eases the burden on the reviewer. Read more at the [commitlint](https://www.conventionalcommits.org/en/v1.0.0/) docs and by inspecting the [`commitlint.config.js`](https://github.com/c2c-project/prytaneum/blob/dev/commitlint.config.js).

:::tip Interactive Prompt
Ensure your commit is always properly formatted by using the interactive prompt via `yarn g:commit`.
:::

### Before Requesting a Review

In an effort to keep PR's clean, we use rebase/squash git workflow.

Please read up on [what rebasing is if you are unfamiliar](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase). The tl;dr is that rather than merging two linked lists, `git merge`, and creating a new merge commit, we're cutting and pasting, `git rebase`, from one branch onto another. The rest of the guide will assume a basic understanding of `git rebase`.

:::tip Gitlens
Install [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) in Visual Studio Code and run `git config --global core.editor "code --wait"`. This will allow you to use vscode interactively when rebasing. Otherwise, it will use Vim by default, which you are also welcome to keep.

You may also need to add the `code` command into your PATH if you are on [macOS.](https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line)
:::

## Step 1: Create Upstream Remote

Please run the following commands

```bash
git remote add upstream git@github.com:c2c-project/prytaneum.git # You may need to setup ssh keys
git fetch upstream # Update local refs
```

:::note
You may use a name other than `upstream`. However, `upstream` will be assumed throughout this guide.
:::

## Step 2: Rebase Onto Upstream

```bash
git rebase upstream/dev -i # Rebase onto upstream/dev branch interactively
```

If you had no merge conflicts, then skip to step 3.

### Step 2a: Which Commits to Keep

`drop` **any** commit that satisfies the following:

1. It is not a commit you wrote.
2. It was part of another PR that has already been merged.

`pick` **any** commit that satisfies the following:

1. It is a commit that you intend to include in a future PR.

### Step 2b: Resolving Conflicts

During an interactive rebase, if you have 10 commits, and there's a merge conflict in the first commit, you will only see your work up to the first commit. If you made changes to the same file in later commits and do not see your work, do not panic! Rebasing will iteratively "replay" each `pick`ed onto the HEAD dev branch as if you wrote them starting at the HEAD commit of dev and it will "pause" at commits with merge conflicts so that you can resolve them.

Once you have resolved all conflicts, make sure to run

```bash
git add . # assuming your are in the root of the project
git rebase --continue # replay commits until we hit the next merge conflict
```

## Step 3: Updating the PR

When you rebase a branch, you're rewriting history, which means that there are new commit hashes. In order to push to Github, you'll have to force push.

```bash
git push origin your_branch_here --force # or use -f
```

## FAQ / Help

### What is rebasing?

-   [This will probably answer most of your questions](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase)
-   [Here is a useful video that can also be referenced.](https://www.youtube.com/watch?v=f1wnYdLEpgI&list=PLZbjkP1oQ5zZG-7auCO54cNuHQ0_GBC7k&index=3)

### Why rebase instead of merge?

Honestly, it's just preference. Rebasing in interactive mode forces you to make sure your changes are merged correctly commit-by-commit instead of all at one time in a git merge (the default strategy in a git pull).

:::tip
You can change the default behavior of `git pull` to rebase: `git config --global pull.rebase true`. If you don't want to change it for all of your projects with git, just remove the `--global` flag.
:::

If you're interested to hear more of an explanation, ask in slack.

### Is there something wrong with merging?

Nope. This is all just preference. There is a tradeoff with rebasing: rebasing changes history (the commit hashes). When you're rebasing, any changes you make or conflicts you resolve is actively changing the history. What this means is that commits you already have on the remote repo will have a different commit hash after rebasing, which means you'll hav eto force push. If you're rebasing a public branch, this can be problematic. If you're the only one editing said branch, then it's not really an issue to `git push --force`, however, this should always be done with caution. If you google "git rebase vs merge" you'll find lots of passionate discussion 😄

### I have a merge commit, is that bad?

Not at all. We'll still merge the PR, just make sure the diff isn't something outrageous (1k+ files).

Optionally, you can rebase and `drop` the merge commit.

### I think something is wrong in this guide.

That's certainly possible! Open a PR or send a message with what you believe is wrong/the fix.
