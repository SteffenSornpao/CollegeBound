var UpdateThis = require("../scr/updateThis.js");
var codeceptjs = require("../scr/node_modules/.bin/codeceptjs");
var Nightmare = require("nightmare");
var expect = require("chai").expect;

//
new Nightmare({ show: true, typeInterval:1000 })
  // Visit home page
  .goto("https://www.youtube.com/")
  // Enter keyword
  .type("#search")
  // Take a screenshot of the login form.
  .screenshot("search_bar.png")
//Click/Enter search
  .click("#search-icon-legacy")
  // Click course catalog link.
  .click("form[action*="/search"] [type=submit]")
  // Scroll down a few hundred pixels.
  .scrollTo(500, 0)
  .evaluate(function () {
    return document.querySelector('#main .searchCenterMiddle li a').href
  .end()
  // Execute commands
  .then(function() {
    console.log("Done!");
  })
  // Catch errors
  .catch(function(err) {
    console.log(err);
  });
