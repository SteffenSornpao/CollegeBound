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
  // active()
}

function active(){
  $("#speak").animate({backgroundColor: "#ff0"}, 500)
  $("#speak").animate({backgroundColor: "#fff"}, 500)
  active()
}

recognition.onspeechend = function() {
  console.log('You were quiet for a while so voice recognition turned itself off.');
//setTimeout necessary to get query (for now)
  setTimeout(function(){
    submitQuery()
    $("input").val("")
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
    $('#input').val(noteContent);
    console.log(event.results)
  }



function submitQuery(){
  var query = $('input').val().trim(),
      previousParams = {
      ACT_score:     sessionStorage.getItem('ACT_score'),
      SAT_score:     sessionStorage.getItem('SAT_score'),
      school_size:   sessionStorage.getItem('school_size'),
      school_size1:  sessionStorage.getItem('school_size1'),
      regionId:      sessionStorage.getItem('regionId'),
      "geo-city":    sessionStorage.getItem('geo-city'),
      state:         sessionStorage.getItem('state'),
      womenOnly:     sessionStorage.getItem('womenOnly'),
      menOnly:       sessionStorage.getItem('menOnly'),
      family_income: sessionStorage.getItem('school_cost'),
      major:         sessionStorage.getItem('major'),
      degree_type:   sessionStorage.getItem('degree_type')
  }

  previousParams = JSON.stringify(previousParams)

  $.post('/results', {query: query, prevParams: previousParams}, function(data, status){
      var info        = JSON.parse(data),
          finalParams = info.finalParams,
          school      = info.schools;
          console.log(info)
      // store all params in session storage
      for (key in finalParams){
          //don't log school_size1
          if(key === "school_size1"){
              continue
          }
          sessionStorage.setItem(key, finalParams[key])
// *** Param append to DOM ***
          if (finalParams[key] !== ""){
            $("#params").append(
              "<div class='param'>"+finalParams[key].toUpperCase()+"</div>"
            )
            $("#params").animate({left:"-=120px"}, 600)
          }
      }
      $("#results").html(" ")
      $("#total").text()
      if(school){
        for (i=0;i<school.length;i++){
          $("#results").append(
            "<div id='"+school[i].id+"' class='result'>"+
              "<div class='result-title'>"+school[i]['school.name']+"</div>"+
              "<div class='result-info'>"+school[i]['id']+"</div>"+
            "</div>"
          )
          $("#results").animate({opacity: "1", top: "120px"}, 600)

        }
        upsertDB(school)
      }else{
        //DISPLAYING THE ERROR MESSAGE CAN GO HERE
        console.log(info)
      }
      $(".result").animate({opacity: "1"}, 600)
      $("#results").animate({top: "120px"}, 600)
  })
}

//upsert schools into DB
function upsertDB (schools) {
  schools.forEach((school) => {

    console.log('School ID: ' + school.id)
    console.log('School name: ' + school["school.name"])

    $.ajax('/api/colleges', {
      method: 'PUT',
      data: {
        schoolid: school.id,
        schoolname: school["school.name"]
      },
      success: function(data, status){
        console.log('Upserted!')
      },
      error: function(something, string){
        console.log('Fuck...')
      }
    })
  })
}

// *** Start ***
$("#a").on("click", function(){
  $("#start-info").fadeOut(500)
  $("#start").animate({height: "60px"}, 500, function(){
    $("#start").animate({width: "100px"}, 500, function(){
      $("#logo").fadeIn(500)
    })
  })
})

// *** Press enter ***
$("#input").on("keydown", function(){
  if (event.keyCode === 13){
    $("#submit").css("backgroundColor", "#00f100")
  }
})
$("#input").on("keyup", function(){
  if (event.keyCode === 13){
    event.preventDefault()
    $("#submit").css("backgroundColor", "#eee")
    submitQuery()
    $("input").val("")
  }
})

// *** Submit button ***
$("#submit").on("mouseenter", function(){
  $("#submit").animate({backgroundColor: "#00ff00"}, 500)
})
$("#submit").on("mouseleave", function(){
  $("#submit").animate({backgroundColor: "#eee"}, 500)
})
$("#submit").on("mousedown", function(){
  $("#submit").css("backgroundColor", "#00f100")
})
$("#submit").on("mouseup", function(){
  $("#submit").css("backgroundColor", "#00ff00")
})
$("#submit").on("click", function(){
  event.preventDefault()
  submitQuery()
  $("input").val("")
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
  console.log("start")
  $("#results").fadeOut(500, function(){
    $("#results").html("").fadeIn(100)
  })
  console.log("end")
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
$('#speak').on('click', function(e) {
  recognition.start();
});


// *** Click result ***
$("#results").on("click", ".result", ".open", function(){
  resultClose()
  $(this).delay(600).animate({marginLeft: "540px"}, function(){
    $(this).css("position", "fixed")
      .animate({top: "120px", bottom: "0"})
      .toggleClass("result open");
      $(".result-info", this).fadeIn(300)
  })
})

// *** Click opened result ***
$("#results").on("click", ".open", function(){
  resultClose()
})

function resultClose(){
  $(".result-info").fadeOut(300)
  $(".open").animate({height: "25px"}, function(){
    $(".open").animate({marginLeft: "100px"})
      .css({"position": "static", "height": "auto", "top": "auto", "bottom": "auto"})
      .toggleClass("result open");
  })
}
