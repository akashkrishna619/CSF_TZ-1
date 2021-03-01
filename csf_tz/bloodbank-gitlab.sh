#!/bin/bash

if [ $# -eq 0 ]
  then
    echo "Specify the comment for updating GitLab. e.g. $0 'This update is for'"
    exit 1
fi


vi apps/bloodbank/bloodbank/__init__.py
bench --site bloodbank.aakvatech.com export-fixtures

cd apps/bloodbank
git add .
git commit -m "$1"
git push upstream master

