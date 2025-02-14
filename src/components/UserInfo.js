export default class UserInfo {
  constructor({ nameElement, jobElement, avatarElement }) {
    this._nameElement = document.querySelector(nameElement);
    this._jobElement = document.querySelector(jobElement);
    this._avatarElement = document.querySelector(avatarElement);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._jobElement.textContent,
      avatar: this._avatarElement ? this._avatarElement.src : "",
    };
  }

  setUserInfo({ name, about, avatar }) {
    if (name) this._nameElement.textContent = name;
    if (about) this._jobElement.textContent = about;
    if (avatar && this._avatarElement) {
      this._avatarElement.src = avatar;
    }
  }
}
