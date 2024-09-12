import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import {
  initialCards,
  config,
  profileFormElement,
  addCardFormElement,
  profileEditButton,
  addNewCardButton,
  profileTitleInput,
  profileDescriptionInput,
} from "../utils/constants.js";

//validators
const editProfileFormValidator = new FormValidator(config, profileFormElement);
editProfileFormValidator.enableValidation();

const addCardValidator = new FormValidator(config, addCardFormElement);
addCardValidator.enableValidation();

//new card element
const createCard = (data) => {
  const card = new Card(data, "#card-template", handleImagePreview);
  return card.getCardElement();
};

//render card elements
const cardListEl = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      cardListEl.addItem(createCard(data));
    },
  },

  ".cards__list"
);

cardListEl.renderItems();

//preview Image Modal
const previewImageModal = new PopupWithImage("#preview-image-modal");
previewImageModal.setEventListeners();

function handleImagePreview(card) {
  previewImageModal.open(card);
}

//edit profile functionality
const userInfo = new UserInfo({
  name: ".profile__title",
  description: ".profile__description",
});

const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
editProfilePopup.setEventListeners();

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileTitleInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.description;
  editProfilePopup.open();
});

function handleProfileEditSubmit(formData) {
  userInfo.setUserInfo({
    name: formData.title,
    description: formData.description,
  });
  editProfilePopup.close();
}

//add card functionality
const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);
addCardPopup.setEventListeners();

addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

function handleAddCardFormSubmit({ title, link }) {
  console.log(title, link);
  const cardData = { name: title, link: link };
  cardListEl.addItem(createCard(cardData));
  addCardPopup.close();
  addCardFormElement.reset();
  addCardValidator.disableSubmitButton();
}
