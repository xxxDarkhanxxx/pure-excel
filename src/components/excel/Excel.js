import $ from '@core/dom';
import Observer from '@core/Observer';
import StoreSubscriber from '@core/StoreSubscriber';
import {updateDate} from "@/store/actions/actions";
import {preventDefault} from "@core/utils";

export default class Excel {
  constructor(options) {
    this.components = options.components || [];
    this.observer = new Observer();
    this.store = options.store;
    this.subscriber = new StoreSubscriber(this.store);
  }

  getRoot() {
    const $root = $.create('div', 'excel');
    const componentOptions = {
      observer: this.observer,
      store: this.store,
    };

    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className);
      const component = new Component($el, componentOptions);
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });

    return $root;
  }

  init() {
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'production') {
      document.addEventListener('contextmenu', preventDefault);
    }
    this.store.dispatch(updateDate());
    this.subscriber.subscribeComponents(this.components);
    this.components.forEach((component) => component.init());
  }

  destroy() {
    this.subscriber.unsubscribeFromStore();
    this.components.forEach((comp) => comp.destroy());
    document.removeEventListener('contextmenu', preventDefault);
  }
}
