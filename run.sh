#!/bin/sh

cd ./api
node . &
P1=$!
./localDeploy.sh &
P2=$!
cd ../

cd ./blockchain/scripts
./startApp.sh &
P3=$!
./localDeploy.sh &
P4=$!
cd ../../

cd ./web-app/src
ng serve --open &
P5=$!
cd ../../

wait $P1 $P2 $P3 $P4 $P5
