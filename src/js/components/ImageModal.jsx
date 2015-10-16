import React, {addons} from 'react/addons';
import Autolinker from '../vendor/autolinker'
import moment from 'moment';
import $ from 'jquery';
import _ from 'lodash';

import Modal from 'react-bootstrap/lib/Modal';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import ActionCreators from '../actions/ImageActionCreators';
import Icon from './Icon.jsx';
import {ESC, LEFT, RIGHT} from '../constants/keyCodes';

const {PureRenderMixin} = addons;
const {each} = _;
const autoLinker = new Autolinker({hashtag: 'instagram', twitter: false});
const $window = $(window);

export default React.createClass({
  mixins: [
    PureRenderMixin
  ],

  componentDidMount() {
    this._windowListeners = this.getWindowListeners()
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

  getInitialState() {
    return {videoPlaying: false}
  },

  getWindowListeners() {
    return {
      keyup: this.handleWindowKeyUp,
    }
  },

  handleModalClose() {
    ActionCreators.selectImage(null)
  },

  handlePrevImage() {
    ActionCreators.selectPreviousImage()
  },

  handleNextImage() {
    ActionCreators.selectNextImage(null)
  },

  handleWindowKeyUp({keyCode}) {
    switch(keyCode) {
      case ESC:
        return this.handleModalClose();
      case LEFT:
        return this.handlePrevImage();
      case RIGHT:
        return this.handleNextImage();
    }
  },

  handleVideoClick() {
    const {videoPlaying} = this.state;
    const video = this.refs.insta_video.getDOMNode();
    if (videoPlaying) {
      video.pause();
    } else {
      video.play();
      video.addEventListener('ended', this.handleVideoEnd, false);
    }

    this.setState({videoPlaying: !videoPlaying});

  },

  handleVideoEnd() {
    const video = this.refs.insta_video.getDOMNode();
    video.currentTime = 0;
    this.setState({videoPlaying: false});
  },

  render() {
    const {activeImage} = this.props;
    const showModal = activeImage ? true : false;

    if (showModal){
      return (
        <Modal bsSize='large' className={"insta-"+activeImage.getIn(['full_data', 'type'])} show={showModal} onHide={this.handleModalClose}>
          <Icon className="close-modal" onClickHandler={this.handleModalClose} iconName="times" />
          <Row>
            <Col xs={8}>
              {this.renderMedia()}
            </Col>
            <Col xs={4}>
              <div className="modal-title">
                {this.renderUser()}
                {this.renderInstaInformation()}
              </div>
              <div className="modal-text">
                {this.renderBody()}
              </div>
            </Col>
          </Row>
          <Icon className="prev-image" onClickHandler={this.handlePrevImage} iconName="arrow-left" />
          <Icon className="next-image" onClickHandler={this.handleNextImage} iconName="arrow-right" />
        </Modal>
      )
    } else {
      return null;
    }
  },

  renderMedia() {
    const {activeImage} = this.props;
    const {videoPlaying} = this.state;
    let media;

    if (activeImage.getIn(['full_data', 'type']) === "image") {
      media = <img src={activeImage.getIn(['full_data', 'images', 'standard_resolution', 'url'])} className="img-responsive"/>
    } else {
      let playButtonClasses = "modal-video-marker"
      if (videoPlaying){
        playButtonClasses += " hidden"
      }
      media = <div>
          <Icon onClickHandler={this.handleVideoClick} className={playButtonClasses} iconName="play" />
          <video
            poster={activeImage.getIn(['full_data', 'images', 'standard_resolution', 'url'])}
            src={activeImage.getIn(['full_data', 'videos', 'standard_resolution', 'url'])}
            style={{width: "100%", height: "100%"}}
            controls={true}
            onClick={this.handleVideoClick}
            ref="insta_video">
              <source src={activeImage.getIn(['full_data', 'videos', 'standard_resolution', 'url'])} type="video/mp4" />
              Sorry, your browser doesn't support video
          </video>
        </div>
    }

    return media
  },

  renderUser() {
    const {activeImage} = this.props;

    return (<div className="user-information">
        <img src={activeImage.getIn(['full_data', 'user', 'profile_picture'])} className="img-rounded img-responsive user-avatar" />
        <span className="username">{activeImage.get('username')}</span>
      </div>
    )

  },

  renderInstaInformation() {
    const {activeImage} = this.props;

    return (<p className="insta-information"><Icon iconName="clock-o" />
        <span>
          <a href={`https://instagram.com${activeImage.get('path')}`} target="_blank">
            {moment(activeImage.get('created_time')).fromNow()}
          </a>,
        </span>

        <Icon iconName="map-marker" />
        <span>{activeImage.getIn(['full_data', 'location', 'name'])},</span>

        <Icon iconName="camera" />
        <span>{activeImage.get('filter')} filter</span>
      </p>
    )
  },

  renderBody(){
    const {activeImage} = this.props;

    return <p dangerouslySetInnerHTML={{__html: autoLinker.link(activeImage.getIn(['full_data', 'caption', 'text']))}}></p>
  }

});
