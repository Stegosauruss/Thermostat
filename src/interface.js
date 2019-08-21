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
});