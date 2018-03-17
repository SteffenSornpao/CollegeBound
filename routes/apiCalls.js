var axios = require('axios')
var token = 'dd0abd72024442a793eb1b21c2ec2f27'

query = 'I got a 30 on the ACT'


function callDialogApi (query, req, res) {
    axios.get('https://api.dialogflow.com/v1/query?v=20150910&lang=en&query='+query+'&sessionId=12345&timezone=America/New_York', {
    headers: {
        Authorization: 'Bearer ' + token //the token is a variable which holds the token
    }
    }).then(result => {
        var data = result.data
        console.log(data)
        return data.result.parameters
    }).then( params => {
        console.log(params)
        callCollegeAPI(params)

    })
}


function callCollegeAPI (params, req, res) {
    var score = packageParams(params)

    axios.get('https://api.data.gov/ed/collegescorecard/v1/schools.json?2015.admissions.act_scores.midpoint.cumulative__range='+ score +'..&_fields=id,school.name,2015.admissions.act_scores.midpoint.cumulative&api_key=zZciBMZkRuMWxEaFwOxiHQAltnZnufev2B97VRn8').then(result => {
        console.log(result.data.results)
    })
}

//alter this as more parameters
function packageParams (params) {
    return params.number
}

callDialogApi('I got a 30 on the ACT')




