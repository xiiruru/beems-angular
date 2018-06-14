#!/bin/sh

# From updateApp.sh.
# Create and update the application in the fabric network.
# This one is without version upgrade for others to reset to here.
# make sure the fabric network is up before use.
# ref: https://hyperledger.github.io/composer/latest/tutorials/queries

# const
# ./updateVersion.sh
curDir=`pwd`
businessNetworkVer=`cat version.txt`
archive="beems@${businessNetworkVer}.bna"
businessNetworkName="beems"
adminName="admin"
peerAdmin="PeerAdmin@hlfv1"
adminNetwork="admin@${businessNetworkName}"

# Generate the .bna file and update the application in the network.
./createApp.sh

# Upgrade the network
cd ../composer
composer network install --card ${peerAdmin} --archiveFile ${archive}
composer network upgrade -c ${peerAdmin} -n ${businessNetworkName} -V ${businessNetworkVer}
