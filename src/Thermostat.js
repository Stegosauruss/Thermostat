'use strict';

function Thermostat(){
  this.DEFAULT_TEMPERATURE = 20;
  this.MAX_LIMIT_PSM = 25
  this.MAX_LIMIT = 32
  this.MIN_TEMPERATURE = 10
  this.MEDIUM_ENERGY_LIMIT = 18
  this._temperature = this.DEFAULT_TEMPERATURE;
  this._powerSaving = true;
};

Thermostat.prototype = {
  getCurrentTemperature: function() {
    return this._temperature
  },

  raiseTemperature: function(){
    if(this._temperature == this.maxTemperature()) {
      return
    };
    this._temperature++;
  },

  lowerTemperature: function(){
    if(this._temperature == this.MIN_TEMPERATURE) {
      return
    };
    this._temperature--;
  },

  maxTemperature: function(){
    if(this._powerSaving == true){
      return this.MAX_LIMIT_PSM;
    };
    return this.MAX_LIMIT;
  },

  isPowerSavingMode: function(){
    return this._powerSaving === true;
  },

  switchPowerSaving: function(){
    this._powerSaving = !this._powerSaving;

    if(this._powerSaving && this._temperature > 25) {
      this._temperature = 25
    }
  },

  setDefaultTemperature: function(){
    this._temperature = this.DEFAULT_TEMPERATURE;
  },

  energyUsage: function(){
    if(this._temperature < this.MEDIUM_ENERGY_LIMIT) {
      return "green";
    } else if(this._temperature < this.MAX_LIMIT_PSM) {
      return "black";
    } else {
      return "red";
    }   
  }
};
