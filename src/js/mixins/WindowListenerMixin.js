import { each } from 'lodash';
import $ from 'jQuery';

const $window = $(window);

export default {
  componentDidMount() {
    this._windowListeners = this.getWindowListeners();
    each(this._windowListeners, (handler, eventName) => {
      $window.on(eventName, handler);
    });
  },

  componentWillUnmount() {
    each(
      this._windowListeners,
      (handler, eventName) => $window.off(eventName, handler)
    );
  },
};
