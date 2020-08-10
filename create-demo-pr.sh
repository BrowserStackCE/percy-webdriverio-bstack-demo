#!/bin/bash

set -e

if ! [ -x "$(command -v hub)" ]; then
  echo 'Error: hub is not installed (https://hub.github.com/). Please run "brew install hub".' >&2
  exit 1
fi


NOW=$BUILD_TIMESTAMP
BASE_BRANCH="master-$NOW"
BRANCH="update-button-$NOW"
if [ ${CI_USER_ID} != '' ]
then
  BASE_BRANCH=${CI_USER_ID}_${BASE_BRANCH}
  BRANCH=${CI_USER_ID}_${BRANCH}
fi

# cd to current directory as root of script
cd "$(dirname "$0")"

# Create a "master-123123" branch for the PR's baseline.
# This allows demo PRs to be merged without fear of breaking the actual master.
git checkout master
git checkout -b $BASE_BRANCH
git push origin $BASE_BRANCH

# Create the update-button-123123 PR. It is always a fork of the update-button-base branch.
git checkout update-button-base
git checkout -b $BRANCH
git commit --amend -m 'Change Sign Up button style.'
git push origin $BRANCH
PR_NUM=$(hub pull-request -b $BASE_BRANCH -m 'Change Sign Up button style.' | grep -oE '[0-9]+')

export PERCY_BRANCH=$BRANCH
export PERCY_PULL_REQUEST=$PR_NUM

npm test

BUILD_ID_STATUS=$(curl \
  -u $BROWSERSTACK_USERNAME:$BROWSERSTACK_ACCESS_KEY \
  "https://api.browserstack.com/automate/builds.json?limit=1" | jq -r '.[] .automation_build | "\(.hashed_id) \(.status)"')

BUILD_ID=$(echo $BUILD_ID_STATUS |  cut -d' ' -f1)
STATUS=$(echo $BUILD_ID_STATUS |  cut -d' ' -f2)
if [[ $STATUS='done' ]]; then
  STATUS='success'
else
  STATUS='failure'
fi

curl \
  -u $GITHUB_USER:$GITHUB_TOKEN \
  -d '{"state": "'$STATUS'", "target_url": "https://automate.browserstack.com/dashboard/v2/builds/'$BUILD_ID'", "description": "Tests '$STATUS'", "context": "browserstackci/service"}' \
  "https://api.github.com/repos/BrowserStackCE/percy-webdriverio-bstack-demo/statuses/$(git rev-parse --verify HEAD)"


git checkout master
git branch -D $BASE_BRANCH
git branch -D $BRANCH
