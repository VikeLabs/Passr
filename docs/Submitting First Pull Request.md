# Submitting your first pull request for Passr

Your first ticket will be introducing you to creating a pull request and contributing to the Passr project. 

 If you don't have Git on your machine, [install it](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/set-up-git). 

## Fork this Repository

Fork this repository by clicking on the fork button in the top right corner of the Passr project.  This will create copy of this repository on your account.


## Clone this Repository
To clone, go to your account and click on the clone button and then click on the <em> copy to clipboard </em> icon.  Open the terminal and run the following command,

 ```git clone [your copied url here]```

For Example:

```git clone https://github.com/this-is-you/Passr.git```

This downloads the repository with git history onto your machine.  Go to the cloned directory by running this command:

```cd Passr```

## Create a Branch

We recommend that you always create your own branch when submitting a pull request because it is good practice and also keeps the master branch clean.  Create a branch name that is short, without any capitals and describes your work.

```git checkout -b first-contributions-your-name```

## Make changes and commit 

Now you can make changes to the project and commit them.  For this first ticket, add a link to your github account in Markdown to the Contributors.md file in the `docs` folder.  There should be some already added that you can use as a reference.

To check the status of your changes:

```git status```

You you can add the changes you made to the Contributors file by the command:

```git add docs/Contributors.md```

To commit your changes provide a nice descriptive message of your changes using the command:

```git commit -m "Pas-[ticket number] Adds [your name] github account to the contributors file"```

## Push your changes

You can push your changes to the remote repository by:

```git push origin first-contributions-your-name```

## Create a Pull Request

Go to your Passr repository on github and click on the 'compare & pull request' button to submit the pull request.  Provide any necessary details that you think would be helfpul.

You will need at least two approvals in order to merge in your work with any pull request. 

:tada: Congratulations, you have submitted your first Passr Pull request!  Celebrate with a little dance or a treat of your choice. :raised_hands: :ice_cream:

