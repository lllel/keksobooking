'use strict';

(function () {
  var DELAY_IN_TIME = 500;

  var typeObject = window.pin.isMap.querySelector('#housing-type');
  var price = window.pin.isMap.querySelector('#housing-price');
  var quantityRooms = window.pin.isMap.querySelector('#housing-rooms');
  var quantityGuests = window.pin.isMap.querySelector('#housing-guests');
  var filterMap = window.pin.isMap.querySelector('.map__filters');

  var PriceBreakpoint = {
    LOW: 10000,
    MIDDLE: 50000
  };

  var priceRange = {
    'low': function (num) {
      return num < PriceBreakpoint.LOW;
    },
    'middle': function (num) {
      return num >= PriceBreakpoint.LOW && num <= PriceBreakpoint.MIDDLE;
    },
    'high': function (num) {
      return num > PriceBreakpoint.MIDDLE;
    }
  };

  var updatePins = function () {
    var filteredPins = window.map.pins.slice(0);

    var filterByValue = function (el, property) {
      if (el.value !== 'any') {
        filteredPins = filteredPins.filter(function (it) {
          return it.offer[property].toString() === el.value;
        });
      }
      return filteredPins;
    };

    var filterByPrice = function () {
      if (price.value !== 'any') {
        filteredPins = filteredPins.filter(function (it) {
          return priceRange[price.value](it.offer.price);
        });
      }
      return filteredPins;
    };

    var filterByFeatures = function () {
      var featuresFilters = filterMap.querySelectorAll('#housing-features [type="checkbox"]:checked');

      [].forEach.call(featuresFilters, function (item) {
        filteredPins = filteredPins.filter(function (it) {
          return it.offer.features.indexOf(item.value) >= 0;
        });
      });
      return filteredPins;
    };

    filterByValue(typeObject, 'type');
    filterByValue(quantityRooms, 'rooms');
    filterByValue(quantityGuests, 'guests');
    filterByPrice();
    filterByFeatures();
    window.map.fillMapToPins(filteredPins);
  };

  filterMap.addEventListener('change', function () {
    window.data.debounce(updatePins, DELAY_IN_TIME);
  });

  window.filter = {
    updatePins: updatePins
  };
})();
