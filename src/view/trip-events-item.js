import dayjs from "dayjs";
import AbstractView from './abstract.js';

const createTripEventItemTemplate = (tripEvent) => {
  const {type, destination, duration, eventStartTime, eventEndTime, cost, offers, isFavourite} = tripEvent;

  const parseDuration = () => {

    const minutes = duration % 60;
    const hours = parseInt(duration / 60 % 24, 10);
    const days = parseInt(duration / 60 / 24, 10);

    let formatedDays = ``;
    let formatedHours = ``;
    let formatedMinutes = ``;

    if (days > 0 && days >= 10) {
      formatedDays = days + `D`;
    } else if (days > 0 && days < 10) {
      formatedDays = `0` + days + `D`;
    }

    if (hours > 0 && hours >= 10) {
      formatedHours = hours + `H`;
    } else if (hours > 0 && hours < 10) {
      formatedHours = `0` + hours + `H`;
    } else if (days && hours === 0) {
      formatedHours = `00H`;
    }

    if (minutes > 0 && minutes >= 10) {
      formatedMinutes = minutes + `M`;
    } else if (minutes > 0 && minutes < 10) {
      formatedMinutes = `0` + minutes + `M`;
    } else if (days || hours && minutes === 0) {
      formatedMinutes = `00M`;
    }

    const parsedDuration = [
      formatedDays,
      formatedHours,
      formatedMinutes
    ];

    return parsedDuration.join(` `).trim();
  };

  const renderOffers = () => {
    return offers.filter((offer) => offer.isChecked).map(({title, offerCost}) =>
      `
      <li class="event__offer">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offerCost}</span>
        </li>
    `).join(``);
  };

  const parsedDuration = parseDuration();
  const eventOffers = renderOffers();
  const favouriteClassName = isFavourite ? `event__favorite-btn--active` : ``;

  return `
    <li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dayjs(eventStartTime).format(`YYYY-MM-DD`)}">${dayjs(eventStartTime).format(`MMM DD`)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${destination}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dayjs(eventStartTime).format(`YYYY-MM-DDTHH:mm`)}">${dayjs(eventStartTime).format(`HH:mm`)}</time>
          &mdash;
          <time class="event__end-time" datetime="${dayjs(eventEndTime).format(`YYYY-MM-DDTHH:mm`)}">${dayjs(eventEndTime).format(`HH:mm`)}</time>
        </p>
        <p class="event__duration">${parsedDuration}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${cost}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${eventOffers}
      </ul>
      <button class="event__favorite-btn ${favouriteClassName}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>
  `;
};

export default class TripEventsItem extends AbstractView {
  constructor(tripEvent) {
    super();
    this._tripEvent = tripEvent;
  }

  getTemplate() {
    return createTripEventItemTemplate(this._tripEvent);
  }
}
