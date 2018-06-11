#!/bin/sh

cd ./api
node . &
P1=$!
cd ../

cd ./blockchain/scripts
./startApp.sh &
P2=$!
cd ../../

cd ./web-app/src
ng serve --open &
P3=$!
cd ../../

#cd ./localhostDeploy/localtunnel
#./apiLocalDeploy.sh &
#P4=$!
#./blockchainLocalDeploy.sh &
#P5=$!
#cd ../../

wait $P1 $P2 $P3
#wait $P1 $P2 $P3 $P4 $P5
