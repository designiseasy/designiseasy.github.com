#!/bin/bash


echo "Compiling static assets"
compass compile -e production --force

echo "Generating site"
jekyll

echo "Emptying deploy folder"
rm -rf deploy/*

echo "Copying site files to deploy folder"
cp -r _site/* deploy

echo "Commiting static files to master"
cd deploy/
git add .
git add -u
currtime=`date -u`
git commit -m "Deployed on ${currtime}"

echo "Pushing latest"
git push origin master --force

# put us back where we started
cd ..
echo "All done! Check it out at http://designiseasy.github.com"
