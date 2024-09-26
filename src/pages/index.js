import Api from "../components/API.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupConfirmation from "../components/PopupConfirmation.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import {
  config,
  profileFormElement,
  addCardFormElement,
  profileEditButton,
  addNewCardButton,
  profileTitleInput,
  profileDescriptionInput,
  editAvatarButton,
  avatarEditFormElement,
} from "../utils/constants.js";

// Api
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c00d25e4-e498-4e3f-a0a9-735cb37a7bb4",
    "Content-Type": "application/json",
  },
});

//validators
const editProfileFormValidator = new FormValidator(config, profileFormElement);
editProfileFormValidator.enableValidation();

const addCardValidator = new FormValidator(config, addCardFormElement);
addCardValidator.enableValidation();

const avatarFormValidator = new FormValidator(config, avatarEditFormElement);
avatarFormValidator.enableValidation();

//CARD FUNCTIONS

//get initial cards
let section;
api
  .getInitialCards()
  .then((cards) => {
    section = new Section(
      {
        items: cards,
        renderer: (cardData) => {
          const cardElement = createCard(cardData);
          section.addItem(cardElement);
        },
      },
      ".cards__list"
    );

    section.renderItems();
  })
  .catch((err) => console.error(err));

//like and dislike a card
function handleLikeClick(card) {
  if (card.isLiked) {
    api
      .dislikeCard(card.id)
      .then(() => {
        card.toggleLike();
        card.isLiked = false;
      })
      .catch((err) => {
        console.error(`Error on Card Dislike ${err}`);
      });
  } else {
    api
      .likeCard(card.id)
      .then(() => {
        card.toggleLike();
        card.isLiked = true;
      })
      .catch((err) => {
        console.error(`Error on Card Like ${err}`);
      });
  }
}

//add card functionality
const createCard = (data) => {
  const card = new Card(
    data,
    "#card-template",
    handleImagePreview,
    handleDeleteCard,
    handleLikeClick
  );
  return card.getCardElement();
};

const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);
addCardPopup.setEventListeners();

addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

function handleAddCardFormSubmit(data) {
  const name = data.title.trim();
  const link = data.link.trim();

  api
    .createCard({ name, link })
    .then((res) => {
      const card = createCard(res);
      section.addItem(card);
      addCardPopup.close();
      addCardFormElement.reset();
      addCardValidator.disableSubmitButton();
    })
    .finally(() => {
      addCardPopup.setLoading(false);
    });
}

//preview card image functionality
const previewImageModal = new PopupWithImage("#preview-image-modal");
previewImageModal.setEventListeners();

function handleImagePreview(card) {
  previewImageModal.open(card);
}

//delete card functionality
function handleDeleteCard(cardId, cardElement) {
  deleteModalConfirmation.open(cardId, cardElement);
}

const deleteModalConfirmation = new PopupConfirmation(
  "#modal-confirm",
  (cardId, cardElement) => {
    return api.deleteCard(cardId).then(() => {
      cardElement.remove();
    });
  }
);

//USER INFO FUNCTIONS

//get user info
const userInfo = new UserInfo({
  name: ".profile__title",
  description: ".profile__description",
  avatarSelector: ".profile__image",
});

api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
      avatar: userData.avatar,
    });
  })
  .catch((err) => console.error(err));

//edit profile functionality
const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
editProfilePopup.setEventListeners();

function handleProfileEditSubmit(data) {
  api
    .editUserInfo({
      name: data.title,
      about: data.description,
    })
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        description: userData.about,
        avatar: userData.avatar,
      });
      editProfilePopup.close();
    })
    .catch((err) => console.error(`Failed to update users info: ${err}`))
    .finally(() => {
      editProfilePopup.setLoading(false);
    });
}

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileTitleInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.description;
  editProfilePopup.open();
});

// edit user avatar functionality
const editAvatarModal = new PopupWithForm(
  "#edit-avatar-modal",
  handleAvatarEditFormSubmit
);
editAvatarModal.setEventListeners();

editAvatarButton.addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  editAvatarModal.open();
});

function handleAvatarEditFormSubmit(formData) {
  const avatarUrl = formData.avatar;

  api
    .editUserAvatar(avatarUrl)
    .then((userData) => {
      userInfo.setUserAvatar(userData.avatar);
      avatarEditFormElement.reset();
      editAvatarModal.close();
    })
    .finally(() => {
      editAvatarModal.setLoading(false);
    });
}
