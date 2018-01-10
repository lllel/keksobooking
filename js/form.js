'use strict';

(function () {
  var ROOMS_CAPACITY = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };

  var form = document.querySelector('.notice__form');
  var fieldsets = document.querySelectorAll('fieldset');
  var selectTimein = form.querySelector('#timein');
  var selectTimeout = form.querySelector('#timeout');
  var selectType = form.querySelector('#type');
  var selectPrice = form.querySelector('#price');
  var selectRoomNumber = form.querySelector('#room_number');
  var selectCapacity = form.querySelector('#capacity');
  var selectTitle = form.querySelector('#title');
  var buttonSubmit = form.querySelector('.form__submit');
  var map = document.querySelector('.map');
  var location = document.querySelector('#address');

  var syncValues = function (formElement1, formElement2) {
    formElement2.value = formElement1.value;
  };

  var syncValueWithMin = function (formElement1, formElement2) {
    var value = window.data.IS_TYPES[formElement1.value].object;

    formElement2.min = value;
    formElement2.placeholder = value;
  };

  function onRoomNumberChange() {
    if (selectCapacity.options.length > 0) {
      [].forEach.call(selectCapacity.options, function (item) {
        item.selected = (ROOMS_CAPACITY[selectRoomNumber.value][0] === item.value);
        item.hidden = (ROOMS_CAPACITY[selectRoomNumber.value].indexOf(item.value) >= 0) ? false : true;
      });
    }
  }

  onRoomNumberChange();

  var disabledForm = function () {
    for (var n = 0; n < fieldsets.length; n++) {
      fieldsets[n].disabled = true;
    }

    form.classList.add('notice__form--disabled');
  };

  disabledForm();

  var onFieldsInvalid = function () {
    if (selectPrice.checkValidity() === false) {
      selectPrice.style.borderColor = 'red';

    } else if (selectTitle.checkValidity() === false) {
      selectTitle.style.borderColor = 'red';

    }
  };

  var successHandler = function () {
    form.reset();
    onRoomNumberChange();

    location.value = 'x: ' + window.pin.mainPin.offsetLeft + ' ' + 'y: ' + window.pin.mainPin.offsetTop;

    var node = document.createElement('div');

    node.classList.add('error-text');
    node.textContent = 'Данные успешно отправлены';

    document.body.insertAdjacentElement('afterbegin', node);

    setTimeout(function () {
      node.classList.remove('error-text');
    }, 3000);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');

    node.classList.add('error-text');
    node.textContent = 'Произошла ошибка отправки данных: ' + errorMessage;

    document.body.insertAdjacentElement('afterbegin', node);
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(form), successHandler, errorHandler);
  });

  selectTimein.addEventListener('change', function () {
    window.synchronizeFields(selectTimein, selectTimeout, syncValues);
  });

  selectTimeout.addEventListener('change', function () {
    window.synchronizeFields(selectTimeout, selectTimein, syncValues);
  });

  selectType.addEventListener('change', function () {
    window.synchronizeFields(selectType, selectPrice, syncValueWithMin);
  });

  buttonSubmit.addEventListener('click', onFieldsInvalid);
  selectRoomNumber.addEventListener('change', onRoomNumberChange);

  window.form = {
    isActiveForm: function () {
      form.classList.remove('notice__form--disabled');
      map.classList.remove('map--faded');

      for (var j = 0; j < fieldsets.length; j++) {
        fieldsets[j].disabled = false;
      }
    },
    location: location
  };
})();
