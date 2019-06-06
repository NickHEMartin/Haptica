// Version 24

// Map code is based on Google Maps Platform Geocoding Service code with alterations being applied to work for our purposes.
// https://developers.google.com/maps/documentation/javascript/examples/geocoding-simple?fbclid=IwAR3CdZ7HGf8jQHV5rKKkPwOL1HVNK8gpIPBZhMbb5ANB9yst2mW4YFrECdY

// Speech recognition code completely based on Amit Agarwal tutorial How to Add Speech Recognition to your Website
// https://www.labnol.org/software/add-speech-recognition-to-website/19989/?fbclid=IwAR3xYJtQ649yuqafzsYjS1IlH8n4n7NafkeHwRIb3kOh7V98bUE1sdRCJSg

//When the user clicks on the image this function will execute
function startDictation() {
  // Will only work if the device is able to use speech recognition
  if (window.hasOwnProperty('webkitSpeechRecognition')) {
    // Speech "variable" to hold the data
    var recognition = new webkitSpeechRecognition();

    // Settings for the Speech "Variable"
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    // Executes the microphone, listens, holds and translates the voice patterns into text
    recognition.start();

    // When the microphone has collected some of the data
    recognition.onresult = function(e) {
      document.getElementById('address').value = e.results[0][0].transcript; // Start putting it into the address box
      recognition.stop(); // Stops recording
      document.getElementById('coorBox'); // NOT SURE WHAT THIS DOES YET
    };

    // Just in case the speech recognition doesn't work
    recognition.onerror = function(e) {
      recognition.stop(); // Stops recording
    }
  }
}

function initMap() {
  // Initiates the map.
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: -41.286, lng: 174.776} // Focuses on Wellington
  });
  // Loads the geocoder for the map, to impliment markers
  var geocoder = new google.maps.Geocoder();

  // When the submit button is pressed executes the geocodeAddress. Which gets the desired location data
  document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map); // Function to execute
  });
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value; // Takes the address entered

  // Make sure it can work and if it can executes a function to find the location of the device
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location); // Finds the location
      var marker = new google.maps.Marker({
        // Puts a Marker at that result
        map: resultsMap,
        position: results[0].geometry.location
      });

      var lat = marker.getPosition().lat(); // Gets the latitude of the desire location and holds it in a variable
      var long = marker.getPosition().lng(); // Gets the longitude of the desire location and holds it in a variable

      // Sets up a variable to carry the coordinates in the URL to be used by the compass page then opens the compass page
      var tHref = 'compass.html' + '#' + lat +';' + long;
      window.location.href = tHref;
    } 

    // Tells the user why the code didn't execute properly
    else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}