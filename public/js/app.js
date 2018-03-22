try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
  }
  catch(e) {
    console.error(e);
    $('.no-browser-support').show();
    $('.app').hide();
  }

  recognition.onstart = function() { 
    console.log('Voice recognition activated.');
  }
  
  recognition.onspeechend = function() {
    console.log('You were quiet for a while so voice recognition turned itself off.');

    //setTimeout necessary to get query (for now)
    setTimeout(submitQuery, 500)
  }
  
  recognition.onerror = function(event) {
    if(event.error == 'no-speech') {
      console.log('No speech was detected. Try again.');  
    };
  }

  recognition.onresult = function(event) {
    var noteContent =''
    // event is a SpeechRecognitionEvent object.
    // It holds all the lines we have captured so far. 
    // We only need the current one.
    var current = event.resultIndex;
  
    // Get a transcript of what was said.
    var transcript = event.results[current][0].transcript;
  
    // Add the current transcript to the contents of our Note.
    noteContent += transcript;
    $('#words').text(noteContent);
  }

  $('#start-record-btn').on('click', function(e) {
    recognition.start();
  });

  function submitQuery(event){
    event.preventDefault()
    // var query = $('#words').text()
    var query = $('input').val().trim()

    var previousParams = {
        ACT_score: sessionStorage.getItem('ACT_score'),
        SAT_score: sessionStorage.getItem('SAT_score'),
        school_size: sessionStorage.getItem('school_size'),
        school_size1: sessionStorage.getItem('school_size1'),
        school_location: sessionStorage.getItem('school_location'),
        school_cost: sessionStorage.getItem('school_cost'),
        major: sessionStorage.getItem('major')
    }

    previousParams = JSON.stringify(previousParams)

    console.log('Query: ' + query)
    $.post('/results', {query: query, prevParams: previousParams}, function(data, status){
        //we'll do something here to show data later
        console.log(JSON.parse(data))

        var finalParams = JSON.parse(data).finalParams

        //store all params in session storage
        for (key in finalParams){
            //don't log school_size1
            if(key === "school_size1"){
                continue
            }
            console.log(key)
            sessionStorage.setItem(key, finalParams[key])
        }

        $('#results').text(data)
        console.log('It all worked!')
    })
}

$('#submit-query').on('click', submitQuery)

//new file