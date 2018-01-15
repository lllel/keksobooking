'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PHOTO_MAX_WIDTH = '250';

  var fileInputs = document.querySelectorAll('input[type="file"]');
  var avatarPreview = document.querySelector('.notice__preview img');
  var photoPreview = document.querySelector('.form__photo-container');

  var imageInserting = {
    'avatar': function (imageSource) {
      avatarPreview.src = imageSource;
    },
    'images': function (imageSource) {
      var image = document.createElement('img');

      image.src = imageSource;
      image.width = PHOTO_MAX_WIDTH;
      photoPreview.appendChild(image);
    }
  };

  var onInputChange = function (evt) {
    var file = evt.target.files[0];
    var fileName = file.name;

    var isTypeCorrect = FILE_TYPES.some(function (type) {
      var regEx = new RegExp('.+\\.' + type);

      return regEx.test(fileName.toLowerCase());
    });

    if (isTypeCorrect) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imageInserting[evt.target.id](reader.result);
      });

      reader.readAsDataURL(file);
    }
  };

  fileInputs[0].name = 'avatar';
  fileInputs[1].name = 'images';

  [].forEach.call(fileInputs, function (input) {
    input.accept = '.gif, .jpg, .jpeg, .png';
    input.addEventListener('change', onInputChange);
  });
})();
