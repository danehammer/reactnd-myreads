# Libros Míos

Udacity React Nanodegree Project 1

Uses `https://reactnd-books-api.udacity.com` to render a list of categories of books, allowing the user
to move them between categories and add more.

## Running Locally

1. Ensure you have `npm` installed
    ```
    $ npm -v
    ```
2. Install dependencies
    ```
    $ npm i
    ```
3. Navigate to [http://localhost:3000](http://localhost:3000)

## TODOs

* rework state changes from the search page
  * doesn't update in place, only back up in app, since component doesn't refresh, state change doesn't come back down
  * don't re-query all books on shelf change
  * move handleShelfChange (or new version) into BookSearch?
* fix handling of someone emptying their search input
* fix that search results are saved from previous searches when going back to search
* switch Shelf to a stateless functional component and doc the PropTypes

## Extras

* Improve README
* Deploy at danehammer.rocks
* use react-debounce-input to throttle the use of the search API
* add a default 404 page
