# org.bit.beems

[HCP]: https://hyperledger.github.io/composer/latest/installing/installing-prereqs.html "Installing pre-requisites by Hyperledger Composer documentation"

## Notice

Refer and complete [Hyperledger Composer's list of prerequistics][HCP] before continuing.

By time of writing, the version used are as follows (in case for breaking changes):-

1. Hyperledger Fabric 1.1
1. Hyperledger Composer 0.19

Do note that this is for lab test environment use only and will require specialised configuration for production needs (which is not done here for brevity sake). Currently, it strictly uses a one peer, one channel, and no acl ruling (which also means no users too).

For sanity reasons, please use uBuntu or Linux distribution. There is some configuration required for Windows environment when using Docker, especially the free Docker version.

## Usage

Everything here assume it is done in `terminal` and is in `scripts` folder.

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

# Install. [Requires Internet connection]
./install.sh

# Start the app/fabric-network with REST API. One channel, one peer.
./startApp.sh

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

# Stop service
./stopApp.sh

# Uninstall (Hard purge)
./uninstall.sh
```

## Available commands/queries

REST API is located at `localhost:7777` after using `startApp.sh` shell script.