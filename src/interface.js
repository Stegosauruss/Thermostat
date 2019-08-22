$( document ).ready(function() {
  var thermostat = new Thermostat

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

  function displayWeather(city) {
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city;
    var token = '&appid=a3d9eb01d4de82b9b8d0849ef604dbed';
    var units = '&units=metric';
    $.get(url + token + units, function(data) {
      $('#outside-temperature').text(Math.round(data.main.temp));
    })
  }

  displayWeather('Borough of Southend-on-Sea');

  $('#current-city').change(function() {
    var city = $('#current-city').val();
    displayWeather(city);
  })
});