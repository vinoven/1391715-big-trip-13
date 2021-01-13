import TripEventsItemView from '../view/trip-events-item.js';
import TripEventsEditFormView from '../view/trip-events-edit-form.js';
import {render, replace, remove, RenderPosition} from "../utils/render.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class TripEvent {
  constructor(eventsList, changeData, changeMode) {
    this._eventsList = eventsList;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._tripEventComponent = null;
    this._tripEventEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleEscapePress = this._handleEscapePress.bind(this);
    this._handleShowClick = this._handleShowClick.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
    this._handleFavouriteClick = this._handleFavouriteClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  init(tripEvent) {
    this._tripEvent = tripEvent;

    const prevTripEventComponent = this._tripEventComponent;
    const prevTripEventEditComponent = this._tripEventEditComponent;

    this._tripEventComponent = new TripEventsItemView(tripEvent);
    this._tripEventEditComponent = new TripEventsEditFormView(tripEvent);

    this._tripEventComponent.setClickHandler(this._handleShowClick);
    this._tripEventComponent.setFavouriteClickHandler(this._handleFavouriteClick);
    this._tripEventEditComponent.setEditClickHandler(this._handleCloseClick);
    this._tripEventEditComponent.setFormSubmitHandler(this._handleFormSubmit);

    if (prevTripEventComponent === null || prevTripEventEditComponent === null) {
      render(this._eventsList, this._tripEventComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._tripEventComponent, prevTripEventComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._tripEventEditComponent, prevTripEventEditComponent);
    }

    remove(prevTripEventComponent);
    remove(prevTripEventEditComponent);
  }

  destroy() {
    remove(this._tripEventComponent);
    remove(this._tripEventEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToCard();
    }
  }

  _replaceCardToForm() {
    replace(this._tripEventEditComponent, this._tripEventComponent);
    document.addEventListener(`keydown`, this._handleEscapePress);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._tripEventComponent, this._tripEventEditComponent);
    document.removeEventListener(`keydown`, this._handleEscapePress);
    this._mode = Mode.DEFAULT;
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

  _handleFavouriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._tripEvent,
            {
              isFavourite: !this._tripEvent.isFavourite
            }
        )
    );
  }

  _handleFormSubmit() {
    // this._changeData();
    this._replaceFormToCard();
  }
}
