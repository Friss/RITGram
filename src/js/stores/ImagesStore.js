import GeneralStore from 'general-store';
import Immutable from 'immutable';

let {fromJS} = Immutable;

var dataStore = fromJS({
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
  .defineResponseTo('SELECT_IMAGE', function (actionData) {
    const {image} = actionData;

    dataStore = dataStore.set('activeImage', image);

  })
  .register();

module.exports = ImagesStore;
