export default class Api {
  constructor(config){
    this.url = config.url;
    this.headers = config.headers;
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getCards = this.getCards.bind(this);
    this.setUserInfo = this.setUserInfo.bind(this);
    this.uploadCard = this.uploadCard.bind(this);
    this.removeCard = this.removeCard.bind(this);
    this.likeCard = this.likeCard.bind(this);
    this.unLikeCard = this.unLikeCard.bind(this);
  };

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
    };

//получение данных пользовтаеля---------------------------------
  getUserInfo() {
  return fetch(`${this.url}users/me`, {
    headers: this.headers
  })
    .then(res => this._getResponseData(res))
  }
//Получение массива карточек--------------------------------------------------------------
  getCards() {
    return fetch(`${this.url}cards`, {
      headers: this.headers
    })
    .then(res => this._getResponseData(res));
  }
//отправка данных пользователя------------------------------------------------------------
  setUserInfo(name, about) {
    return fetch(`${this.url}users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then((res) => this._getResponseData(res));
  }
//Добавление карточки------------------------------------------------------------
  uploadCard(name, link) {
    return fetch(`${this.url}cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then((res) => this._getResponseData(res));
  }
//Удаление карточки------------------------------------------------------------
  removeCard(id) {
    return fetch(`${this.url}cards/${id}`, {
      method: 'DELETE',
      headers: this.headers,
      body: JSON.stringify({
      })
    })
    .then((res) => this._getResponseData(res));
  }
// Лайк---------------------------------------------------------------------------
  likeCard(id) {
    return fetch(`${this.url}cards/like/${id}`, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify({
      })
    })
    .then((res) => this._getResponseData(res));
  }
// Анлайк---------------------------------------------------------------------------
  unLikeCard(id) {
    return fetch(`${this.url}cards/like/${id}`, {
      method: 'DELETE',
      headers: this.headers,
      body: JSON.stringify({
      })
    })
    .then((res) => this._getResponseData(res));
  }
// --------------------------------------------------------------------------------
}