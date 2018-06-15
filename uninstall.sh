#!/bin/sh

echo "Uninstalling..."

# echo "Uninstall localtunnel tool that may be used here globally"
# npm uninstall -g localtunnel

echo "Uninstall the Loopback components for BEEMS's REST API"
cd ./api
npm uninstall
rm -rf node_modules
cd ../

echo "uninstall the Angular 5 components for BEEMS's front-end web server"
cd ./web-app
npm uninstall
rm -rf node_modules
cd ../

echo "Install the mobile components"
cd ./mobile/beems-qr-reader
npm uninstall
rm -rf node_modules
cd ../../

echo "Uninstall the blockchain (DEV MODE)"
cd ./blockchain/scripts
./uninstall.sh

echo "Done."
