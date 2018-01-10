'use strict';

(function () {
  var onPopupOpenClick = function (advert) {
    window.pin.isMap.insertBefore(window.card.renderTemplateArticle(advert), document.querySelector('.map__filters-container'));

    var popupCloseBtn = window.pin.isMap.querySelector('.popup .popup__close');

    popupCloseBtn.addEventListener('click', function () {
      onPopupCloseClick();
    });

    document.addEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    window.data.isEscPressEvent(evt, onPopupCloseClick);
  };

  var onPopupCloseClick = function () {
    var popup = document.querySelector('.popup');

    if (popup !== null) {
      popup.parentElement.removeChild(popup);
    }

    document.removeEventListener('keydown', onPopupEscPress);
    window.pin.isDeactivatePin();
  };

  document.addEventListener('keydown', onPopupEscPress);

  var showCard = function (elem, callback) {
    callback();
  };

  window.showCard = {
    showCard: showCard,
    onPopupOpenClick: onPopupOpenClick,
    onPopupCloseClick: onPopupCloseClick
  };
})();
