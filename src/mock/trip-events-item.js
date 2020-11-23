import dayjs from "dayjs";

// Служебные функции
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const shuffleArray = (arr) => {
  const shuffledArray = arr.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const getRandomTimeGap = () => {
  return getRandomInteger(30, 360);
};

// Функции по генерации данных

const generateType = () => {
  const EVENTS_TYPE = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeng`, `Restaurant`];

  const randomIndex = getRandomInteger(0, EVENTS_TYPE.length - 1);
  return EVENTS_TYPE[randomIndex];
};

const generateDestination = () => {
  const PLACES_OF_DESTINATION = [`Amsterdam`, `Geneva`, `Chamonix`];

  const randomIndex = getRandomInteger(0, PLACES_OF_DESTINATION.length - 1);
  return PLACES_OF_DESTINATION[randomIndex];
};

const generateDescription = () => {
  const DESCRIPTION_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus. `;
  const SENTENCES_MIN_AMOUNT = 1;
  const SENTENCES_MAX_AMOUNT = 5;

  const descriptionSentences = DESCRIPTION_TEXT.split(`. `);
  const amountOfSentences = getRandomInteger(SENTENCES_MIN_AMOUNT, SENTENCES_MAX_AMOUNT);
  const description = shuffleArray(descriptionSentences).slice(0, amountOfSentences).join(`. `) + `.`;
  return description;
};

const generatePhotos = () => {
  const amountOfPhotos = getRandomInteger(1, 4);
  const photosArray = new Array(amountOfPhotos);

  for (let i = 0; i < photosArray.length; i++) {
    photosArray[i] = `http://picsum.photos/248/152?r=${Math.random()}`;
  }

  return photosArray;
};

const generateEventCost = () => {
  const cost = getRandomInteger(100, 5000);
  return cost;
};

const generateOffers = () => {
  const offers = [`Add luggage`, `Switch to comfort`, `Add meal`, `Chose seats`, `Travel by train`];
  const numberOfOffers = getRandomInteger(0, offers.length - 1);
  const generatedOffers = shuffleArray(offers).slice(0, numberOfOffers);
  return generatedOffers;
};

const randomizeFavouriteFlag = () => {
  return Boolean(getRandomInteger(0, 1));
};

const getEventStartTime = () => {
  const gap = 24;
  const gapInHours = getRandomInteger(-gap, gap);
  return dayjs().add(gapInHours, `hour`).toDate();
};

const getEventEndTime = (startTime, duration) => {
  return dayjs(startTime).add(duration, `minute`).toDate();
};

// Генерация точки маршрута

export const generateTripEventsItem = () => {

  const type = generateType();
  const destination = generateDestination();
  const description = generateDescription();
  const photos = generatePhotos();
  const eventStartTime = getEventStartTime();
  const duration = getRandomTimeGap();
  const eventEndTime = getEventEndTime(eventStartTime, duration);
  const cost = generateEventCost();
  const offers = generateOffers();
  const isFavourite = randomizeFavouriteFlag();

  return {
    type,
    destination,
    description,
    photos,
    eventStartTime,
    eventEndTime,
    cost,
    offers,
    isFavourite
  };
};

