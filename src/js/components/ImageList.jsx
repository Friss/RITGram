import React, {addons} from 'react/addons';
import $ from 'jquery'
import _ from 'lodash';
import ImageTile from './ImageTile.jsx';
import Alert from 'react-bootstrap/lib/Alert';
import Row from 'react-bootstrap/lib/Row';
import ActionCreator from '../actions/ImageActionCreators';

const {PureRenderMixin} = addons;

export default React.createClass({
  mixins: [
    PureRenderMixin
  ],

  componentDidMount() {
    let debouncedInfiniteScroll = _.debounce(this.handleInfiniteScroll, 250)
    $(window).on("scroll", debouncedInfiniteScroll)
  },

  handleInfiniteScroll() {
    let triggerPoint = 125;
    let imagesContainer = this.refs.images_root.getDOMNode();

    if (imagesContainer.scrollTop + imagesContainer.clientHeight + triggerPoint > imagesContainer.scrollHeight) {
      ActionCreator.fetchImages(this.props.page + 1);
    }
  },

  render() {
    let {images} = this.props;
    let rowContent;

    if (images.size === 0) {
      rowContent = null
    } else {
      rowContent = images.map((image) =>
          <ImageTile
            key={image.get('id')}
            image={image} />
        )
    }

    return (
      <Row ref="images_root">
        {rowContent}
      </Row>
    );
  }
});
