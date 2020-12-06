import AbstractView from './abstract.js';

const createTripCostTemplate = (tripEvents) => {
  const initialValue = 10;
  const eventsTotalCost = tripEvents.reduce((accumulator, currentValue) => accumulator + currentValue.cost, initialValue);

  let offersTotalCost = 0;
  const tripEventsOffers = tripEvents.filter((tripEvent) => tripEvent.offers.length > 0).map((tripEvent) => tripEvent.offers);
  tripEventsOffers.forEach((offerList) => {
    offerList.forEach((offerItem) => {

      if (offerItem.isChecked) {
        offersTotalCost += offerItem.offerCost;
      }
    });
  });

  const tripTotalCost = offersTotalCost + eventsTotalCost;

  return `<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripTotalCost}</span>
</p>`;
};

export default class TripCost extends AbstractView {
  constructor(tripEvents) {
    super();
    this._tripEvents = tripEvents;
  }

  getTemplate() {
    return createTripCostTemplate(this._tripEvents);
  }
}
