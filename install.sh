#!/bin/sh

echo "Installing the necessary modules to run..."

cd ./api
npm install

cd ../web-app
npm install

echo "Done."