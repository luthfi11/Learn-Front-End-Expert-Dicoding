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
    } catch (message) {
      restaurantElement.renderError(message);
    } finally {
      loadingElement.style.display = 'none';
    }
  }
}

export default Detail;
