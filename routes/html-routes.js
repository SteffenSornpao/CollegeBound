var https = require('https')

module.exports = function (app){
    //homepage
    app.get('/', function(req, res){

    })

    //form
    app.get('/form', function(req, res){

    })

    //results
    app.post('/results', function(req, res){
        // req.body.query
        
    })

    //most viewed
    app.get('/mostviewed', function(req, res){

    })

    //page doesn't exist
    app.get('*', function(req, res){

    })
}