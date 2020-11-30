import {createElement} from '../util.js';

const createTripSectionTemplate = () => {
  return `<section class="trip-main__trip-info  trip-info">
</section>`;
};

export default class TripSection {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripSectionTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
