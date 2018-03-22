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
      regionId: sessionStorage.getItem('regionId'),
      "geo-city": sessionStorage.getItem('geo-city'),
      state: sessionStorage.getItem('state'),
      womenOnly: sessionStorage.getItem('womenOnly'),
      menOnly: sessionStorage.getItem('menOnly'),
      school_cost: sessionStorage.getItem('school_cost'),
      major: sessionStorage.getItem('major')
  }
  previousParams = JSON.stringify(previousParams)

  $.post('/results', {query: query, prevParams: previousParams}, function(data, status){
      var info = JSON.parse(data),
          finalParams = info.finalParams,
          school = info.schools,
          id =
      console.log(info)
      // store all params in session storage
      for (key in finalParams){
          //don't log school_size1
          if(key === "school_size1"){
              continue
          }
          sessionStorage.setItem(key, finalParams[key])
      }
      $("#results").html(" ")
      for (i=0;i<school.length;i++){
        $("#results").append(
          "<div id='"+school[i].id+"' class='result'>"+school[i]['school.name']+"</div>"
        )
        $("#results").animate({opacity: "1", top: "120px"}, 600)
      }
      console.log(finalParams)
      console.log(finalParams[key])
      $("#params").append(
        "<div class='param'>"+finalParams[key].toUpperCase()+"</div>"
      )
      $("#params").animate({left:"-=120px"}, 600)
  })
}

// *** Press start ***
$("#a").on("click", function(){
  $("#start-info").fadeOut(500)
  $("#start").animate({height: "60px", width: "100px"}, 1000, function(){
    $("#logo").fadeIn(500)
  })
})

// *** Press enter ***
$("#input").on("keyup", function(){
  if (event.keyCode === 13){
    event.preventDefault()
    submitQuery()
    $("input").val("")
  }
})

// *** Reset button ***
$("#reset").on("mouseenter", function(){
  $("#reset").animate({backgroundColor: "#ff0000"}, 500)
})
$("#reset").on("mouseleave", function(){
  $("#reset").animate({backgroundColor: "#000000"}, 500)
})
$("#reset").on("click", function(){
  sessionStorage.clear();
  $("#results").fadeOut(500, function(){
    $("#results").html("").fadeIn(100)
  })
  $("#params").fadeOut(500, function(){
    $("#params").css("left", "100%").html("").fadeIn(100)
  })
})

// *** Speak button ***
$("#speak").on("mouseenter", function(){
  $("#speak").animate({backgroundColor: "#ff0"}, 500)
})
$("#speak").on("mouseleave", function(){
  $("#speak").animate({backgroundColor: "#fff"}, 500)
})
