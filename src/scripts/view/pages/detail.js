import ApiRepository from '../../data/api-repository';
import UrlParser from '../../routes/url-parser';
import SaveButtonInitiator from '../../utils/save-button-initiator';
import '../../component/loading-indicator';
import '../../component/restaurant-detail';

class Detail {
  static async render() {
    return `<loading-indicator></loading-indicator>
            <restaurant-detail id="content"></restaurant-detail>
            <div id="saveButtonContainer"></div>`;
  }

  static async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const loadingElement = document.querySelector('loading-indicator');
    const restaurantElement = document.querySelector('restaurant-detail');

    try {
      const response = await ApiRepository.getRestaurantDetail(url.id);
      restaurantElement.restaurantItem = response;

      await SaveButtonInitiator.init({
        saveButtonContainer: document.querySelector('#saveButtonContainer'),
        restaurant: response.restaurant,
      });

      await this._addReview(url.id);
    } catch (message) {
      restaurantElement.renderError(message);
    } finally {
      loadingElement.style.display = 'none';
    }
  }

  static async _addReview(restoId) {
    const reviewButton = document.getElementById('submitReview');
    reviewButton.addEventListener('click', () => {
      const customerName = document.getElementById('customerName').value;
      const userReview = document.getElementById('reviews').value;

      if (customerName !== '' || userReview !== '') {
        const reviewData = {
          id: restoId,
          name: customerName,
          review: userReview,
        };

        ApiRepository.addReview(reviewData)
          .then(() => {
            location.reload();
          });
      } else {
        alert('Please fill out the form completely to add your review!');
      }
    });
  }
}

export default Detail;
