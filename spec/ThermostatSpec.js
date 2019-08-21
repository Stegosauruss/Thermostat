'use strict';

describe('Thermostat:', function(){
  var thermostat;

  beforeEach(function(){
    thermostat = new Thermostat();
  });

  describe('#defaultTemperature', function() {
    it('Default temperature is 20', function() {
      expect(thermostat.getCurrentTemperature()).toEqual(20);
    });

    it('can be set', function() {
      thermostat.raiseTemperature()
      thermostat.raiseTemperature()
      thermostat.setDefaultTemperature()
      expect(thermostat.getCurrentTemperature()).toEqual(20);
    });
  })

  describe('#raiseTemperature', function(){
    it('raises temperature by 1', function(){
      thermostat.raiseTemperature()
      expect(thermostat.getCurrentTemperature()).toEqual(21)
    });

    describe('When at maximum temperature:', function(){
      describe('With power saving on', function(){
        it('cannot be raised', function(){
          for(var i = 1; i <= 6; i++) {
            thermostat.raiseTemperature()
          }
          expect(thermostat.getCurrentTemperature()).toEqual(25);
        })
      });

      describe('With power saving off', function(){
        it('cannot be raised', function(){
          thermostat.switchPowerSaving();
          for(var i = 1; i <= 13; i++) {
            thermostat.raiseTemperature()
          };
          expect(thermostat.getCurrentTemperature()).toEqual(32);
        });
      });
    });
  });

  describe('#lowerTemperature', function(){
    it('lowers temperature by 1', function(){
      thermostat.lowerTemperature()
      expect(thermostat.getCurrentTemperature()).toEqual(19)
    });

    describe('When at minimum temperature:', function(){
      it('temperature cannot be lowered', function(){
        for(var i = 1; i <= 11; i++) {
          thermostat.lowerTemperature()
        }
        expect(thermostat.getCurrentTemperature()).toEqual(10);
      })
    })
  });

  describe('#powerSavingMode:', function(){
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

  describe('#energyUsage', function(){
    it('returns green when at low usage', function(){
      for(var i = 1; i <= 3; i++) {
        thermostat.lowerTemperature();
      }
      expect(thermostat.energyUsage()).toEqual("green")
    });

    it('returns black when at medium usage', function(){
      expect(thermostat.energyUsage()).toEqual("black")
    });

    it('returns red when at high usage', function(){
      for(var i = 1; i <= 5; i++) {
        thermostat.raiseTemperature();
      }
      expect(thermostat.energyUsage()).toEqual("red")
    });
  });
});