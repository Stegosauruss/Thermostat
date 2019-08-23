$( document ).ready(function() {
  var thermostat = new Thermostat

  var temp = $("#temperature").text();
  var psm = $("#switch-power-saving").text();
  var currentCity = $("#new-city").text();

  thermostat._temperature = temp
  thermostat.currentCity = currentCity
  if(psm === "OFF") {
    thermostat._powerSaving = false;
  }

  displayWeather()

  $(window).on("beforeunload", () => {
    var on_or_off;
    
    if (thermostat.isPowerSavingMode() === true) {
      on_or_off = "ON";
    } else {
      on_or_off = "OFF";
    }
    $.ajax({
      type: "POST",
      url: "/",
      data: { 
        temperature: thermostat.getCurrentTemperature(), 
        power_saving: on_or_off, 
        current_city: thermostat.currentCity, 
        temp_color: thermostat.energyUsage()
      },
      async: false
    });
  });

  $( "#raise-temperature" ).click(function( event ) {
    thermostat.raiseTemperature();
    updateTemperature()
  });

  $( "#lower-temperature" ).click(function( event ) {
    thermostat.lowerTemperature();
    updateTemperature()
  });

  $( "#switch-power-saving" ).click(function( event ) {
    thermostat.switchPowerSaving();
    if(thermostat.isPowerSavingMode() == true) {
      $( "#switch-power-saving" ).text("ON")
      updateTemperature()
    } else {
      $( "#switch-power-saving" ).text("OFF")
    }
  });

  $( "#set-default-temperature" ).click(function( event ) {
    thermostat.setDefaultTemperature();
    updateTemperature()
  });

  var updateTemperature = function(){
    $('#temperature').text(thermostat.getCurrentTemperature())
    $('#temperature').css("color", thermostat.energyUsage())
  }

  function displayWeather() {
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + thermostat.currentCity;
    var token = '&appid=a3d9eb01d4de82b9b8d0849ef604dbed';
    var units = '&units=metric';
    $.get(url + token + units, function(data) {
      $('#outside-temperature').text(Math.round(data.main.temp));
    })
  }

  $('#current-city').change(function() {
    thermostat.currentCity = $('#current-city').val();
    displayWeather(thermostat.currentCity);
  })

});