import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

//Validation
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__error",
  errorClass: "modal__error_visible",
};

const profileFormElement = document.forms["edit-profile-form"];
const addCardFormElement = document.forms["add-card-form"];

const editProfileFormValidator = new FormValidator(config, profileFormElement);
editProfileFormValidator.enableValidation();

const addCardValidator = new FormValidator(config, addCardFormElement);
addCardValidator.enableValidation();

//Template
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

//Wrappers
const cardListEl = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = addCardModal.querySelector(".modal__form");
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImage = previewImageModal.querySelector(".modal__preview-image");
const allModals = [...document.querySelectorAll(".modal")];

//Buttons and other Dom nodes
const profileEditButton = document.querySelector("#profile-edit-button");
const profileModalCloseButton = document.querySelector(
  "#profile-modal-close-button"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector(".profile__add-button");
const addNewCardCloseButton = document.querySelector(
  "#add-card-modal-close-button"
);
const previewImageModalCloseButton = document.querySelector(
  "#preview-image-modal-close-button"
);
const previewImageHeading = document.querySelector(
  ".modal__preview-image-heading"
);

//Form Data
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTitleInput = document.querySelector("#modal-title-input");
const cardUrlInput = document.querySelector("#modal-url-input");

//Functions
const closeModalEscape = (e) => {
  if (e.key === "Escape") {
    const currentModal = document.querySelector(".modal_opened");
    closeModal(currentModal);
  }
};

const closeOverlay = (e) => {
  if (e.target.className === "modal modal_opened") {
    const currentModal = document.querySelector(".modal_opened");
    closeModal(currentModal);
  }
};

const closeModal = (modal) => {
  document.removeEventListener("keydown", closeModalEscape);
  modal.removeEventListener("mousedown", closeOverlay);
  modal.classList.remove("modal_opened");
};

const openModal = (modal) => {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalEscape);
  modal.addEventListener("mousedown", closeOverlay);
};

const handleImagePreview = (card) => {
  previewImage.src = card._link;
  previewImage.alt = card._name;
  previewImageHeading.textContent = card._name;
  openModal(previewImageModal);
};

const handleProfileSubmit = (e) => {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  editProfileFormValidator.disableSubmitButton();
  closeModal(profileEditModal);
};

const handleAddNewCardSubmit = (e) => {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closeModal(addCardModal);
  e.target.reset();
  addCardValidator.resetValidation();
  addCardValidator.disableSubmitButton();
};

const renderCard = (cardData, wrapper) => {
  const card = new Card(cardData, "#card-template", handleImagePreview);
  const cardElement = card.getCardElement();
  wrapper.prepend(cardElement);
};

//Event Listeners
profileEditButton.addEventListener("click", () => {
  editProfileFormValidator.resetValidation();
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});
profileModalCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);
profileEditForm.addEventListener("submit", (e) => handleProfileSubmit(e));
addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addNewCardCloseButton.addEventListener("click", () => closeModal(addCardModal));
addCardForm.addEventListener("submit", (e) => handleAddNewCardSubmit(e));
previewImageModalCloseButton.addEventListener("click", () =>
  closeModal(previewImageModal)
);

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
