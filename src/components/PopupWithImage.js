import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popUpSelector) {
    super(popUpSelector);
    this._popUpImage = this._popUpElement.querySelector(
      ".modal__preview-image"
    );
    this._popUpTitle = this._popUpElement.querySelector(
      ".modal__preview-image-heading"
    );
  }

  open({ name, link }) {
    // set the image's src and alt
    this._popUpImage.src = link;
    this._popUpImage.alt = name;

    // set the caption's textContent
    this._popUpTitle.textContent = name;

    super.open();
  }
}
