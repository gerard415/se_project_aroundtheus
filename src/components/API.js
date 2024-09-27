export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  // CARD FUNCTIONS

  // Get initial cards
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "GET",
    })
      .then(this._getResponse)
      .catch((err) => console.error(err));
  }

  //Adding a new card
  createCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(card),
    })
      .then(this._getResponse)
      .catch((err) => console.error(err));
  }

  // Deleting a card
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    })
      .then(this._getResponse)
      .catch((err) => console.error(err));
  }

  // Liking and disliking cards
  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: "PUT",
    })
      .then(this._getResponse)
      .catch((err) => console.error(err));
  }

  dislikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: "DELETE",
    })
      .then(this._getResponse)
      .catch((err) => console.error(err));
  }

  // USER INFO FUNCTIONS

  //Getting user info
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "GET",
    })
      .then(this._getResponse)
      .catch((err) => console.error(err));
  }

  // Editing user info
  editUserInfo(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify(userData),
    })
      .then(this._getResponse)
      .catch((err) => console.error(err));
  }

  // Editing user avatar
  editUserAvatar(avatarUrl) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({ avatar: avatarUrl }),
    })
      .then(this._getResponse)
      .catch((err) => console.error(err));
  }
}
