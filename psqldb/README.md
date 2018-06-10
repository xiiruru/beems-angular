# psqldb notes

## Installation

### Windows

1. Download pgAdmin4 and install (pgAdmin 3 is painful to use).

### Linux

1. Refer to: https://askubuntu.com/questions/831262/how-to-install-pgadmin-4-in-desktop-mode-on-ubuntu

## Startup

1. Location should be `localhost:5050`.

### Windows

1. Run pgAdmin4. It should automatically open the default browser to `localhost:5050`

### Linux

1. Run `psql.sh` shell script in terminal assuming the pgAdmin4 is built based on the link provided in `Installation;Linux` above.

## Database configuration

1. Make a new server. Host:Port should be `127.0.0.1:5432`.
1. Make a new database called `beems`.
1. Right click on `beems` database. Click on the `Restore...` option.
1. Find and pick `db_latest` in this filepath.
1. Click the `Restore` button
1. Expand `beems`, expand `Schemas`, expand `public`, expand `Tables`.
1. Click on the `Tools;Query Tool` from the top menu bar.
1. Input `SELECT * FROM "Assets"` and press `F5` key to execute.
1. Check the grid table below.