'use strict';

import AddPlacePopup from './scripts/AddPlacePopup.js';
import Api from './scripts/Api.js';
import Card from './scripts/Card.js';
import CardList from './scripts/Cardlist.js';
import {errorMessages, config} from './scripts/data.js';
import FormValidator from './scripts/Formvalidator.js';
import ImagePopup from './scripts/ImagePopup.js';
import UserInfo from './scripts/UserInfo.js';
import UserInfoPopup from './scripts/UserInfoPopup.js';

//-------------------------------------------------------------------------------------------------------
//переменные
const placesList = document.querySelector('.places-list'); //контейнер с карточками
const popupAddPlace = document.querySelector('.popup_type_add-place'); // всплывающее окно добавления карточки
const popupEditProfile = document.querySelector('.popup_type_edit-info'); // всплывающее окно редактирования профиля
const popupImage = document.querySelector('.popup_type_image'); //всплывающее окно с изображением
const addPlaceButton = document.querySelector('.user-info__button'); //кнопка "+" добавления карточки
const editInfoButton = document.querySelector('.user-info__edit-button'); //кнопка "Edit"
const userName = document.querySelector('.user-info__name');//имя пользователя
const userAbout = document.querySelector('.user-info__job');//род деятельности пользователя
const userAvatar = document.querySelector('.user-info__photo');// фото/аватар пользователя
const addPlacePopupButton = document.querySelector('.popup__button_add-place'); //кнопка "+" формы ввода
const popupForm = document.forms.new;//форма ввода новой карточки
const formProfile = document.forms.profile;//форма редактирования профиля
let userId = null;


//-------------------------------------------------------------------------------------------------------
//Объекты
const api = new Api(config);
const userInfo = new UserInfo(userName, userAbout, userAvatar);
const editProfileFormValidator = new FormValidator(formProfile, errorMessages);
const addPlaceFormValidator = new FormValidator(popupForm, errorMessages);
const cardList = new CardList(placesList, createCard);
const addPlacePopup = new AddPlacePopup (popupAddPlace, addPlaceButton, popupForm, cardList, addPlaceFormValidator, api);
const editProfilePopup = new UserInfoPopup(popupEditProfile, editInfoButton, formProfile, userInfo, editProfileFormValidator, api);
const imagePopupClass = new ImagePopup(popupImage);

//--------------------------------------------------------------------------------------------------------
//Функции

// добавление карты
function createCard(place) {
  const newCard = new Card(place, showCard, api, userId);
  return newCard.create();
} 

function showCard(url) {
  imagePopupClass.showImage(url);
} 

//--------------------------------------------------------------------------------------------------------
//Обработчики событий
addPlacePopup.setEventListeners();
editProfilePopup.setEventListeners();
imagePopupClass.setEventListeners();
editProfileFormValidator.setEventListeners();
addPlaceFormValidator.setEventListeners();

//--------------------------------------------------------------------------------------------------------
//вызов функций
Promise.all([
  api.getUserInfo(),
  api.getCards()
  ])
.then(values => {
  const [userData, cards] = values;
  userId = userData._id;
  userInfo.updateUserInfo(userData);
  userInfo.updateUserAvatar(userData);
  cardList.render(cards);
})
.catch((err) => {
  console.log(err);
})
