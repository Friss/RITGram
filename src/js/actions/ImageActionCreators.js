import SetupUtils from '../setup';

var dispatcher = SetupUtils.getDispatcher();

export default {
  fetchImages(pageNumber) {
    fetch('http://localhost:3000/api/v1/pictures?page='+pageNumber)
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
      actionType: 'SELECT_IMAGE', // required field
      data: {
        image: image
      }
    });
  }
};
