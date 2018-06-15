#!/bin/sh

echo "Installing the necessary modules to run..."

# echo "Install localtunnel tool that may be used here globally"
# npm install -g localtunnel

echo "Install the Loopback components for BEEMS's REST API"
cd ./api
npm install
cd ../

echo "Install the Angular 5 components for BEEMS's front-end web server"
cd ./web-app
npm install
cd ../

echo "Install the mobile components"
cd ./mobile/beems-qr-reader
npm install
cd ../../

echo "Install the blockchain (DEV MODE) and its npm tools"
cd ./blockchain/scripts
./npmInstall.sh
./install.sh

echo "Done."
