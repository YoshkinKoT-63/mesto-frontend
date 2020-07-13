import Popup from './Popup.js';

export default class ImagePopup extends Popup {

  showImage = (url) => {
    this.element.querySelector('.popup__image').setAttribute('src', url);
    super.open();
  };
}