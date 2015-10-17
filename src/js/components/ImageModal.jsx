import React, {PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Autolinker from '../vendor/autolinker'
import moment from 'moment';
import $ from 'jquery';
import {each} from 'lodash';
import classNames from 'classNames';

import Modal from 'react-bootstrap/lib/Modal';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import ActionCreators from '../actions/ImageActionCreators';
import Icon from './Icon.jsx';
import {ESC, LEFT, RIGHT, J, K} from '../constants/keyCodes';
import WindowListenerMixin from '../mixins/WindowListenerMixin';

const autoLinker = new Autolinker({hashtag: 'instagram', twitter: false});
const $window = $(window);

export default React.createClass({
  mixins: [
    PureRenderMixin,
    WindowListenerMixin
  ],

  getInitialState() {
    return {
      videoPlaying: false
    }
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
      case J:
        return this.handlePrevImage();
      case RIGHT:
      case K:
        return this.handleNextImage();
    }
  },

  handleVideoClick() {
    const {videoPlaying} = this.state;
    const video = ReactDOM.findDOMNode(this.refs.insta_video);

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
    const showModal = !!activeImage;

    if (!showModal){
      return null;
    }

    return (
      <Modal
        bsSize='large'
        className={"insta-"+activeImage.getIn(['full_data', 'type'])}
        show={showModal}
        onHide={this.handleModalClose}
      >
        <Icon
          className="close-modal"
          onClickHandler={this.handleModalClose}
          iconName="times"
        />
        <Row>
          <Col
            xs={8}
            className="text-center"
          >
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
        <Icon
          className="prev-image"
          onClickHandler={this.handlePrevImage}
          iconName="arrow-left"
        />
        <Icon
          className="next-image"
          onClickHandler={this.handleNextImage}
          iconName="arrow-right"
        />
      </Modal>
    )
  },

  renderMedia() {
    const {activeImage} = this.props;
    const {videoPlaying} = this.state;
    let media;

    if (activeImage.getIn(['full_data', 'type']) === "image") {
      return (
        <img
          src={activeImage.getIn(['full_data', 'images', 'standard_resolution', 'url'])}
          className="img-responsive"
        />
      )

    }
    const playButtonClasses = classNames(
      "modal-video-marker",
      {
        "hidden": videoPlaying
      }
    )

    return (
      <div>
        <Icon
          onClickHandler={this.handleVideoClick}
          className={playButtonClasses}
          iconName="play"
        />
        <video
          poster={activeImage.getIn(['full_data', 'images', 'standard_resolution', 'url'])}
          src={activeImage.getIn(['full_data', 'videos', 'standard_resolution', 'url'])}
          style={{width: "100%", height: "100%"}}
          controls={true}
          onClick={this.handleVideoClick}
          ref="insta_video"
        >
          <source
            src={activeImage.getIn(['full_data', 'videos', 'standard_resolution', 'url'])}
            type="video/mp4"
          />
          Sorry, your browser doesn't support video
        </video>
      </div>
    )
  },

  renderUser() {
    const {activeImage} = this.props;

    return (
      <div className="user-information">
        <img
          src={activeImage.getIn(['full_data', 'user', 'profile_picture'])}
          className="img-rounded img-responsive user-avatar"
        />
        <span className="username">
          {activeImage.get('username')}
        </span>
      </div>
    )
  },

  renderInstaInformation() {
    const {activeImage} = this.props;

    return (
      <p className="insta-information"><Icon iconName="clock-o" />
        <span>
          <a
            href={`https://instagram.com${activeImage.get('path')}`}
            target="_blank"
          >
            {moment(activeImage.get('created_time')).fromNow()}
          </a>,
        </span>

        <Icon iconName="map-marker" />
        <span>
          {activeImage.getIn(['full_data', 'location', 'name'])},
        </span>

        <Icon iconName="camera" />
        <span>
          {activeImage.get('filter')} filter
        </span>
      </p>
    )
  },

  renderBody(){
    const {activeImage} = this.props;

    return <p dangerouslySetInnerHTML={{__html: autoLinker.link(activeImage.getIn(['full_data', 'caption', 'text']))}}></p>
  }

});
