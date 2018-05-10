#!/bin/sh

# Create the application only.

# const
businessNetworkVer=`cat version.txt`
archive="beems@${businessNetworkVer}.bna"

# Generate the .bna file.
cd ../composer
composer archive create -t dir -n . -a ${archive}
