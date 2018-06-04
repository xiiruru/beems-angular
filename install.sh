#!/bin/sh

echo "Installing the necessary modules to run..."

echo "Install localtunnel tool used here globally"
npm install -g localtunnel

echo "Install the Loopback"
cd ./api
npm install

echo "Install the Angular 5 components"
cd ../web-app
npm install

echo "Install the blockchain (DEV MODE) and its npm tools"
cd ../blockchain/scripts
./npmInstall.sh
./install.sh

echo "Done."
