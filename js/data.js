'use strict';

(function () {
  var PIN_SIZE = 40;

  var IS_TYPES = {
    'flat': {
      object: '1000',
      ru: 'Квартира'
    },
    'house': {
      object: '5000',
      ru: 'Дом'
    },
    'bungalo': {
      object: '0',
      ru: 'Бунгало'
    },
    'palace': {
      object: '10000',
      ru: 'Дворец'
    }
  };

  var ButtonKeycode = {
    ESC: 27,
    ENTER: 13
  };

  function ReadError(message, cause) {
    this.message = message;
    this.cause = cause;
    this.name = 'ReadError';
    this.stack = cause.stack;
  }

  var lastTimeout = null;

  function numDecline(num, nominative, genitiveSingular, genitivePlural) {
    if (num > 10 && (Math.round((num % 100) / 10) === 1)) {
      return genitivePlural;

    } else {
      switch (num % 10) {
        case 1:
          return nominative;

        case 2:
        case 3:
        case 4:
          return genitiveSingular;

        default:
          return genitivePlural;
      }
    }
  }

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  var getRandomArrayCopy = function (baseArr, arrLen) {
    var baseArrCopy = baseArr.slice(0);
    var newArray = [];
    var newItem;

    if (arrLen >= baseArr.length) {
      return baseArr;
    }

    while (newArray.length < arrLen) {
      newItem = baseArr[Math.floor(getRandomNumber(0, baseArrCopy.length - 1))];
      if (newArray.indexOf(newItem) !== -1) {
        continue;

      } else {
        newArray.push(newItem);
      }
    }

    return newArray;
  };

  var createElemsFragment = function (arr, action) {
    var elemsFragment = document.createDocumentFragment();

    [].forEach.call(arr, function (el, i) {
      elemsFragment.appendChild(action(el, i));
    });

    return elemsFragment;
  };

  var debounce = function (action, time) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }

    lastTimeout = setTimeout(function () {
      action();
    }, time);
  };

  window.data = {
    IS_TYPES: IS_TYPES,
    isEscPressEvent: function (evt, action) {
      if (evt.keyCode === ButtonKeycode.ESC) {

        action();
      }
    },
    isEnterPressEvent: function (evt, action) {
      if (evt.keyCode === ButtonKeycode.ENTER) {

        action();
      }
    },
    numDecline: numDecline,
    PIN_SIZE: PIN_SIZE,
    createElemsFragment: createElemsFragment,
    getRandomArrayCopy: getRandomArrayCopy,
    ReadError: ReadError,
    debounce: debounce,
    lastTimeout: lastTimeout
  };
})();
