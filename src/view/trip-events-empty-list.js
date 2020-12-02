import {createMultipleElements} from '../util.js';

const createTripEventsEmptyListTemplate = () => {
  return `
    <h2 class="visually-hidden">Trip events</h2>
    <p class="trip-events__msg">Click New Event to create your first point</p>`
  ;
};

export default class TripEventsEmptyList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripEventsEmptyListTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createMultipleElements(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
