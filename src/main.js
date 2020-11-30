import TripSectionView from './view/trip-section.js';
import TripInfoView from './view/trip-info.js';
import TripCostView from './view/trip-cost.js';
import TripMenuView from './view/trip-menu.js';
import TripEventsFiltersView from './view/trip-events-filters.js';
import TripEventsSortView from './view/trip-events-sort.js';
import TripEventsListView from './view/trip-events-list.js';
import TripEventsItemView from './view/trip-events-item.js';
// import TripEventsEditFormView from './view/trip-events-edit-form.js';
import {generateTripEventsItem} from './mock/trip-events-item.js';
import {render, RenderPosition} from "./util.js";

const EVENTS_COUNT = 15;
const tripEvents = new Array(EVENTS_COUNT).fill().map(generateTripEventsItem).sort((a, b) => a.eventStartTime - b.eventStartTime);

const pageHeaderContainer = document.querySelector(`.page-header`);
const headerTripElement = pageHeaderContainer.querySelector(`.trip-main`);
const headerTripControls = headerTripElement.querySelector(`.trip-controls`);
const pageMainContainer = document.querySelector(`.page-main`);
const mainTripEventsContainer = pageMainContainer.querySelector(`.trip-events`);

// trip info+cost components

render(headerTripElement, new TripSectionView().getElement(), RenderPosition.AFTERBEGIN);
const headerTripInfoContainer = headerTripElement.querySelector(`.trip-main__trip-info`);
render(headerTripInfoContainer, new TripInfoView(tripEvents).getElement(), RenderPosition.BEFOREEND);
render(headerTripInfoContainer, new TripCostView(tripEvents).getElement(), RenderPosition.BEFOREEND);

// trip controls components

render(headerTripControls, new TripMenuView().getElement(), RenderPosition.BEFOREEND);
render(headerTripControls, new TripEventsFiltersView().getElement(), RenderPosition.BEFOREEND);

// trip events components

render(mainTripEventsContainer, new TripEventsSortView().getElement(), RenderPosition.BEFOREEND);
render(mainTripEventsContainer, new TripEventsListView().getElement(), RenderPosition.BEFOREEND);
const tripEventsList = mainTripEventsContainer.querySelector(`.trip-events__list`);
for (let i = 1; i < EVENTS_COUNT; i++) {
  render(tripEventsList, new TripEventsItemView(tripEvents[i]).getElement(), RenderPosition.BEFOREEND);
}

generateTripEventsItem();
