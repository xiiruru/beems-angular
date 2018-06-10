#!/bin/bash

function localtunnel {
  lt -s beemsblockchain --port 7777
}

until localtunnel; do
  echo "localtunnel server crashed"
  sleep 2
done
