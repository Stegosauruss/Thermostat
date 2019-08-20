'use strict';

describe('Feature Test:', function(){
  var thermostat;

  beforeEach(function(){
    thermostat = new Thermostat();
  });

  it('The thermostat has a default temperature', function() {
    expect(thermostat.temperature).toEqual(20);
  });

  it('The temperature can be reset to default', function() {
    thermostat.raiseTemperature()
    thermostat.raiseTemperature()
    thermostat.setDefault()
    expect(thermostat.temperature).toEqual(20);
  });

  it('The temperature can be raised', function(){
    thermostat.raiseTemperature()
    expect(thermostat.temperature).toEqual(21);
  });

  it('The temperature can be lowered', function(){
    thermostat.lowerTemperature()
    expect(thermostat.temperature).toEqual(19);
  });

  it('the temperature cannot be lowered below min temperature', function(){
    for(var i = 1; i <= 10; i++) {
      thermostat.lowerTemperature()
    }
    expect(function(){thermostat.lowerTemperature();}).toThrowError('Cannot lower temperature: At Minimum')
  });

  it('with power saving on there is a max temperature', function(){
    for(var i = 1; i <= 5; i++) {
      thermostat.raiseTemperature()
    }
    expect(function(){thermostat.raiseTemperature();}).toThrowError('Cannot raise temperature: At Maximum')
  });

  it('with power saving off there is a max temperature', function(){
    thermostat.switchPowerSaving();
    for(var i = 1; i <= 12; i++) {
      thermostat.raiseTemperature()
    }
    expect(function(){thermostat.raiseTemperature();}).toThrowError('Cannot raise temperature: At Maximum')
  });

  it('energy use is indicated with a light', function(){
    thermostat.switchPowerSaving();
    for(var i = 1; i <= 3; i++) {
      thermostat.lowerTemperature()
    }
    expect(thermostat.energyUsage()).toEqual("green")
    for(var i = 1; i <= 7; i++) {
      thermostat.raiseTemperature()
    }
    expect(thermostat.energyUsage()).toEqual("black")
    thermostat.raiseTemperature()
    expect(thermostat.energyUsage()).toEqual("red")
  });
});