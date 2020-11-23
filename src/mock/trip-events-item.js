// Точка маршрута

// Тип точки маршрута
// Пункт назначения
// Описание
// Фотографии
// Дата и время начала события
// Дата и время окончания события
// Стоимость
// Дополнительные опции
// Кнопка favourite

// Исходные данные

const EVENTS_TYPE = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeng`, `Restaurant`];
const DESCRIPTION_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus. `;
const PLACES_OF_DESTINATION = [`Amsterdam`, `Geneva`, `Chamonix`];
const SENTENCES_MIN_AMOUNT = 1;
const SENTENCES_MAX_AMOUNT = 5;

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

// Функции по генерации данных

const generateType = (availableTypes) => {
  const randomIndex = getRandomInteger(0, availableTypes.length - 1);
  return availableTypes[randomIndex];
};

const generateDestination = (places) => {
  const randomIndex = getRandomInteger(0, places.length - 1);
  return places[randomIndex];
};

const generateDescription = (text) => {
  const descriptionSentences = text.split(`. `);
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

// Генерация точки маршрута

export const generateTripEventsItem = () => {
  return {
    type: generateType(EVENTS_TYPE),
    destination: generateDestination(PLACES_OF_DESTINATION),
    description: generateDescription(DESCRIPTION_TEXT),
    photos: generatePhotos(),
    startDateTime: null,
    endDateTime: null,
    cost: null,
    offers: null,
    isFavourite: false
  };
};

