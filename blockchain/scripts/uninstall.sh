#!/bin/sh

# Uninstall most of it.

# set the environment
export FABRIC_VERSION=hlfv11;
export FABRIC_START_TIMEOUT=15;

# constants
businessNetworkName="beems"
adminName="admin"
adminNetwork="${adminName}@${businessNetworkName}"
peerAdmin="PeerAdmin@hlfv1"

# remove old networdadmin.card
composer card list
composer card delete -c ${adminNetwork}
composer card delete -c ${peerAdmin}

# destroy old network
cd ../fabric-dev-servers
./stopFabric.sh
./teardownFabric.sh

# remove the fabric-dev-servers folder
cd s../
rm -f fabric-dev-servers

# remove old files
cd ../composer
find . -maxdepth 1 -name 'beems*.bna' -delete
rm -f networkadmin.card