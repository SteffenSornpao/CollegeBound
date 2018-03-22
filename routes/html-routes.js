var https = require('https')
var path = require('path')
var getInfo = require('./apiCalls')

module.exports = function (app){
    //homepage
    app.get('/', function(req, res){
        res.render('index')
    })

    //form
    app.get('/form', function(req, res){
        res.render('results', {schools: [
            {
                "school.name": 'HELLO', 
                name: 'hello',
                "#name" : '#Hello'
            }, {
                "school.name": 'WORLD', 
                name: 'world',
                '#name': '#world'
            }
        ]})
    })

    //results
    app.post('/results', function(req, res){
        var query = req.body.query
        var prevParams = req.body.prevParams
        console.log(prevParams)
        getInfo(query, prevParams, res)
    })

    //most viewed
    app.get('/mostviewed', function(req, res){

    })

    // app.get('/results/:prevParams/:query', function(req, res){
    //     console.log(req.params)
    //     var query = req.params.query
    //     var prevParams = req.params.prevParams
    //     console.log(prevParams)
    //     getInfo(query, prevParams, res)
    // })

    //page doesn't exist
    app.get('*', function(req, res){

    })
}