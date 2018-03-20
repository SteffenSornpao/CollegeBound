var axios = require('axios')
var token = 'dd0abd72024442a793eb1b21c2ec2f27'
var apiKey = 'zZciBMZkRuMWxEaFwOxiHQAltnZnufev2B97VRn8'


function callDialogApi (query, prevParams, res) {
    //TODO - change this to req.body.prevParams when the front end is incorporated 

    prevParams = JSON.parse(prevParams)

    axios.post('https://api.dialogflow.com/v1/query?v=20150910', 
    {
        "lang": "en",
        "query": query,
        "sessionId": "12345",
        "timezone": "America/New_York",
        // "prevParams": prevParams
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
        callCollegeAPI(params, prevParams, res)

    }).catch(err => {
        console.log('------ERROR---------')
        console.log(err)
    })
}


function callCollegeAPI (params, prevParams, res) {
    var paramsObj = packageParams(params, prevParams)

    var urlParams = paramsObj.urlParams
    var finalParams = paramsObj.finalParams
    
    var fieldsReturned = 'id,school.name,2015.admissions.act_scores.midpoint.cumulative,2015.student.size'


    var pathES6 = `https://api.data.gov/ed/collegescorecard/v1/schools.json?${urlParams}_fields=${fieldsReturned}&api_key=${apiKey}`

    axios.get(pathES6).then(result => {
        // console.log(result.data.results)
        res.end(JSON.stringify({schools: result.data.results, finalParams: finalParams}))
    }).catch(err => {
        console.log('---SOMETHING WENT WRONG------')
        // console.log(err)
    })
}

//alter this as more parameters, turns parameters into url strings for use in college scorecard API call
function packageParams (params, prevParams) {
    
    var finalParams = reconcileParams(params, prevParams)
    
    //might need to change the refernces on params later...
    var SAT_score = ''
    
    //search for range of ACT scores (+3, -5)
    var ACT_score = finalParams.ACT_score ? `2015.admissions.act_scores.midpoint.cumulative__range=${Number(finalParams.ACT_score) - 5}..${Number(finalParams.ACT_score) + 3}&` : ''
    
    var school_location = ''
    
    var school_size = params.school_size ? `2015.student.size__range=..${params.school_size}&` : ''
    
    var school_cost = ''

    var urlParams =  ACT_score + SAT_score + school_location + school_cost + school_size

    return {
        urlParams: urlParams,
        finalParams: finalParams
    }
}


//take previous paramaters and combine or replace with new user parameters
function reconcileParams (params, prevParams) {
    //---IMPORTANT-----
    //keys in params and prevParams MUST have same names
    var finalParams = {}

    //if there's a new input use that, if not use sessionStorage item, if not use null
    for (key in params){
        finalParams[key] = params[key] ? params[key] : prevParams[key] ? prevParams[key] : null
        console.log('-----'+key+'------')
        console.log("Old: " + prevParams[key])
        console.log('New: ' + params[key])
        console.log('Final: ' + finalParams[key])
    }

    return(finalParams)
}

function determineLocation (location) {
    if(!location){
        return ''
    }


}

function determineSchoolSize (school_size, school_size1){
    
}

module.exports = callDialogApi

// callDialogApi('I got a 26 on the ACT and want a school with less than 2000 people')

// reconcileParams(
//     {"school_size":"3000","school_size1":"","ACT_score":"","SAT_score":"","school_location":""},
//     {"ACT_score":"29 ","SAT_score":"null","school_size":"null","school_size1":"null","location":"null","cost":null}
// )




