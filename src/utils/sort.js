export const SortType = {
  DAY: `day`,
  DURATION: `duration`,
  PRICE: `price`,
};

export const sortByDay = (a, b) => {
  return b.eventStartTime - a.eventStartTime;
};

export const sortByPrice = (a, b) => {
  return b.cost - a.cost;
};

export const sortByTime = (a, b) => {
  return b.duration - a.duration;
};
