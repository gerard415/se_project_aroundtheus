export default class UserInfo {
  constructor({ name, description, avatarSelector }) {
    this._name = document.querySelector(name);
    this._description = document.querySelector(description);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._name.textContent;
    userInfo.description = this._description.textContent;
    userInfo.avatar = this._avatarElement.src;
    return userInfo;
  }

  setUserInfo({ name, description, avatar }) {
    this._name.textContent = name;
    this._description.textContent = description;
    this.setUserAvatar(avatar);
  }

  setUserAvatar(avatarUrl) {
    this._avatarElement.src = avatarUrl;
  }
}
