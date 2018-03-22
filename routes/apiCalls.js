var axios = require('axios')
var token = 'a58a86a575424bf1afed7628ed2cac06'
var apiKey = 'zZciBMZkRuMWxEaFwOxiHQAltnZnufev2B97VRn8'

//import helper functions
var determineLocation = require('./helperFuncs').determineLocation
var determineMajor = require('./helperFuncs').determineMajor
var determineSchoolSize = require('./helperFuncs').determineSchoolSize
var determineIncome = require('./helperFuncs').determineIncome


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
        return data.result
    }).then( result => {
        console.log(result.parameters)
        //if the AI couldn't detect what the user was saying...
        var fallbackMsg = result.fulfillment.speech
        if(result.metadata.intentName === "Default Fallback Intent"){
            res.send(JSON.stringify(fallbackMsg))
            return
        }
        
        callCollegeAPI(result.parameters, prevParams, res, fallbackMsg)
    }).catch(err => {
        console.log('------ERROR---------')
        console.log(err)
    })
}


function callCollegeAPI (params, prevParams, res, fallbackMsg) {
    var paramsObj = packageParams(params, prevParams)

    var urlParams = paramsObj.urlParams
    var finalParams = paramsObj.finalParams
    
    var fieldsReturned = 'id,school.name,2015.admissions.act_scores.midpoint.cumulative,2015.student.size,2013.earnings.10_yrs_after_entry.median,2015.admissions.admission_rate.overall,school.school_url,school.price_calculator_url,2015.cost.avg_net_price.public,2015.cost.avg_net_price.private'

    var incomeFieldString = determineIncome(finalParams.family_income)

    fieldsReturned += incomeFieldString

    var pathES6 = `https://api.data.gov/ed/collegescorecard/v1/schools.json?${urlParams}_fields=${fieldsReturned}&api_key=${apiKey}`
    console.log('Final url: ' + pathES6)

    axios.get(pathES6).then(result => {
        // console.log(result.data.results)
        res.end(JSON.stringify({schools: result.data.results, finalParams: finalParams}))
    }).catch(err => {
        console.log('---SOMETHING WENT WRONG------')
        res.end(JSON.stringify(fallbackMsg))
    })
}

//alter this as more parameters, turns parameters into url strings for use in college scorecard API call
function packageParams (params, prevParams) {
    
    var finalParams = reconcileParams(params, prevParams)
    
    //might need to change the refernces on params later...
    var SAT_score = finalParams.SAT_score ? `2015.admissions.sat_scores.average.overall__range=${Number(finalParams.SAT_score) - 400}..${Number(finalParams.SAT_score) + 150}&` : ''
    
    //search for range of ACT scores (+3, -5)
    var ACT_score = finalParams.ACT_score ? `2015.admissions.act_scores.midpoint.cumulative__range=${Number(finalParams.ACT_score) - 5}..${Number(finalParams.ACT_score) + 3}&` : ''
    
    var school_location = determineLocation(finalParams.school_location)
    
    var school_size = determineSchoolSize(finalParams.school_size, finalParams.school_size1)

    var major = determineMajor(finalParams.major)

    var urlParams =  ACT_score + SAT_score + school_location  + school_size + major

    console.log('Url: ' + urlParams)

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

    //if there's a new input use that, if not use sessionStorage item, if not use an empty string
    for (key in params){
        finalParams[key] = params[key] ? params[key].trim() : prevParams[key] ? prevParams[key].trim() : ''
        console.log('-----'+key+'------')
        console.log("Old: " + prevParams[key])
        console.log('New: ' + params[key])
        console.log('Final: ' + finalParams[key])
    }

    console.log('Final params: ' + JSON.stringify(finalParams))
    return(finalParams)
}


module.exports = callDialogApi

// callDialogApi('I got a 26 on the ACT and want a school with less than 2000 people')

// reconcileParams(
//     {"school_size":"3000","school_size1":"","ACT_score":"","SAT_score":"","school_location":""},
//     {"ACT_score":"29 ","SAT_score":"null","school_size":"null","school_size1":"null","location":"null","cost":null}
// )
//




