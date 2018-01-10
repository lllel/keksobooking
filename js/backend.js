'use strict';

(function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';

  var ErrorCode = {
    '400': 'Неверный запрос',
    '401': 'Необходима авторизация',
    '403': 'Доступ запрещен',
    '404': 'Запрашиваемые данные не найдены',
    '500': 'Внутренняя ошибка сервера',
    'default': 'Неизвестная ошибка'
  };

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.type = 'json';
    xhr.timeout = 10000;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);

      } else {
        onError(ErrorCode[xhr.status] || ErrorCode['default']);
      }
    });

    xhr.addEventListener('timeout', function () {
      onError('Превышено время ожидания сервера');
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соеднинения');
    });

    xhr.open('GET', SERVER_URL + '/data');
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.type = 'json';

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка отправки данных: ' + xhr.status + ' ' + xhr.statusText);
    });

    xhr.open('POST', SERVER_URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
