'use strict';

class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    } else {
      return this.$el.outerHTMl.trim();
    }
  }

  text(text) {
    if (typeof text !== 'undefined' || typeof text === 'string' || typeof text === 'number') {
      this.$el.textContent = text;
      return this;
    }

    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim();
    }

    return this.$el.textContent.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }

    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }
    return this;
  }

  on(eventType, cb) {
    this.$el.addEventListener(eventType, cb);
  }

  off(eventType, cb) {
    this.$el.removeEventListener(eventType, cb);
  }

  parent(selector) {
    return $(this.$el.closest(selector));
  }

  getCoordinates() {
    return this.$el.getBoundingClientRect();
  }

  get dataset() {
    return this.$el.dataset;
  }

  find(sel) {
    return $(this.$el.querySelector(sel));
  }

  findAll(sel) {
    return this.$el.querySelectorAll(sel);
  }

  /* 
    {
      width: 100%,
      bgColor: red
    }
  */
  css(styles = {}) {
    Object.keys(styles).forEach((key) => (this.$el.style[key] = styles[key]));
  }

  getStyles(styles = []) {
    return styles.reduce((res, s) => {
      res[s] = this.$el.style[s];
      return res;
    }, {});
  }

  addClass(...className) {
    this.$el.classList.add(...className);
    return this;
  }

  removeClass(...className) {
    this.$el.classList.remove(...className);
    return this;
  }

  hasClass(sel) {
    if (this.$el.classList.contains(sel)) {
      return true;
    }
    return false;
  }

  id(parse) {
    if (parse) {
      const parsed = this.id().split(':');
      return {
        row: +parsed[0],
        col: +parsed[1],
      };
    }
    return this.dataset.id;
  }

  focus() {
    this.$el.focus();
    return this;
  }

  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value);
      return this;
    }
    return this.$el.getAttribute(name);
  }
}

export default function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }

  return $(el);
};
