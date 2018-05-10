#!/bin/sh

# Starts the development app.
# Single channel, single peer.

# set the environment
export FABRIC_VERSION=hlfv11;
export FABRIC_START_TIMEOUT=15;

# constants
businessNetworkName="beems"
adminName="admin"
adminNetwork="${adminName}@${businessNetworkName}"
curDir=`pwd`
devFolder="composer"

# start network
# https://stackoverflow.com/questions/48070818/how-to-restart-the-fabric-composer-without-losing-the-existing-data
cd ../fabric-dev-servers/fabric-scripts/hlfv11/composer
docker-compose stop
docker-compose start
echo "Sleeping for ${FABRIC_START_TIMEOUT} to wake up the blockchain."
sleep ${FABRIC_START_TIMEOUT}

# update
# cd ../fabric-dev-servers
# ./downloadFabric.sh
# cd ../${devFolder}
# ./updateApp.sh

# check card
cd ${curDir}
cd ../${devFolder}
composer network ping --card ${adminNetwork}

# generate REST server
composer-rest-server -p 7777 -c ${adminNetwork} -n never -w true
