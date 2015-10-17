import React, {PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import ImageList from './ImageList.jsx';
import Icon from './Icon.jsx';
import ImageModal from './ImageModal.jsx';

export default React.createClass({
  mixins: [
    PureRenderMixin
  ],

  propTypes: {
    images: PropTypes.object.isRequired,
    page: PropTypes.number.isRequired,
    activeImage: PropTypes.object
  },

  render() {
    const {images, page, activeImage} = this.props;

    return (
      <div className="container">
        <h1 className="text-primary">RITGrams</h1>
        <h3>
          <span>Instagrams taken within <sup>1</sup>&frasl;<sub>2</sub> mile of</span>
          <Icon iconName="map-marker" />
          <span>(43.0839453, -77.6746385)</span>
        </h3>

        <ImageList
          images={images}
          page={page}
        />

        <ImageModal activeImage={activeImage} />

      </div>
    );
  }
});
