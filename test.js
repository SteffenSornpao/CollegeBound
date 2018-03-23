var Nightmare = require("nightmare");
// var expect = require('chai').expect;


new Nightmare({ show: true, typeInterval:1000 })

  .goto("http://localhost:3000")
  .click("#a")
  .type("#input", "georgia")
  .type('#input', '\u000d')
  .wait(1000)
  .click("#results")
  .wait(2000)
  //.click(".ytd-video-renderer")
   //.click("#video-title")
   .evaluate(function(){
    return document.querySelector("#results #139755")
   })
  // .click('a[href="/watch?v=GWGBPYDLEeU"]')
  // .click("a[href='/catalog']")
  .wait(5000)
  // .evaluate(function(){
  //   return document.querySelector('a[href="/watch?v=GWGBPYDLEeU"]');
  // })
  // .then(function(link){
  //   expect(link).to.not.equal(undefined);
  //   done();
  // })
  //("#video-title", "Dragon Ball Super Capitulo 130 Sub Español 🇪🇸 1080p")
  // ("#contents a")
 
  
  .end()
  .then(function() {
    console.log("got it to work");
  })
  .catch(function(error) {
    console.error("Search failed:", error);
  });