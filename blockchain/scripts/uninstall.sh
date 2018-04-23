#!/bin/sh

# constants
adminNetwork="admin@beems"
peerAdmin="PeerAdmin@hlfv1"

# remove old networdadmin.card
composer card list
composer card delete -n ${adminNetwork}
composer card delete -n ${peerAdmin}

# destroy old network
cd ../fabric-tools
./stopFabric.sh
./teardownFabric.sh

# remove old files
cd ../composer
rm -f beems@0.0.1.bna
rm -f networkadmin.card