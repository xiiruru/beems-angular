#!/bin/sh

# Updates the version.txt

# constants
curDir=`pwd`

# update the beems package
cd ../composer
npm version patch
version=`node -pe "require('./package.json').version"`

# update
cd ${curDir}
echo "${version}" > version.txt