// Dependencies
// =============================================================
var Sequelize = require("sequelize");
// Requiring our college model
var db = require("../models");
const Op = Sequelize.Op;

// Routes
// ===================================================================
// !!IMPORTANT!!
// When we are searching for colleges and one gets added to the list
// we need to check to see if the college is already in the database
// and upate the college searchCount if it is. If its not already in
// the database we need to insert it with a searchCount of 1.
// If we dont do this we will get duplicate records.
// ===================================================================
module.exports = function (app) {

  // Get rotue for retrieving a single college
  // We can use this to see if a college exist so we can
  // determine to upate or insert the college as stated above
  app.get("/api/colleges/:id", function (req, res) {
    db.college.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function (dbPost) {
        res.json(dbPost);
      });
  });

  // Get route for returning posts of a specific category
  app.get("/api/colleges", function (req, res) {
    console.log("In Get route");
    db.college.findAll({
      limit: 10,
      where: {
        searchCount: { [Op.gt]: 2 }
      },
      order: [['searchCount', 'DESC']]
    })
      .then(function (dbcollege) {
        res.json(dbcollege);
      });
  });

  // POST route for saving a new college
  app.post("/api/colleges", function (req, res) {
    //console.log(req.body);
    db.college.create({
      schoolid: req.body.schoolid,
      schoolname: req.body.school,
      searchCount: 1
    })
      .then(function (dbcollege) {
        res.json(dbcollege);
      });
  });


  // PUT route for updating college
  // app.put("/api/colleges", function (req, res) {
  //   db.college.update({
  //     searchCount: parseInt(req.body.searchCount) + 1
  //   }, {
  //       where: {
  //         id: req.body.id
  //       }
  //     }).then(function (dbcollege) {
  //       res.json(dbcollege);
  //     });
  // });

  app.put("/api/colleges", function (req, res) {
    //console.log("req body:", req.body.schoolid);
    db.college.findOrCreate({   
      where: { schoolid: req.body.schoolid },
      defaults: {
        searchCount: 1,
        schoolname: req.body.schoolname
      }
    }).spread(function (college, created) {
      if (!created) {
        college.increment("searchCount", { by: 1 });
      }
      college.reload().then(function () {
        res.json(college);
      });
    });
  });

}
  // db.college.upsert({
  //   schoolid: req.body.schoolid,
  //   searchCount: Sequelize.literal( "searchCount + 1" )
  // }).then(function (test) {
  //   if (test) {
  //     res.status(200);
  //     res.send("Successfully stored");
  //   } else {
  //     res.status(200);
  //     res.send("Successfully inserted");
  //   }
  // })

  // app.upsert({
  //   schoolid: schoolid,
  //   searchCount: searchCount
  // }).then(function (test) {
  //   if (test) {
  //     res.status(200);
  //     res.send("Successfully stored");
  //   } else {
  //     res.status(200);
  //     res.send("Successfully inserted");
  //   }
  // })