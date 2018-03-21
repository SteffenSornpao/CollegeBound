var axios = require('axios')
var token = 'dd0abd72024442a793eb1b21c2ec2f27'
var apiKey = 'zZciBMZkRuMWxEaFwOxiHQAltnZnufev2B97VRn8'

//Helper functions
var stateFips      = require('./helperFuncs').stateFips,
    regionId       = require("./helperfuncs").regionId,
    determineMajor = require('./helperFuncs').determineMajor;


function callDialogApi (query, prevParams, res) {
    //TODO - change this to req.body.prevParams when the front end is incorporated

    prevParams = JSON.parse(prevParams)

    axios.post('https://api.dialogflow.com/v1/query?v=20150910',
    {
        "lang": "en",
        "query": query,
        "sessionId": "12345",
        "timezone": "America/New_York",
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
    var paramsObj   = packageParams(params, prevParams),
        urlParams   = paramsObj.urlParams,
        finalParams = paramsObj.finalParams,
        fieldsReturned = 'id,school.name,2015.admissions.act_scores.midpoint.cumulative,2015.student.size',
        pathES6 = `https://api.data.gov/ed/collegescorecard/v1/schools.json?${urlParams}_fields=${fieldsReturned}&api_key=${apiKey}`;
    console.log('Final url: ' + pathES6)

    axios.get(pathES6).then(result => {
      res.end(JSON.stringify({schools: result.data.results, finalParams: finalParams}))
    }).catch(err => {
      console.log('---SOMETHING WENT WRONG------')
      res.end(fallbackMsg)
    })
}

//alter this as more parameters, turns parameters into url strings for use in college scorecard API call
function packageParams (params, prevParams) {
  var finalParams = reconcileParams(params, prevParams)

  var SAT_score   = '',
      ACT_score   = finalParams.ACT_score ? `2015.admissions.act_scores.midpoint.cumulative__range=${Number(finalParams.ACT_score) - 5}..${Number(finalParams.ACT_score) + 3}&` : '',
      statefips   = stateFips(finalParams.stateFips),
      regionid    = regionId(finalParams.regionId),
      school_size = finalParams.school_size ? `2015.student.size__range=..${finalParams.school_size}&` : '',
      school_cost = '',
      major       = determineMajor(finalParams.major);

  var urlParams =  ACT_score + SAT_score + statefips+regionid+ school_cost + school_size + major
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
