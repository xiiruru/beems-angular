# beems-angular 

[HCP]: https://hyperledger.github.io/composer/latest/installing/installing-prereqs.html "Installing pre-requisites by Hyperledger Composer documentation"

Blockchain-based Enterprise Entity Management System. Using blockchain technologies in asset management context. Project with MIMOS.

## Developement tools used

1. Hyperledger Composer (which uses Hyperledger Fabric) [Blockchain]
1. pgAdmin4 (PostgreSQL) [Database]
1. Loopback [REST API server]
1. Angular 5 [Front-end web page]
1. Mobile language
  - beems-qr-code
    1. Expo (React-Native; JavaScript)

## Pre-requisites

- [Hyperledger Composer's list of prerequistics][HCP]
- NodeJS
- NPM
- Loopback
- Angular-CLI (Currently Angular 5)
- Mobile
  - Expo XDE [for `mobile/beems-qr-reader`]

Others are implemented later by the script provided.

## Installation

1. [Refer here for the installation pre-requistics for Hyperledger Composer][HCP]
1. `./install.sh`
1. Install "pgAdmin4" and restore the database.
1. Refer to the [mobile README.md section](./mobile)

## How to run

Requires at least four terminals processes in Linux

1. Go to `blockchain/scripts` folder and `./startApp.sh`
1. Start and enable the postgreSQL databases.
1. Go to `api` folder and `node .`
1. Go to `web-app/src` folder and `ng serve --open`
1. Refer to the [mobile README.md section](./mobile)

Check the browser for the web application (should be at `localhost:4200`).

Alternatively (will have terminal output abomination):-

1. Start and enable the postgreSQL databases.
1. `./run.sh`
1. Refer to the [mobile README.md section](./mobile)