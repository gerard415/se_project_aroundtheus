export default class UserInfo {
  constructor({ name, description }) {
    this._name = document.querySelector(name);
    this._description = document.querySelector(description);
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._name.textContent;
    userInfo.description = this._description.textContent;
    return userInfo;
  }

  setUserInfo({ name, description }) {
    this._name.textContent = name;
    this._description.textContent = description;
  }
}
