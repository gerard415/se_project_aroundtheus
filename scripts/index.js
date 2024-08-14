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

//Generic Functions
const closeModal = (modal) => {
  modal.classList.remove("modal_opened");
};

const openModal = (modal) => {
  modal.classList.add("modal_opened");
};

const renderCard = (cardData, wrapper) => {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
};

const handleProfileSubmit = (e) => {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
};

const handleAddNewCardSubmit = (e) => {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closeModal(addCardModal);
  e.target.reset();
};

//Event Listeners
profileEditButton.addEventListener("click", () => {
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
document.addEventListener("keyup", (e) => {
  const currentModal = allModals.find((modal) =>
    modal.classList.contains("modal_opened")
  );

  if (currentModal && e.key === "Escape") {
    closeModal(currentModal);
  }
});
document.addEventListener("click", (e) => {
  const currentModal = allModals.find((modal) =>
    modal.classList.contains("modal_opened")
  );

  if (currentModal && e.target.className === "modal modal_opened") {
    closeModal(currentModal);
  }
});

//Card Functions
const getCardElement = (cardData) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    openModal(previewImageModal);
    previewImage.src = cardImageEl.src;
    previewImage.alt = cardImageEl.alt;
    previewImageHeading.textContent = cardTitleEl.textContent;
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  return cardElement;
};

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
