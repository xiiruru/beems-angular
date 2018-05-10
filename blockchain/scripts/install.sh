#!/bin/sh

# Recreate the fabric network from scratch completely.
# Change the FABRIC_START_TIMEOUT to a large value if failing to like 60 seconds
# Single channel, single peer.

# set the environment
export FABRIC_VERSION=hlfv11;
export FABRIC_START_TIMEOUT=30;

# constants
businessNetworkVer=`cat version.txt`
archive="beems@${businessNetworkVer}.bna"
businessNetworkName="beems"
adminName="admin"
adminPw="adminpw"
adminNetwork="${adminName}@${businessNetworkName}"
peerAdmin="PeerAdmin@hlfv1"
adminNetworkCard="networkadmin.card"
devFolder="composer"

# uninstall whatever previous version of this fabric and its cards available.
./uninstall.sh

# download and start network
cd ../
mkdir ./fabric-dev-servers
cd ./fabric-dev-servers
curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.tar.gz
tar -xvf fabric-dev-servers.tar.gz
./downloadFabric.sh
./startFabric.sh
./createPeerAdminCard.sh

# make the app
cd ../scripts
./createApp.sh

# install and run
cd ../${devFolder}
composer network install --card ${peerAdmin} --archiveFile ${archive}
composer network start --networkName ${businessNetworkName} --networkVersion ${businessNetworkVer} --networkAdmin ${adminName} --networkAdminEnrollSecret ${adminPw} --card ${peerAdmin} --file ${adminNetworkCard}
composer card import --file ${adminNetworkCard}
composer network ping --card ${adminNetwork}