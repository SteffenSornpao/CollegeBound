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
        //no location entered
        case '':
            url = ''
            break;
        
        //search using city instead
        default:
            url=`school.city=${location}&`
            break;
    }

    return url


}

function determineSchoolSize (school_size, school_size1){
    var sizeUrl = ''

    if(school_size && school_size1){
        sizeUrl = `2015.student.size__range=${school_size1}..${school_size}&`

    }else if (school_size){

        switch(school_size){
            case 'small': 
                sizeUrl = `2015.student.size__range=..5000&`
                break;
            case 'medium': 
                sizeUrl = `2015.student.size__range=5000..15000&`
                break;
            case 'large': 
                sizeUrl = `2015.student.size__range=15000..30000&`
                break;
            case 'huge': 
                sizeUrl = `2015.student.size__range=30000..&`
                break;
            default: 
                sizeUrl = `2015.student.size__range=..${school_size}&`
        }
    }else{
        sizeUrl = ''
    }

    return sizeUrl

}

function determineMajor (major){
    
    var majorUrl = ''

    //have the percentage inside ${} just to highlight it (based on 2015-2016)
    switch(major){
        case 'agriculture':
            majorUrl = `2015.academics.program_percentage.agriculture__range=${37005/1920718}..&`
            break;
        case 'architecture':
            majorUrl = `2015.academics.program_percentage.architecture__range=${8823/1920718}..&`
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
            majorUrl = 'NOMAJORFOUND'
            break;

    }

    return majorUrl
}

module.exports = {
    determineLocation,
    determineSchoolSize,
    determineMajor,
}

console.log(determineSchoolSize('small', ''))