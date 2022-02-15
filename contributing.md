# Contributing

## Commits

https://www.conventionalcommits.org/en/v1.0.0/

Commits are linted via using [commitlint](https://github.com/conventional-changelog/commitlint)

## Before you open the PR

This little step-by-step guide will ensure you have the latest changes!

### Step 1.

If you don't already have the main repo of prytaneum as a remote repo, do the following:

```bash
git remote add upstream git@github.com:c2c-project/prytaneum.git
```
**NOTE**: You can name the remote anything you want `upstream`,`c2c`, or `something`.  The above and following examples uses the name `upstream`.
You can think of this as setting up another "source" from which your git client can fetch updates from. You're probably already familiar with `origin` as a source. When you first clone a repository, origin is a remote repository already set up for you based on the address from which you cloned the repository. Disclaimer: I'm not a git expert, but I've gotten by with thinking of things in this way.

Adding prytaneum as a new remote allows you to do the following:

```bash
git fetch upstream
```

Running the command above ensures that your local git client knows about the latest changes that are happening on prytaneum!

### Step 2.

Next, we'll rebase.

```bash
git rebase -i upstream/BRANCH_YOU_WANT_TO_MERGE_IN_TO
```

Most of the time the command will end up being `git rebase -i upstream/dev` since you should always be merging into dev.

If you have no conflicts, then you're good to go! Keep reading if you have conflicts.

### Step 3.

So you've got a conflict. The process of solving a conflict can sometimes be a little difficult.

The conflict stems from how most conflicts do: Two or more people worked on the same file.

After you solve the conflict, either by inspecting the code or asking someone, save the changes and make sure to `git add RESOLVED_FILE_HERE`.

Then, you'll run `git rebase --continue` until the CLI says you're done.

You're all set to open the PR!

### FAQ

1. What is rebasing?   
[This will probably answer most of your questions](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase)

2. Why rebase instead of merging?   
Honestly, it's just preference. Rebasing in interactive mode forces you to make sure your changes are merged correctly commit-by-commit instead of all at one time in a git merge (the default strategy in a git pull). __Pro-tip:__ you can change the default behavior of `git pull` to rebase: `git config --global pull.rebase true`.  If you don't want to change it for all of your projects with git, just remove the `--global` flag.

3. Is there something wrong with merging?   
Nope. This is all just preference. There is a tradeoff with rebasing: rebasing changes history. When you're rebasing, any changes you make or conflicts you resolve is actively changing the history. If you're rebasing a public branch, this can be problematic. If you're the only one editing said branch, then it's not really an issue to `git push --force`, however, this should always be done with caution. If you google "git rebase vs merge" you'll find lots of passionate discussion :)

4. I have a merge commit, is that bad?  
Not at all.  We'll still merge the PR, just make sure the diff isn't something outrageous.
