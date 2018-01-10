'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');

  var renderTemplateMapPin = function (object) {
    var templateMapPin = document.querySelector('template').content.querySelector('.map__pin').cloneNode(true);

    templateMapPin.style.left = object.location.x + 'px';
    templateMapPin.style.top = object.location.y + 'px';
    templateMapPin.querySelector('img').src = object.author.avatar;

    templateMapPin.addEventListener('click', function (evt) {
      onPinClick(evt, object);
    });

    return templateMapPin;
  };

  var onPinClick = function (evt, advert) {
    var evtTarget = evt.target;

    if (evtTarget.tagName === 'IMG') {
      evtTarget = evtTarget.parentElement;
    }

    var addCard = function () {
      window.showCard.onPopupCloseClick();
      window.showCard.onPopupOpenClick(advert);
    };

    window.showCard.showCard(window.pin.isMap, addCard);

    evtTarget.classList.add('map__pin--active');

    window.pin.isMapPins.removeEventListener('click', onPinClick);
  };

  window.pin = {
    isDeactivatePin: function () {
      var activePin = mapPins.querySelector('.map__pin--active');

      if (activePin !== null) {
        activePin.classList.remove('map__pin--active');
      }
    },
    isMap: map,
    isMapPins: mapPins,
    renderTemplateMapPin: renderTemplateMapPin,
    onPinClick: onPinClick
  };
})();
