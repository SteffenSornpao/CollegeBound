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
    setTimeout(function (){
        var query = $('#words').text()
        console.log('Query: ' + query)
        $.post('/results', {query: query}, function(data, status){
            //we'll do something here to show data later
            console.log(JSON.parse(data))
            console.log('It all worked!')
        })
    }, 500)
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