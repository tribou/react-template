#!/bin/bash
#
# Bumps a semver minor version by default

# Don't bump version if we already have a tag at HEAD
(git describe --exact-match --tags HEAD) > /dev/null 2>&1
if [ "$?" -eq "0" ]
then
  echo "Git tag already exists. Exiting..."
  exit
fi

git config user.email "tribou@users.noreply.github.com"
git config user.name "CircleCI Bot"

CURRENT=$(cat package.json | grep '"version"' | awk -F '"' '{print $4}')
PREMAJOR=$(echo "$CURRENT" | grep '\.0\.0-0')
PREPATCH=$(echo "$CURRENT" | grep -v '\.0-0' | grep '\.\d\+\-0')

if [ -n "$PREMAJOR" ]
then

  echo "PREMAJOR $PREMAJOR"
  npm version major --ignore-scripts

elif [ -n "$PREPATCH" ]
then

  echo "PREPATCH $PREPATCH"
  npm version patch --ignore-scripts

else

  echo "MINOR $CURRENT"
  npm version minor --ignore-scripts

fi

git push origin ${CIRCLE_BRANCH} --follow-tags
