// Dependencies
// =============================================================

// Requiring our College model
var db = require("../models");

// Routes
// ===================================================================
// !!IMPORTANT!!
// When we are searching for colleges and one gets added to the list
// we need to check to see if the college is already in the database
// and upate the college searchCount if it is. If its not already in
// the database we need to insert it with a searchCount of 1.
// If we dont do this we will get duplicate records.
// ===================================================================
module.exports = function(app) {

  // Get rotue for retrieving a single college
  // We can use this to see if a college exist so we can
  // determine to upate or insert the college as stated above
  app.get("/api/colleges/:id", function(req, res) {
    db.College.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // Get route for returning posts of a specific category
  app.get("/api/colleges", function(req, res) {
    db.College.findAll({
      where: {
        searchCount: { [Op.gt] : 5 }
      }
    })
    .then(function(dbCollege) {
      res.json(dbCollege);
    });
  });

  // POST route for saving a new college
  app.post("/api/colleges", function(req, res) {
    //console.log(req.body);
    db.College.create({
      schoolid: req.body.schoolid,
      schoolname: req.body.school
    })
    .then(function(dbCollege) {
      res.json(dbCollege);
    });
  });


  // PUT route for updating college
  app.put("/api/colleges", function(req, res) {
    db.College.update({
        searchCount: parseInt(req.body.searchCount) + 1
      }, {
        where: {
          id: req.body.id
        }
      }).then(function(dbCollege) {
        res.json(dbCollege);
      });
  });
}
