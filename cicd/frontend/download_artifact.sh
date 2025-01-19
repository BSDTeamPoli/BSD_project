#!/bin/bash

curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer "to_insert_token"" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/BSDTeamPoli/BSD_project/actions/artifacts/frontend-build/zip

if [ -d "assets" ]; then
  rm -r assets
fi

mkdir assets
if [ -f "frontend-build.zip" ]; then
  unzip frontend-build.zip -d assets
  docker build -t angular-app .
  docker run -p 4200:4200 angular-app
fi