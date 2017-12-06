# Doctor Lookup
Joseph Tomlinson

## Description
Uses BetterDoctor API to find doctors to address a specific condition in your location

** WARNING **

This project should only be used for educational purposes.
Because the API calls on this project are client-side, this project is not suitable to be deployed as a live web server.

## Requirements
Node packet Manager (NPM)

A web browser that supports Javascript and HTML5.

## Installation
Download as zip, or clone to your machine.

open the terminal/command line and cd into the project's directory

install global dependencies if not already installed
```bash
$ npm install -g bower
$ npm install -g gulp
```

download all dependencies by entering the following commands in order:
```bash

$ npm install
$ bower install
$ gulp build
```
## API Key
This application requires a BetterDoctor API Key.
You can get a key [Here](https://developer.betterdoctor.com)

Once that is created, you must make a `.env` file in the root directory.
Inside, enter your API key like this:
``` Javascript

exports.apiKey = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
```

## Usage
to view or edit the website, enter:

```

$ gulp serve
```


## Edit guide
* Scripts can be found in js/
* styling is in css/styles.css

## Specs

Description: User can search from a list of conditions
* Input: `Select "Acne"`
* Output: `All doctors related to acne will appear on the right`

Description: User can select a doctor for more information
* Input: `Select Doctor Person`
* Output: `A panel below the search panels will show information about Doctor Person`


## legal
Uses bootstrap and jQuery.

all Images belong to their respective owners.
