'use strict';

describe('Feature Test:', function(){
  var thermostat;

  beforeEach(function(){
    thermostat = new Thermostat();
  });

  it('The thermostat has a default temperature', function() {
    expect(thermostat.getCurrentTemperature()).toEqual(20);
  });

  it('The temperature can be reset to default', function() {
    thermostat.raiseTemperature()
    thermostat.raiseTemperature()
    thermostat.setDefaultTemperature()
    expect(thermostat.getCurrentTemperature()).toEqual(20);
  });

  it('The temperature can be raised', function(){
    thermostat.raiseTemperature()
    expect(thermostat.getCurrentTemperature()).toEqual(21);
  });

  it('The temperature can be lowered', function(){
    thermostat.lowerTemperature()
    expect(thermostat.getCurrentTemperature()).toEqual(19);
  });

  it('the temperature cannot be lowered below min temperature', function(){
    for(var i = 1; i <= 11; i++) {
      thermostat.lowerTemperature();
    }
    expect(thermostat.getCurrentTemperature()).toEqual(10);
  });

  it('with power saving on there is a max temperature', function(){
    for(var i = 1; i <= 6; i++) {
      thermostat.raiseTemperature()
    }
    expect(thermostat.getCurrentTemperature()).toEqual(25);
  });

  it('with power saving off there is a max temperature', function(){
    thermostat.switchPowerSaving();
    for(var i = 1; i <= 13; i++) {
      thermostat.raiseTemperature()
    }
    expect(thermostat.getCurrentTemperature()).toEqual(32);
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

  it('is on by default', function() {
    expect(thermostat.isPowerSavingMode()).toBe(true);
  });

  it('can be switched off', function() {
    thermostat.switchPowerSaving();
    expect(thermostat.isPowerSavingMode()).toBe(false);
  });

  it('can be switched on again', function() {
    thermostat.switchPowerSaving();
    thermostat.switchPowerSaving();
    expect(thermostat.isPowerSavingMode()).toBe(true);
  });
});