var axios = require('axios')
var token = 'dd0abd72024442a793eb1b21c2ec2f27'
var apiKey = 'zZciBMZkRuMWxEaFwOxiHQAltnZnufev2B97VRn8'

query = 'I got a 30 on the ACT'


function callDialogApi (query, req, res) {
    //TODO - change this to req.body.prevParams when the front end is incorporated 
    var prevParams = ["Just", "seeing"]

    axios.post('https://api.dialogflow.com/v1/query?v=20150910', 
    {
        "lang": "en",
        "query": query,
        "sessionId": "12345",
        "timezone": "America/New_York",
        "prevParams": prevParams
    },
    {
        headers: {
            Authorization: 'Bearer ' + token 
        }
    }).then(result => {
        var data = result.data
        console.log(data)
        return data.result.parameters
    }).then( params => {
        console.log(params)
        callCollegeAPI(params, prevParams, req, res)

    })
}


function callCollegeAPI (params, prevParams, req, res) {
    var urlParams = packageParams(params, prevParams)
    
    var fieldsReturned = 'id,school.name,2015.admissions.act_scores.midpoint.cumulative,2015.student.size'


    var pathES6 = `https://api.data.gov/ed/collegescorecard/v1/schools.json?${urlParams}_fields=${fieldsReturned}&api_key=${apiKey}`

    axios.get(pathES6).then(result => {
        console.log(result.data.results)
    }).catch(err => {
        console.log('Something went wrong!')
    })
}

//alter this as more parameters, turns parameters into url strings for use in college scorecard API call
function packageParams (params, prevParams) {
    console.log('Previous parameters: ' + prevParams)
    //might need to change the refernces on params later...
    var SATscores = ''
    
    //search for range of ACT scores (+3, -5)
    var ACTscores = params.number ? `2015.admissions.act_scores.midpoint.cumulative__range=${Number(params.number) - 5}..${Number(params.number) + 3}&` : ''
    
    var location = ''
    
    var schoolSize = params.school_size ? `2015.student.size__range=..${params.school_size}&` : ''
    
    var schoolCost = ''

    return ACTscores + SATscores + location + schoolCost + schoolSize
}

callDialogApi('I got a 26 on the ACT and want a school with less than 2000 people')




