'use strict';

(function () {
  var QUANTITY_PINS = 5;

  var typeError = {
    'URIError': function (e) {
      throw new window.data.ReadError('Ошибка в URI', e);
    },
    'RangeError': function (e) {
      throw new window.data.ReadError('Переданный параметр недосягаем', e);
    },
    'ReferenceError': function (e) {
      throw new window.data.ReadError('Ошибка разименовании неверной ссылки', e);
    },
    'SyntaxError': function (e) {
      throw new window.data.ReadError('Синтаксическая ошибка', e);
    },
    'TypeError': function (e) {
      throw new window.data.ReadError('Переменная или параметр неправильного типа', e);
    },
    'EvalError': function (e) {
      throw new window.data.ReadError('Ошибка при выполнении eval', e);
    },
    'default': function (e) {
      throw e;
    }
  };

  var mainPin = window.pin.isMapPins.querySelector('.map__pin--main');

  var LimitBreakpoint = {
    UPPER: 100,
    DOWN: 500,
    LEFT: 50,
    RIGHT: 1150
  };

  var successHandler = function (objects) {
    try {
      window.map.pins = JSON.parse(objects).slice(0);

    } catch (e) {
      if (e.name) {
        typeError[e.name](e);

      } else {
        typeError['default'](e);
      }
    }

    fillMapToPins(window.data.getRandomArrayCopy(window.map.pins, QUANTITY_PINS));
  };

  var fillMapToPins = function (pin) {
    var fragmentPins = document.createDocumentFragment();
    var children = window.pin.isMapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    var selectedPin = window.data.getRandomArrayCopy(pin, QUANTITY_PINS);

    selectedPin.forEach(function (item) {
      fragmentPins.appendChild(window.pin.renderTemplateMapPin(item));
    });

    window.showCard.onPopupCloseClick();

    [].forEach.call(children, function (it) {
      it.parentElement.removeChild(it);
    });

    window.pin.isMapPins.appendChild(fragmentPins);
  };

  var onMainPinClick = function () {
    window.backend.load(successHandler, errorHandler);
    mainPin.classList.remove('map__pin--active');

    window.form.isActiveForm();

    window.form.location.value = 'x: ' + mainPin.offsetLeft + ' ' + 'y: ' + mainPin.offsetTop;
    mainPin.removeEventListener('mouseup', onMainPinClick);
    mainPin.removeEventListener('keydown', onEnterPressClick);
  };

  var onEnterPressClick = function (evt) {
    window.data.isEnterPressEvent(evt, onMainPinClick);
  };

  mainPin.addEventListener('mouseup', onMainPinClick);
  mainPin.addEventListener('keydown', onEnterPressClick);

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');

    node.classList.add('error-text');
    node.textContent = 'Произошла ошибка отправки данных: ' + errorMessage;

    document.body.insertAdjacentElement('afterbegin', node);
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onPinMainMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (mainPin.offsetTop - shift.y < LimitBreakpoint.DOWN - window.data.PIN_SIZE && mainPin.offsetTop - shift.y > LimitBreakpoint.UPPER - window.data.PIN_SIZE) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }

      if (mainPin.offsetLeft - shift.x > LimitBreakpoint.LEFT && mainPin.offsetLeft - shift.x < LimitBreakpoint.RIGHT) {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }
      window.form.location.value = 'x: ' + mainPin.offsetLeft + ' ' + 'y: ' + mainPin.offsetTop;
    };

    var onPinMainMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onPinMainMouseMove);
      document.removeEventListener('mouseup', onPinMainMouseUp);
    };

    document.addEventListener('mousemove', onPinMainMouseMove);
    document.addEventListener('mouseup', onPinMainMouseUp);
  });

  window.map = {
    fillMapToPins: fillMapToPins
  };
})();
