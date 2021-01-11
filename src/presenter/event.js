import TripEventsItemView from '../view/trip-events-item.js';
import TripEventsEditFormView from '../view/trip-events-edit-form.js';
import {render, replace, RenderPosition} from "../utils/render.js";


export default class TripEvent {
  constructor(eventsList) {
    this._eventsList = eventsList;

    this._tripEventComponent = null;
    this._tripEventEditComponent = null;

    this._handleEscapePress = this._handleEscapePress.bind(this);
    this._handleShowClick = this._handleShowClick.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  init(tripEvent) {
    this._tripEvent = tripEvent;
    this._tripEventComponent = new TripEventsItemView(tripEvent);
    this._tripEventEditComponent = new TripEventsEditFormView(tripEvent);

    this._tripEventComponent.setClickHandler(this._handleShowClick);
    this._tripEventEditComponent.setEditClickHandler(this._handleCloseClick);
    this._tripEventEditComponent.setFormSubmitHandler(this._handleFormSubmit);

    render(this._eventsList, this._tripEventComponent, RenderPosition.BEFOREEND);
  }

  _replaceCardToForm() {
    replace(this._tripEventEditComponent, this._tripEventComponent);
    document.addEventListener(`keydown`, this._handleEscapePress);
  }

  _replaceFormToCard() {
    replace(this._tripEventComponent, this._tripEventEditComponent);
    document.removeEventListener(`keydown`, this._handleEscapePress);
  }

  _handleEscapePress(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this._replaceFormToCard();
    }
  }

  _handleShowClick() {
    this._replaceCardToForm();
  }

  _handleCloseClick() {
    this._replaceFormToCard();
  }

  _handleFormSubmit() {
    this._replaceFormToCard();
  }
}
