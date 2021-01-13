import TripEventsListView from '../view/trip-events-list.js';
import TripEventsSortView from '../view/trip-events-sort.js';
import TripEventPresenter from './event.js';
import {render, RenderPosition} from "../utils/render.js";
import {updateItem} from "../utils/common.js";


export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._eventPresenter = {};

    this._eventsListComponent = new TripEventsListView();
    this._eventsSortComponent = new TripEventsSortView();

    this._tripEventChangeHandler = this._tripEventChangeHandler.bind(this);
    this._modeChangeHandler = this._modeChangeHandler.bind(this);
  }

  init(tripEvents) {
    this._tripEvents = tripEvents.slice();
    this._renderTrip();
  }

  _tripEventChangeHandler(updatedEvent) {
    this._tripEvents = updateItem(this._tripEvents, updatedEvent);
    this._eventPresenter[updatedEvent.id].init(updatedEvent);
  }

  _modeChangeHandler() {
    Object
    .values(this._eventPresenter)
    .forEach((presenter) => presenter.resetView());
  }

  _renderEventsList() {
    render(this._tripContainer, this._eventsListComponent, RenderPosition.BEFOREEND);
  }

  _renderEvent(tripEvent) {
    const tripEventPresenter = new TripEventPresenter(this._eventsListComponent, this._tripEventChangeHandler, this._modeChangeHandler);
    tripEventPresenter.init(tripEvent);
    this._eventPresenter[tripEvent.id] = tripEventPresenter;
  }

  _renderEvents() {
    this._tripEvents.forEach((tripEvent) => this._renderEvent(tripEvent));
  }

  _renderSort() {
    render(this._tripContainer, this._eventsSortComponent, RenderPosition.BEFOREEND);
  }

  _renderTrip() {
    this._renderSort();
    this._renderEventsList();
    this._renderEvents();
  }

  _clearEventsList() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};

  }
}
