import TripSectionView from './view/trip-section.js';
import TripInfoView from './view/trip-info.js';
import TripCostView from './view/trip-cost.js';
import TripMenuView from './view/trip-menu.js';
import TripEventsFiltersView from './view/trip-events-filters.js';
import TripEventsSortView from './view/trip-events-sort.js';
import TripEventsListView from './view/trip-events-list.js';
import TripEventsItemView from './view/trip-events-item.js';
import TripEventsEditFormView from './view/trip-events-edit-form.js';
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
const tripEventsListComponent = new TripEventsListView();
render(mainTripEventsContainer, new TripEventsSortView().getElement(), RenderPosition.BEFOREEND);
render(mainTripEventsContainer, tripEventsListComponent.getElement(), RenderPosition.BEFOREEND);

const renderTripEvent = (eventsListElement, tripEvent) => {

  const tripEventComponent = new TripEventsItemView(tripEvent);
  const tripEventEditComponent = new TripEventsEditFormView(tripEvent);
  const replaceCardToEditForm = () => {
    eventsListElement.replaceChild(tripEventEditComponent.getElement(), tripEventComponent.getElement());
    document.addEventListener(`keydown`, onDocumentEscapePress);
  };

  const replaceEditFormToCard = () => {
    eventsListElement.replaceChild(tripEventComponent.getElement(), tripEventEditComponent.getElement());
  };

  const onEventCardRollupButtonClick = () => {
    replaceCardToEditForm();
  };

  const onEventEditFormRollupButtonClick = () => {
    replaceEditFormToCard();
  };

  const onEventEditFormSubmit = (evt) => {
    evt.preventDefault();
    replaceEditFormToCard();
  };

  const onDocumentEscapePress = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      replaceEditFormToCard();
      document.removeEventListener(`keydown`, onDocumentEscapePress);
    }
  };

  tripEventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, onEventCardRollupButtonClick);
  tripEventEditComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, onEventEditFormRollupButtonClick);
  tripEventEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, onEventEditFormSubmit);

  render(eventsListElement, tripEventComponent.getElement(), RenderPosition.BEFOREEND);
};

tripEvents.forEach((tripEvent) => renderTripEvent(tripEventsListComponent.getElement(), tripEvent));
