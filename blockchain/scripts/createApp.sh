#!/bin/sh

# Create the application only.

# const
archive="beems@0.0.1.bna"

# Generate the .bna file.
cd ../composer
composer archive create -t dir -n . -a ${archive}
