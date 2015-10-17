import React, {PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ActionCreator from '../actions/ImageActionCreators';
import Col from 'react-bootstrap/lib/Col';
import Icon from './Icon.jsx';

export default React.createClass({
  mixins: [
    PureRenderMixin
  ],

  handleClick(evt) {
    evt.preventDefault();
    ActionCreator.selectImage(this.props.image);
  },

  render() {
    const {image} = this.props;

    return (
      <Col
        md={2}
        xs={4}
        className="image-entry"
      >
        {this.renderIcon()}
        <a
          href={image.getIn(['link'])}
          target={"_blank"}
          onClick={this.handleClick}
        >
          <img
            src={image.getIn(['full_data', 'images', 'standard_resolution', 'url'])}
            className="img-responsive"
          />
        </a>
      </Col>
    );
  },

  renderIcon() {
    const {image} = this.props;

    if (image.getIn(['full_data', 'type']) !== 'video') {
      return null
    }

    return (
      <Icon
        onClickHandler={this.handleClick}
        className="video-marker"
        iconName="play"
      />
    )
  }

});
