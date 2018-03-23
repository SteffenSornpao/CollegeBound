var UpdateThis = require("../scr/updateThis.js");
var Nightmare = require("nightmare");
var expect = require("chai").expect;

describe("UpdateThis", function() {
  it("should return search querry(s)", function(done) {
    Nightmare({ show: true, typeInterval:1000 })
      .goto("https://www.youtube.com/")
      // Click the there are severl search parametors?
      .click("a[href='/?']")
      // Evaluate the title
      .evaluate(function() {
        return document.title;
      })
      // Assess the title is as expected
      .then(function(title) {
        expect(title).to.equal("Learn to code | Codecademy");
        done();
      })
      .catch(function(err){
        done(err);
      });
});

//user search
it("should present a link to course catalog after login", function(done) {
  new Nightmare({ show: true })
    .goto("https://www.youtube.com/")
    // User will search by voice or keystrokes
    .type("#search", "")
    // Enter search keywords
    //.type("#user__keyword_search", "")
    // Click submit but what if its by voice?
    .click("#search-icon-legacy")
    // Evaluate the following selector
    .evaluate(function() {
      // Assert the "???" link can be found
      return document.querySelector("a[href='/???']");
    })
    .then(function(link) {
      expect(link).to.not.equal(undefined);
      done();
    });
});
