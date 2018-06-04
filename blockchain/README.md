# org.bit.beems

## Description

Blockchain-based Enterprise Entity Management System. Using blockchain technologies in asset management context. Project with MIMOS.

By time of writing, the version used are as follows (in case for breaking changes):-

1. Hyperledger Fabric 1.1
1. Hyperledger Composer 0.19

## Usage

Everything here assume you are doing it in `terminal` and is in `scripts` folder.

```bash
# chmod
chmod u+x npmInstall.sh
chmod u+x install.sh
chmod u+x startApp.sh
chmod u+x stopApp.sh
chmod u+x createApp.sh
chmod u+x updateApp.sh
chmod u+x uninstall.sh
chmod u+x updateVersion.sh
chmod u+x localDeploy.sh

# Install the necessary components to start by using npm. [Requires Internet connection]
./npmInstall.sh

# Install. [Requires Internet connection]
./install.sh

# Start the app/fabric-network with REST API. One channel, one peer.
./startApp.sh

# Deploy the localhost to the Internet (as long as localhost for the blockchain is alive)
# Install the required tool: https://localtunnel.github.io/www/
./localDeploy.sh

# Close the app/fabric-network
./stopApp.sh

# Et Cetera stuff
# Create the app
./createApp.sh

# Update the app in the fabric-network when it is up (for developers only). [Requires Internet connection]
./updateApp.sh

# Uninstall the app and the fabric-network
./uninstall.sh
```

### ELI5

```bash
# chmod
chmod u+x npmInstall.sh
chmod u+x install.sh
chmod u+x startApp.sh
chmod u+x stopApp.sh
chmod u+x createApp.sh
chmod u+x updateApp.sh
chmod u+x uninstall.sh
chmod u+x updateVersion.sh

# Install the necessary components to start by using npm. [Requires Internet connection]
./npmInstall.sh

# For first time or when all else fails (almost all information will be lost; Hard install). [Requires Internet connection]
./install.sh

# Next time onwards.
./startApp.sh

# Public test deploy (lazy)
# Install the required tool: https://localtunnel.github.io/www/
./localDeploy.sh

# Stop service
./stopApp.sh

# Uninstall (Hard purge)
./uninstall.sh
```

## Available commands/queries

REST API is located at `localhost:7777` after using `startApp.sh` shell script.