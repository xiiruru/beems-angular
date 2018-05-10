#!/bin/sh

# Closes the app.

# set the environment
export FABRIC_VERSION=hlfv11;
export FABRIC_START_TIMEOUT=15;

# close
cd ../fabric-dev-servers
./stopFabric.sh