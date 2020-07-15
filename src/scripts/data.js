const errorMessages = {
  empty: 'Это обязательное поле',
  wrongLength: 'Должно быть от 2 до 30 символов',
  wrongUrl: 'Здесь должна быть ссылка',
};

const API_URL = NODE_ENV === 'production' ? 'https://praktikum.tk' : 'http://praktikum.tk';

const config = {
  url: `${API_URL}/cohort11/`,
  headers: {
    authorization: '4caa9c4f-ade8-442a-8fcf-a6c39e9fafd7',
    'Content-Type': 'application/json'
  }
};

export {errorMessages, config};