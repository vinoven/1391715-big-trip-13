import Abstract from "../view/abstract.js";

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const render = (container, child, position) => {

  container = container instanceof Abstract ? container.getElement() : container;
  child = child instanceof Abstract ? child.getElement() : child;

  switch (position) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template.trim();

  return newElement.firstChild;
};

export const createMultipleElements = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template.trim();

  return newElement;
};
