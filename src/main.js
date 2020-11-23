import {createTripSectionTemplate} from './view/trip-section.js';
import {createTripInfoTemplate} from './view/trip-info.js';
import {createTripCostTemplate} from './view/trip-cost.js';
import {createTripMenuTemplate} from './view/trip-menu.js';
import {createTripFiltersTemplate} from './view/trip-filters.js';
import {createTripEventsSortTemplate} from './view/trip-events-sort.js';
import {createTripEventsListTemplate} from './view/trip-events-list.js';
import {createTripEventItemTemplate} from './view/trip-events-item.js';
import {createTripEventsAddFormTemplate} from './view/trip-events-add-form.js';
import {createTripEventsEditFormTemplate} from './view/trip-events-edit-form.js';
import {generateTripEventsItem} from './mock/trip-events-item.js';

const EVENTS_COUNT = 3;
const pageHeaderContainer = document.querySelector(`.page-header`);
const headerTripElement = pageHeaderContainer.querySelector(`.trip-main`);
const headerTripControls = headerTripElement.querySelector(`.trip-controls`);
const pageMainContainer = document.querySelector(`.page-main`);
const mainTripEventsContainer = pageMainContainer.querySelector(`.trip-events`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// trip info+cost components

render(headerTripElement, createTripSectionTemplate(), `afterbegin`);
const headerTripInfoContainer = headerTripElement.querySelector(`.trip-main__trip-info`);
render(headerTripInfoContainer, createTripInfoTemplate(), `beforeend`);
render(headerTripInfoContainer, createTripCostTemplate(), `beforeend`);

// trip controls components

render(headerTripControls, createTripMenuTemplate(), `beforeend`);
render(headerTripControls, createTripFiltersTemplate(), `beforeend`);

// trip events components

render(mainTripEventsContainer, createTripEventsSortTemplate(), `beforeend`);
render(mainTripEventsContainer, createTripEventsListTemplate(), `beforeend`);
const tripEventsList = mainTripEventsContainer.querySelector(`.trip-events__list`);
render(tripEventsList, createTripEventsEditFormTemplate(), `beforeend`);
render(tripEventsList, createTripEventsAddFormTemplate(), `beforeend`);
for (let i = 0; i < EVENTS_COUNT; i++) {
  render(tripEventsList, createTripEventItemTemplate(), `beforeend`);
}

generateTripEventsItem();
