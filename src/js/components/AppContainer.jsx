import React, {PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import GeneralStore from 'general-store';
import ImagesStore from '../stores/ImagesStore'
import ActionCreator from '../actions/ImageActionCreators';
import App from './App.jsx';

export default React.createClass({
  mixins: [
    PureRenderMixin,
    GeneralStore.StoreDependencyMixin({
      storeData: ImagesStore
    })
  ],

  componentDidMount() {
    ActionCreator.fetchImages(this.state.storeData.get('page'))
  },

  render() {
    const {storeData} = this.state;
    const images = storeData.get('images');
    const page = storeData.get('page');
    const activeImage = storeData.get('activeImage');

    return (
      <App
        images={images}
        page={page}
        activeImage={activeImage}
      />
    );
  }
});
