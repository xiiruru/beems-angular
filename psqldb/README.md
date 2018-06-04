# psqldb notes

1. Download pgAdmin4 (pgAdmin 3 is painful to use).
2. Install and open pgAdmin4.
3. Make a new server. Host:Port should be 127.0.0.1:5432.
4. Make a new database called `beems`.
5. Right click on `beems` database. Click on the `Restore...` option.
6. Find and pick `db_latest` in this filepath.
7. Click the `Restore` button
8. Expand `beems`, expand `Schemas`, expand `public`, expand `Tables`.
9. Click on the `Tools;Query Tool` from the top menu bar.
10. Input `SELECT * FROM "Assets"` and press `F5` key to execute.
11. Check the grid table below.