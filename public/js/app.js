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

  $('#speak').on('click', function(e) {
    recognition.start();
  });

function submitQuery(){
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

  $.post('/results', {query: query, prevParams: previousParams}, function(data, status){
      var info = JSON.parse(data)
      var finalParams = info.finalParams
      var school = info.schools
      console.log(school)
      // store all params in session storage
      for (key in finalParams){
          //don't log school_size1
          if(key === "school_size1"){
              continue
          }
          sessionStorage.setItem(key, finalParams[key])
      }
      $("#info").html(" ")
      for (i=0;i<school.length;i++){
        $("#info").append(
          "<div class='result'>"+school[i]['school.name']+"</div>"
        )
      }
  })
}

$("#input").on("keyup", function(){
  if (event.keyCode === 13){
    event.preventDefault()
    submitQuery()
    $("input").val("")
  }
})

$("#reset").on("mouseenter", function(){
  $("#reset").animate({backgroundColor: "#ff0000"}, 500)
})
$("#reset").on("mouseleave", function(){
  $("#reset").animate({backgroundColor: "#000000"}, 500)
})
$("#reset").on("click", function(){
  sessionStorage.clear();
})

$("#start-record-btn").on("mouseenter", function(){
  $("#start-record-btn").animate({backgroundColor: "#ff0"}, 500)
})
$("#start-record-btn").on("mouseleave", function(){
  $("#start-record-btn").animate({backgroundColor: "#fff"}, 500)
})
