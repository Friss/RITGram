import GeneralStore from 'general-store';
import Immutable from 'immutable';

const {fromJS} = Immutable;

let dataStore = fromJS({
  images: [],
  page: 0,
  activeImage: null
});

var ImagesStore = GeneralStore.define()
  .defineGet(function() {
    return dataStore;
  })
  .defineResponseTo('ADD_IMAGES', function (actionData) {
    const {images, page} = actionData;

    let allImages = dataStore.get('images').concat(fromJS(images))

    dataStore = dataStore.merge(fromJS({
      images: allImages,
      page: page
    }))

    return
  })
  .defineResponseTo('SELECT_IMAGE', function ({image}) {
    dataStore = dataStore.set('activeImage', image);
  })
  .defineResponseTo('SELECT_NEXT_IMAGE', function () {
    dataStore = dataStore.set('activeImage', dataStore.getIn(['images', dataStore.get('images').indexOf(dataStore.get('activeImage'))+1]));
  })
  .defineResponseTo('SELECT_PREVIOUS_IMAGE', function () {
    dataStore = dataStore.set('activeImage', dataStore.getIn(['images', dataStore.get('images').indexOf(dataStore.get('activeImage'))-1]));
  })
  .register();

module.exports = ImagesStore;
