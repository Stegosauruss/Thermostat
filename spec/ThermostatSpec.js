describe('Thermostat:', function(){
  var thermostat;

  beforeEach(function(){
    thermostat = new Thermostat();
  });

  describe('#defaultTemperature', function() {
    it('Default temperature is 20', function() {
      expect(thermostat.temperature).toEqual(20);
    });

    it('can be set', function() {
      thermostat.raiseTemperature()
      thermostat.raiseTemperature()
      thermostat.setDefault()
      expect(thermostat.temperature).toEqual(20);
    });
  })

  describe('#raiseTemperature', function(){
    it('raises temperature by 1', function(){
      thermostat.raiseTemperature()
      expect(thermostat.temperature).toEqual(21)
    });

    describe('When at maximum temperature:', function(){
      describe('With power saving on', function(){
        it('throws an error', function(){
          for(var i = 1; i <= 5; i++) {
            thermostat.raiseTemperature()
          }
          expect(function(){thermostat.raiseTemperature();}).toThrowError('Cannot raise temperature: At Maximum')
        })
      });

      describe('With power saving off', function(){
        it('throws an error', function(){
          thermostat.switchPowerSaving();
          for(var i = 1; i <= 12; i++) {
            thermostat.raiseTemperature()
          };
          expect(function(){thermostat.raiseTemperature();}).toThrowError('Cannot raise temperature: At Maximum')
        });
      });
    });
  });

  describe('#lowerTemperature', function(){
    it('lowers temperature by 1', function(){
      thermostat.lowerTemperature()
      expect(thermostat.temperature).toEqual(19)
    });

    describe('When at minimum temperature:', function(){
      it('throws an error', function(){
        for(var i = 1; i <= 10; i++) {
          thermostat.lowerTemperature()
        }
        expect(function(){thermostat.lowerTemperature();}).toThrowError('Cannot lower temperature: At Minimum')
      })
    })
  });

  describe('#energyUsage', function(){
    it('returns green when at low usage', function(){
      thermostat.temperature = 17
      expect(thermostat.energyUsage()).toEqual("green")
    });

    it('returns black when at medium usage', function(){
      thermostat.temperature = 24
      expect(thermostat.energyUsage()).toEqual("black")
    });

    it('returns red when at high usage', function(){
      thermostat.temperature = 25
      expect(thermostat.energyUsage()).toEqual("red")
    });
  });
});