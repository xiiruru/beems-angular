# beems-angular 

[HCP]: https://hyperledger.github.io/composer/latest/installing/installing-prereqs.html "Installing pre-requisites by Hyperledger Composer documentation"

## Pre-requisites

- [Hyperledger Composer's list of prerequistics][HCP]
- NodeJS
- NPM
- Loopback
- Angular-CLI (Currently Angular 5)

Others are implemented later by the script provided.

## Installation

1. [Refer here for the installation pre-requistics for Hyperledger Composer][HCP]
1. `./install.sh`
1. Install pgAdmin4 and restore the database.

## How to run

Requires at least four terminals processes in Linux

1. Go to `api` folder and `node .`
1. Go to `blockchain/scripts` folder and `./startApp.sh`
1. Start and enable the postgreSQL databases.
1. Go to `web-app/src` folder and `ng serve --open`

Check the browser for the web application (should be at `localhost:4200`).

Alternatively (if you do not care about the terminal output abomination):-

1. Start and enable the postgreSQL databases.
1. `./run.sh`