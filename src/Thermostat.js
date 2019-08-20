'use strict';

function Thermostat(){
  this.temperature = 20;
  this.minTemperature = 10;
  this.powerSaving = true;
};

Thermostat.prototype = {
  raiseTemperature: function(){
    if(this.temperature == this.maxTemperature()) {
      throw new Error('Cannot raise temperature: At Maximum')
    };
    this.temperature++
  },

  lowerTemperature: function(){
    if(this.temperature == this.minTemperature) {
      throw new Error('Cannot lower temperature: At Minimum')
    };
    this.temperature--
  },

  maxTemperature: function(){
    if(this.powerSaving == true){
      return 25
    };
    return 32
  },

  switchPowerSaving: function(){
    this.powerSaving = !this.powerSaving
  },

  setDefault: function(){
    this.temperature = 20
  },

  energyUsage: function(){
    if(this.temperature < 18) {
      return "green"
    } else if(this.temperature < 25) {
      return "black"
    } else {
      return "red"
    }   
  }
};
