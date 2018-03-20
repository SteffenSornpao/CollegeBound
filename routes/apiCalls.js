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
    
    var fieldsReturned = 'id,school.name,2015.admissions.act_scores.midpoint.cumulative,2015.student.size'


    var pathES6 = `https://api.data.gov/ed/collegescorecard/v1/schools.json?${urlParams}_fields=${fieldsReturned}&api_key=${apiKey}`

    axios.get(pathES6).then(result => {
        // console.log(result.data.results)
        res.end(JSON.stringify({schools: result.data.results, finalParams: finalParams}))
    }).catch(err => {
        console.log('---SOMETHING WENT WRONG------')
        res.end(fallbackMsg)
    })
}

//alter this as more parameters, turns parameters into url strings for use in college scorecard API call
function packageParams (params, prevParams) {
    
    var finalParams = reconcileParams(params, prevParams)
    
    //might need to change the refernces on params later...
    var SAT_score = ''
    
    //search for range of ACT scores (+3, -5)
    var ACT_score = finalParams.ACT_score ? `2015.admissions.act_scores.midpoint.cumulative__range=${Number(finalParams.ACT_score) - 5}..${Number(finalParams.ACT_score) + 3}&` : ''
    
    var school_location = determineLocation(finalParams.school_location)
    
    var school_size = finalParams.school_size ? `2015.student.size__range=..${finalParams.school_size}&` : ''
    
    var school_cost = ''

    var urlParams =  ACT_score + SAT_score + school_location + school_cost + school_size

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

function determineLocation (location) {
    if(!location){
        return ''
    }

    console.log(location.toLowerCase())
    location = location.toLowerCase().trim()
    //determined by state/region
    var url = ''
    
    switch (location){
        case 'alabama':
            url = 'school.state_fips=1&'
            break;
        case 'alaska':
            url = 'school.state_fips=2&'
            break;
        case 'arizona':
            url = 'school.state_fips=4&'
            break;
        case 'arkansas':
            url = 'school.state_fips=5&'
            break;
        case 'california':
            url = 'school.state_fips=6&'
            break;
        case 'colorado':
            url = 'school.state_fips=8&'
            break;
        case 'connecticut':
            url = 'school.state_fips=9&'
            break;
        case 'delaware':
            url = 'school.state_fips=10&'
            break;
        case 'washington d.c.':
            url = 'school.state_fips=11&'
            break;
        case 'florida':
            url = 'school.state_fips=12&'
            break;
        case 'georgia':
            url = 'school.state_fips=13&'
            break;
        case 'hawaii':
            url = 'school.state_fips=15&'
            break;
        case 'idaho':
            url = 'school.state_fips=16&'
            break;
        case 'illinois':
            url = 'school.state_fips=17&'
            break;
        case 'indiana':
            url = 'school.state_fips=18&'
            break;
        case 'iowa':
            url = 'school.state_fips=19&'
            break;
        case 'kansas':
            url = 'school.state_fips=20&'
            break;
        case 'kentucky':
            url = 'school.state_fips=21&'
            break;
        case 'louisiana':
            url = 'school.state_fips=22&'
            break;
        case 'maine':
            url = 'school.state_fips=23&'
            break;
        case 'maryland':
            url = 'school.state_fips=24&'
            break;
        case 'massachusetts':
            url = 'school.state_fips=25&'
            break;
        case 'michigan':
            url = 'school.state_fips=26&'
            break;
        case 'minnesota':
            url = 'school.state_fips=27&'
            break;
        case 'mississippi':
            url = 'school.state_fips=28&'
            break;
        case 'missouri':
            url = 'school.state_fips=29&'
            break;
        case 'montana':
            url = 'school.state_fips=30&'
            break;
        case 'nebraska':
            url = 'school.state_fips=31&'
            break;
        case 'nevada':
            url = 'school.state_fips=32&'
            break;
        case 'new hampshire':
            url = 'school.state_fips=33&'
            break;
        case 'new jersey':
            url = 'school.state_fips=34&'
            break;
        case 'new mexico':
            url = 'school.state_fips=35&'
            break;
        case 'new york':
            url = 'school.state_fips=36&'
            break;
        case 'north carolina':
            url = 'school.state_fips=37&'
            break;
        case 'north dakota':
            url = 'school.state_fips=38&'
            break;
        case 'ohio':
            url = 'school.state_fips=39&'
            break;
        case 'oklahoma':
            url = 'school.state_fips=40&'
            break;
        case 'oregon':
            url = 'school.state_fips=41&'
            break;
        case 'pennsylvania':
            url = 'school.state_fips=42&'
            break;
        case 'rhode island':
            url = 'school.state_fips=44&'
            break;
        case 'south carolina':
            url = 'school.state_fips=45&'
            break;
        case 'south dakota':
            url = 'school.state_fips=46&'
            break;
        case 'tennessee':
            url = 'school.state_fips=47&'
            break;
        case 'texas':
            url = 'school.state_fips=48&'
            break;
        case 'utah':
            url = 'school.state_fips=49&'
            break;
        case 'vermont':
            url = 'school.state_fips=50&'
            break;
        case 'virginia':
            url = 'school.state_fips=51&'
            break;
        case 'washington':
            url = 'school.state_fips=53&'
            break;
        case 'west virgina':
            url = 'school.state_fips=54&'
            break;
        case 'wisconsin':
            url = 'school.state_fips=55&'
            break;
        case 'wyoming':
            url = 'school.state_fips=56&'
            break;
        case 'american samoa':
            url = 'school.state_fips=60&'
            break;
        case 'micronesia':
            url = 'school.state_fips=64&'
            break;
        case 'guam':
            url = 'school.state_fips=66&'
            break;
        case 'mariana':
            url = 'school.state_fips=69&'
            break;
        case 'palau':
            url = 'school.state_fips=70&'
            break;
        case 'puerto rico':
            url = 'school.state_fips=72&'
            break;
        case 'virgin islands':
            url = 'school.state_fips=78&'
            break;
        //regions
        case 'north east':
            url = 'region_id=1&'
            break;
        case 'mid east':
            url = 'region_id=2&'
            break;
        case 'north':
            url = 'region_id=3&'
            break;
        case 'midwest':
            url = 'region_id=4&'
            break;
        case 'southeast':
            url = 'region_id=5&'
            break;
        case 'southwest':
            url = 'region_id=6&'
            break;
        case 'rocky mountains':
            url = 'region_id=7&'
            break;
        case 'west coast':
            url = 'region_id=8&'
            break;
        case 'territories':
            url = 'region_id=9&'
            break;
        case 'northwest':
            url = 'school.state_fips=53,41,16&'
            break;
        
        default:
            //just want to get error message
            url='askjdnasndasd'
            break;
    }

    return url


}

function determineSchoolSize (school_size, school_size1){
    
}

module.exports = callDialogApi

// callDialogApi('I got a 26 on the ACT and want a school with less than 2000 people')

// reconcileParams(
//     {"school_size":"3000","school_size1":"","ACT_score":"","SAT_score":"","school_location":""},
//     {"ACT_score":"29 ","SAT_score":"null","school_size":"null","school_size1":"null","location":"null","cost":null}
// )




