import TripEventsListView from '../view/trip-events-list.js';
import TripEventsSortView from '../view/trip-events-sort.js';
import TripEventPresenter from './event.js';
import {render, RenderPosition} from "../utils/render.js";


export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._eventsListComponent = new TripEventsListView();
    this._eventsSortComponent = new TripEventsSortView();
  }

  init(tripEvents) {
    this._tripEvents = tripEvents.slice();
    this._renderTrip();
  }

  _renderEventsList() {
    render(this._tripContainer, this._eventsListComponent, RenderPosition.BEFOREEND);
  }

  _renderEvent(tripEvent) {
    const tripEventPresenter = new TripEventPresenter(this._eventsListComponent);
    tripEventPresenter.init(tripEvent);
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
}
