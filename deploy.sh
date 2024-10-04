#!/bin/bash

# switch to main branch and pull from main branch
git switch main
git pull origin main

# npm install if needed
echo "<<<<<<<<<<<<<<<<<<< [+] Running npm install >>>>>>>>>>>>>>>"
npm i

echo "<<<<<<<<<<<<<<<<<<< [+] Running npm build >>>>>>>>>>>>>>>"
# build application
if npm run build; then
  echo "Build successful, proceeding to deploy application..."
  
  echo "<<<<<<<<<<<<<<<<<<< [+] Restart app using pm2 >>>>>>>>>>>>>>>"
  # deploy application
  pm2 delete "aone-admin"
  pm2 start npm --name "aone-admin" -- start
else
  echo "Build failed, deployment aborted."
fi