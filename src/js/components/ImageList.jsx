import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import $ from 'jquery'
import _ from 'lodash';
import ImageTile from './ImageTile.jsx';
import Alert from 'react-bootstrap/lib/Alert';
import Row from 'react-bootstrap/lib/Row';
import ActionCreator from '../actions/ImageActionCreators';
import WindowListenerMixin from '../mixins/WindowListenerMixin';

const INFINITE_SCROLL_TRIGGER = 225;

export default React.createClass({
  mixins: [
    PureRenderMixin,
    WindowListenerMixin
  ],

  getWindowListeners() {
    return {
      scroll: _.debounce(this.handleInfiniteScroll, 250),
    }
  },

  handleInfiniteScroll() {
    const imagesContainer = ReactDOM.findDOMNode(this);

    if ($(window).scrollTop() >= imagesContainer.scrollHeight - window.innerHeight - INFINITE_SCROLL_TRIGGER) {
      ActionCreator.fetchImages(this.props.page + 1);
    }
  },

  render() {
    let {images} = this.props;

    return (
      <Row>
        {images.map(this.renderImage)}
      </Row>
    );
  },

  renderImage(image) {
    return (
      <ImageTile
        key={image.get('id')}
        image={image}
      />
    )
  }
});
