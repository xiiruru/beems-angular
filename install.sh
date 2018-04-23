#!/bin/sh

echo "Installing the necessary modules to run..."

echo "Install the Loopback"
cd ./api
npm install

echo "Install the Angular 5 components"
cd ../web-app
npm install

echo "Install the blockchain (DEV MODE)"
cd ../blockchain/scripts
./install.sh

echo "Done."