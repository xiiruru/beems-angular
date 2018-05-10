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

wait $P1 $P2 $P3