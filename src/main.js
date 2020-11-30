import {createTripSectionTemplate} from './view/trip-section.js';
import {createTripInfoTemplate} from './view/trip-info.js';
import {createTripCostTemplate} from './view/trip-cost.js';
import {createTripMenuTemplate} from './view/trip-menu.js';
import {createTripFiltersTemplate} from './view/trip-filters.js';
import {createTripEventsSortTemplate} from './view/trip-events-sort.js';
import {createTripEventsListTemplate} from './view/trip-events-list.js';
import {createTripEventItemTemplate} from './view/trip-events-item.js';
import {createTripEventsEditFormTemplate} from './view/trip-events-edit-form.js';
import {generateTripEventsItem} from './mock/trip-events-item.js';
import {renderTemplate} from "./util.js";

const EVENTS_COUNT = 15;
const tripEvents = new Array(EVENTS_COUNT).fill().map(generateTripEventsItem).sort((a, b) => a.eventStartTime - b.eventStartTime);

const pageHeaderContainer = document.querySelector(`.page-header`);
const headerTripElement = pageHeaderContainer.querySelector(`.trip-main`);
const headerTripControls = headerTripElement.querySelector(`.trip-controls`);
const pageMainContainer = document.querySelector(`.page-main`);
const mainTripEventsContainer = pageMainContainer.querySelector(`.trip-events`);

// trip info+cost components

renderTemplate(headerTripElement, createTripSectionTemplate(), `afterbegin`);
const headerTripInfoContainer = headerTripElement.querySelector(`.trip-main__trip-info`);
renderTemplate(headerTripInfoContainer, createTripInfoTemplate(tripEvents), `beforeend`);
renderTemplate(headerTripInfoContainer, createTripCostTemplate(tripEvents), `beforeend`);

// trip controls components

renderTemplate(headerTripControls, createTripMenuTemplate(), `beforeend`);
renderTemplate(headerTripControls, createTripFiltersTemplate(), `beforeend`);

// trip events components

renderTemplate(mainTripEventsContainer, createTripEventsSortTemplate(), `beforeend`);
renderTemplate(mainTripEventsContainer, createTripEventsListTemplate(), `beforeend`);
const tripEventsList = mainTripEventsContainer.querySelector(`.trip-events__list`);
renderTemplate(tripEventsList, createTripEventsEditFormTemplate(tripEvents[0]), `beforeend`);
for (let i = 1; i < EVENTS_COUNT; i++) {
  renderTemplate(tripEventsList, createTripEventItemTemplate(tripEvents[i]), `beforeend`);
}

generateTripEventsItem();
