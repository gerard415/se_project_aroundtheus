export default class Card {
  constructor(
    cardData,
    cardSelector,
    handleImagePreview,
    handleDeleteCard,
    handleLikeClick
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id;
    this._isLiked = cardData.isLiked;
    this._cardSelector = cardSelector;
    this._handleImagePreview = handleImagePreview;
    this.handleDeleteCard = handleDeleteCard;
    this.handleLikeClick = handleLikeClick;
  }

  _setEventListeners() {
    //.card__like-button
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this.handleLikeClick(this);
      });

    //.card__delete-button
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this.handleDeleteCard(this._id, this._cardElement);
      });

    //image preview button
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImagePreview({ name: this._name, link: this._link });
      });
  }

  toggleLike() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  handleLikeButton(isLiked) {
    if (isLiked !== undefined) {
      this._isLiked = isLiked;
    }
    if (this._isLiked) {
      this.toggleLike();
    }
  }

  getCardElement() {
    const cardTemplate = document.querySelector(this._cardSelector).content
      .firstElementChild;

    this._cardElement = cardTemplate.cloneNode(true);

    const cardImage = this._cardElement.querySelector(".card__image");
    const cardTitle = this._cardElement.querySelector(".card__title");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    this.handleLikeButton(this._isLiked);

    this._setEventListeners();

    return this._cardElement;
  }
}
