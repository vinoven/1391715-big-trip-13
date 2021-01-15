import TripSectionView from './view/trip-section.js';
import TripInfoView from './view/trip-info.js';
import TripCostView from './view/trip-cost.js';
import TripMenuView from './view/trip-menu.js';
import TripEventsFiltersView from './view/trip-events-filters.js';
import TripEventsEmptyListView from './view/trip-events-empty-list.js';
import TripPresenter from './presenter/trip.js';
import {generateTripEventsItem} from './mock/trip-events-item.js';
import {render, RenderPosition} from "./utils/render.js";

const EVENTS_COUNT = 15;
const tripEvents = new Array(EVENTS_COUNT).fill().map(generateTripEventsItem);

const pageHeaderContainer = document.querySelector(`.page-header`);
const headerTripElement = pageHeaderContainer.querySelector(`.trip-main`);
const headerTripControls = headerTripElement.querySelector(`.trip-controls`);
const pageMainContainer = document.querySelector(`.page-main`);
const mainTripEventsContainer = pageMainContainer.querySelector(`.trip-events`);

const renderOverallTripInfo = () => {
  render(headerTripElement, new TripSectionView(), RenderPosition.AFTERBEGIN);
  const headerTripInfoContainer = headerTripElement.querySelector(`.trip-main__trip-info`);
  render(headerTripInfoContainer, new TripInfoView(tripEvents), RenderPosition.BEFOREEND);
  render(headerTripInfoContainer, new TripCostView(tripEvents), RenderPosition.BEFOREEND);
};

const renderTripControls = () => {
  render(headerTripControls, new TripMenuView(), RenderPosition.BEFOREEND);
  render(headerTripControls, new TripEventsFiltersView(), RenderPosition.BEFOREEND);
};

const tripPresenter = new TripPresenter(mainTripEventsContainer);

renderTripControls();

if (tripEvents.length > 0) {
  renderOverallTripInfo();
  tripPresenter.init(tripEvents);
} else {
  render(mainTripEventsContainer, new TripEventsEmptyListView(), RenderPosition.BEFOREEND);
}
