var Nightmare = require("nightmare");
// var expect = require('chai').expect;


new Nightmare({ show: true, typeInterval:1000 })

  .goto("https://college-bound.herokuapp.com/")
  //("http://localhost:3000")
  .click("#a")
  .type("#input", "georgia")
  .type('#input', '\u000d')
  .wait(1000)
  .click("div[id='Mercer University']")
  .wait(2000)
   .evaluate(function(){
    return document.querySelector("div[class='result']")
   })
  .wait(2000)
  // .click("div[id='Mercer University']")
  // .wait(2000)
  // .evaluate(function(){
  //   return document.querySelector("div[class='open']")
  //  })
  // .click("#next")
  // .wait(5000)
  // .click("div[id='Virginia College-Macon']")
  // .wait(2000)
  //  .evaluate(function(){
  //   return document.querySelector("div[class='result']")
  //  })
  // .wait(2000)

  .click("#reset")

  .type("#input", "Act 26")
  .type("#input", "\u000d")
  .wait(1000)
  .click("div[id='Georgia State University']")
  .evaluate(function(){
    return document.querySelector("div[class='result']")
   })
  .wait(2000)
  .click('#reset')
  .type("#input", "SAT 1400")
  .type("#input", "\u000d")
  .wait(1000)
  .click("div[id='University of Colorado Boulder']")
  .evaluate(function(){
    return document.querySelector("div[class='result']")
   })
  .wait(2000)
.click('#reset')
.type("#input", "Find small schools in Alaska")
  .type("#input", "\u000d")
  .wait(1000)
  .click("div[id='Alaska Bible College']")
  .evaluate(function(){
    return document.querySelector("div[class='result']")
   })
  .wait(2000)
  .click('#reset')
  .type("#input", "Find medium schools in Hawaii")
  .type("#input", "\u000d")
  .wait(1000)
  .click("div[id='University of Hawaii at Manoa']")
  .evaluate(function(){
    return document.querySelector("div[class='result']")
   })
  .wait(2000)
  .click("a[href='https://www.manoa.hawaii.edu']")
  .wait(2000)
  .type("#input", "Find large schools in Rhode Island")
  .type("#input", "\u000d")
  .wait(1000)
  .click("div[id='Community College of Rhode Island']")
  .evaluate(function(){
    return document.querySelector("div[class='result']")
   })
  .wait(2000)




  
  
  .end()
  .then(function() {
    console.log("got it to work");
  })
  .catch(function(error) {
    console.error("Search failed:", error);
  });