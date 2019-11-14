[![Build Status](https://travis-ci.org/hft-stuttgart-ipr/hft-asgmt-nodejs-USERNAME.svg?branch=master)](https://travis-ci.org/hft-stuttgart-ipr/hft-asgmt-nodejs-USERNAME)

# hft-asgmt-nodejs

## TODO
  - [ ] Install and use the `body-parser` package
  - [ ] Install and use the `sqlite3` package
  - [ ] Use names for your form fields: `username` for the username and `message` for the textarea
  - [ ] Iterate over all items in your database and show them in your table
  - [ ] Refactor the `GET /` route to deliver your index page with data from the database
  - [ ] Create a route, for `POST /add-entry` to receive form data

## Hints
 - It is not necessary to store the ID in the Database! `username` and `message` is enough! This is because of the sqlite autoincrement feature, which automatically increases the ID + 1
 