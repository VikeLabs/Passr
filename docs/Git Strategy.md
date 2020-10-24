# Git Strategy

The following document outlines the git branching strategy and policies that we will be following for the Passr project. It will specify how branches should be named, a general idea of how to write commit messages and what is needed for a pull request.

## Branching Scheme

We will be following the [GitHub Flow](https://guides.github.com/introduction/flow/) branching model, TL;DR branch off of master with your feature, merge to master through a pull request. Want more details? Checkout the link.

We differ in our deployment in that we will merge your code to master, deploy to our test environment and once we are satisfied that things are good, we will allow that change to be deployed to production.

## Branch naming

Please name your branch beginning with the ticket key and number. Valid branch names are as follows

-   `PAS-1`
-   `PAS-1-accounts-page`
-   `PAS-1-MyFeature`

Although capitalization is not required, if you use it, it can be easier to read as a JIRA key.

## Pull Requests

**You should only merge your own Pull Requests**

If you haven't created a pull request before, checkout [Submitting First Pull Request](<./Submitting First Pull Request.md>)

Use Github to create a pull request, make sure any checks succeed and you get feedback from one other team member before merging. Once it is merged into master, it should build an be deployed to our dev site at dev.passr.ca within 10 minutes or so.
