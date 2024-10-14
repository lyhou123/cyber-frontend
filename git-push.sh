#!/bin/bash
echo "Enter Your commit message"
read commitMessage

echo "Enter Your branch name"
read branchName



git add .

git commit -m "$commitMessage"

git push origin $branchName

echo "Pushed Successfully"
