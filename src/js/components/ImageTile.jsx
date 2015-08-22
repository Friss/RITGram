import React, {addons} from 'react/addons';
import ActionCreator from '../actions/ImageActionCreators';
import Col from 'react-bootstrap/lib/Col';
import Icon from './Icon.jsx';

const {PureRenderMixin} = addons;

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
    let icon;

    if ( image.getIn(['full_data', 'type']) === 'video') {
      icon = <Icon onClickHandler={this.handleClick} className="video-marker" iconName="play" />
    } else {
      icon = null;
    }

    return (
      <Col md={2} className="image-entry">
        {icon}
        <a href={image.getIn(['link'])}
          target={"_blank"}
          onClick={this.handleClick}>
            <img src={image.getIn(['full_data', 'images', 'standard_resolution', 'url'])} className="img-responsive"/>
        </a>
      </Col>
    );
  }

});
