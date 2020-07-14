export default class CardList {
  constructor(placesList, createCard) {
    this.placesList = placesList;
    this.createCard = createCard;
    this.addCard = this.addCard.bind(this);
  }

  addCard(place) {
    this.placesList.appendChild(this.createCard(place));
  };

  render(data) {
    data.forEach(place => {
        this.addCard(place)
      });
    };
}