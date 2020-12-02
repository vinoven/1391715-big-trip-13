import dayjs from "dayjs";
import {createElement} from '../util.js';

const createTripInfoTemplate = (tripEvents) => {

  const renderTripTitle = () => {
    const tripRouteSet = new Set(tripEvents.map((tripEvent) => {
      return tripEvent.destination;
    }));

    const tripRoute = Array.from(tripRouteSet);
    const tripStartPoint = tripRoute[0];
    const tripEndPoint = tripRoute[tripRoute.length - 1];
    if (tripRoute.length > 3) {
      return `<h1 class="trip-info__title">${tripStartPoint + ` &mdash; ... &mdash; ` + tripEndPoint}</h1>`;
    }

    return `<h1 class="trip-info__title">${tripRoute.join(` &mdash; `)}</h1>`;
  };

  const tripStartDate = dayjs(tripEvents[0].eventStartTime).format(`MMM DD`).toUpperCase();
  const tripEndDate = [...tripEvents].sort((a, b) => b.eventEndTime - a.eventEndTime)[0].eventEndTime;
  const tripTitleTemplate = renderTripTitle();

  return `<div class="trip-info__main">
  ${tripTitleTemplate}
  <p class="trip-info__dates">${dayjs(tripStartDate).format(`MMM DD`)}&nbsp;&mdash;&nbsp;${dayjs(tripEndDate).format(`MMM DD`)}</p>
</div>`;
};

export default class TripInfo {
  constructor(tripEvents) {
    this._tripEvents = tripEvents;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate(this._tripEvents);
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
