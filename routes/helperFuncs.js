// *** By state name ***
function state(state){
  if(!state){
    return ''
  }
  state = state.toLowerCase().trim()
  var url = ""
  switch (state){
    case state:
      url = `school.state=${state}&`
      break;
//No location entered
    case '':
      url = ''
      break;
//Location not found
    default:
      url='errStateNotFound'
      break;
    }
  return url
}

// *** By region ***
function regionId(region){
  if(!region){
    return ''
  }
  region = region.toLowerCase().trim()
  var url = ""
  switch (region) {
    case region:
      url = `school.region_id=${region}&`
      break;
//No location entered
    case '':
      url = ''
      break;
//Location not found
    default:
      url='errRegionNotFound'
      break;
    }
  return url
}

//By school size
function determineSchoolSize (school_size, school_size1){

}

//By major
function determineMajor (major){

    var majorUrl = ''

    //have the percentage inside ${} just to highlight it (based on 2015-2016)
    switch(major){
        case 'agriculture':
            majorUrl = `2015.academics.program_percentage.agriculture__range=${37005/1920718}..&`
            break;
        case 'architechture':
            majorUrl = `2015.academics.program_percentage.architechture__range=${8823/1920718}..&`
            break;
        case 'culture':
            majorUrl = `2015.academics.program_percentage.ethnic_cultural_gender__range=${7840/1920718}..&`
            break;
        case 'communications':
            majorUrl = `2015.academics.program_percentage.communication__range=${92554/1920718}..&`
            break;
        case 'computer':
            majorUrl = `2015.academics.program_percentage.computer__range=${64405/1920718}..&`
            break;
        case 'cooking':
            majorUrl = `2015.academics.program_percentage.personal_culinary__range=${0.01}..&`
            break;
        case 'education':
            majorUrl = `2015.academics.program_percentage.education__range=${87217/1920718}..&`
            break;
        case 'engineering':
            majorUrl = `2015.academics.program_percentage.engineering__range=${106850/1920718}..&`
            break;
        case 'language':
            majorUrl = `2015.academics.program_percentage.language__range=${18427/1920718}..&`
            break;
        case 'legal':
            majorUrl = `2015.academics.program_percentage.legal__range=${4243/1920718}..&`
            break;
        case 'english':
            majorUrl = `2015.academics.program_percentage.english__range=${42795/1920718}..&`
            break;
        case 'humanities':
            majorUrl = `2015.academics.program_percentage.humanities__range=${43661/1920718}..&`
            break;
        case 'library':
            majorUrl = `2015.academics.program_percentage.library__range=${85/1920718}..&`
            break;
        case 'biology':
            majorUrl = `2015.academics.program_percentage.biological__range=${113749/1920718}..&`
            break;
        case 'math':
            majorUrl = `2015.academics.program_percentage.mathematics__range=${22777/1920718}..&`
            break;
        case 'military':
            majorUrl = `2015.academics.program_percentage.military__range=${358/1920718}..&`
            break;
        case 'philosophy':
            majorUrl = `2015.academics.program_percentage.philosophy_religious__range=${10157/1920718}..&`
            break;
        case 'theology':
            majorUrl = `2015.academics.program_percentage.theology_religious_vocation__range=${9804/1920718}..&`
            break;
        case 'physical science':
            majorUrl = `2015.academics.program_percentage.engineering__range=${30477/1920718}..&`
            break;
        case 'psychology':
            majorUrl = `2015.academics.program_percentage.psychology__range=${117440/1920718}..&`
            break;
        case 'security':
            majorUrl = `2015.academics.program_percentage.security_law_enforcement__range=${61157/1920718}..&`
            break;
        case 'social services':
            majorUrl = `2015.academics.program_percentage.public_administration_social_service__range=${34432/1920718}..&`
            break;
        case 'social science':
            majorUrl = `2015.academics.program_percentage.social_science__range=${90000/1920718}..&`
            break;
        case 'transportation':
            majorUrl = `2015.academics.program_percentage.transportation__range=${4529/1920718}..&`
            break;
        case 'art':
            majorUrl = `2015.academics.program_percentage.visual_performing__range=${92979/1920718}..&`
            break;
        case 'health':
            majorUrl = `2015.academics.program_percentage.health__range=${228896/1920718}..&`
            break;
        case 'business':
            majorUrl = `2015.academics.program_percentage.business_marketing__range=${371694/1920718}..&`
            break;
        case 'history':
            majorUrl = `2015.academics.program_percentage.history__range=${70000/1920718}..&`
            break;
        //no major entered
        case '':
        case undefined:
            majorUrl=''
            break;

        //major not found
        default:
            majorUrl = 'nonexistant'
            break;

    }

    return majorUrl
}

module.exports = {
    state,
    regionId,
    determineSchoolSize,
    determineMajor,
}
