import SetupUtils from '../setup';

var dispatcher = SetupUtils.getDispatcher();

export default {
  fetchImages(pageNumber) {
    fetch('http://api.ritgram.xyz/api/v1/pictures?page='+pageNumber)
    .then((response) => response.json())
    .then(function (images) {
      dispatcher.dispatch({
        actionType: 'ADD_IMAGES', // required field
        data: {
          images: images,
          page: pageNumber
        }
      });
    });
  },
  selectImage(image) {
    dispatcher.dispatch({
      actionType: 'SELECT_IMAGE',
      data: {
        image: image
      }
    });
  },
  selectNextImage() {
    dispatcher.dispatch({
      actionType: 'SELECT_NEXT_IMAGE'
    });
  },
  selectPreviousImage() {
    dispatcher.dispatch({
      actionType: 'SELECT_PREVIOUS_IMAGE'
    });
  }

};
