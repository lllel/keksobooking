'use strict';

(function () {
  var getImgItemElem = function (src) {
    var imgItemElem = document.querySelector('template').content.querySelector('.popup__pictures li').cloneNode(true);
    var imgElem = imgItemElem.querySelector('img');

    imgElem.src = src;
    imgElem.classList.add('popup__previews');

    imgItemElem.appendChild(imgElem);

    return imgItemElem;
  };

  var getFeaturesItemElem = function (feature) {
    var featureItem = document.createElement('li');

    featureItem.className = '';
    featureItem.classList.add('feature', 'feature--' + feature);

    return featureItem;
  };

  var renderTemplateArticle = function (object) {
    var templateArticle = document.querySelector('template').content.querySelector('article').cloneNode(true);

    templateArticle.querySelector('h3').textContent = object.offer.title;
    templateArticle.querySelector('p small').textContent = object.offer.address;
    templateArticle.querySelector('.popup__price').textContent = object.offer.price.toLocaleString('ru') + ' ' + '\u20BD' + ' / ночь';
    templateArticle.querySelector('h4').textContent = window.data.IS_TYPES[object.offer.type].ru;
    templateArticle.querySelector('h4 + p').textContent = 'Для ' + object.offer.guests + ' ' + window.data.numDecline(object.offer.guests, 'гость', 'гостей', 'гостей') + ' в ' + object.offer.rooms + ' ' + window.data.numDecline(object.offer.rooms, ' комнате', 'комнатах', 'комнат');
    templateArticle.querySelector('h4 + p + p').textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
    templateArticle.querySelector('.popup__features + p').textContent = object.offer.description;
    templateArticle.querySelector('.popup__avatar').src = object.author.avatar;
    templateArticle.querySelector('.popup__features').innerHTML = '';
    templateArticle.querySelector('.popup__features').appendChild(window.data.createElemsFragment(object.offer.features, getFeaturesItemElem));
    templateArticle.querySelector('.popup__pictures').innerHTML = '';
    templateArticle.querySelector('.popup__pictures').appendChild(window.data.createElemsFragment(object.offer.photos, getImgItemElem));

    return templateArticle;
  };

  window.card = {
    renderTemplateArticle: renderTemplateArticle
  };
})();
