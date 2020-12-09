import AbstractView from './abstract.js';
import {createMultipleElements} from '../utils/render.js';

const createTripEventsEmptyListTemplate = () => {
  return `
    <h2 class="visually-hidden">Trip events</h2>
    <p class="trip-events__msg">Click New Event to create your first point</p>`
  ;
};

export default class TripEventsEmptyList extends AbstractView {
  getTemplate() {
    return createTripEventsEmptyListTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createMultipleElements(this.getTemplate());
    }
    return this._element;
  }
}
