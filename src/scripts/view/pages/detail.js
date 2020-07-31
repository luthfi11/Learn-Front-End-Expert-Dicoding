import ApiRepository from '../../data/api-repository';
import UrlParser from '../../routes/url-parser';
import '../../component/loading-indicator';
import '../../component/restaurant-detail';

class Detail {
  static async render() {
    return `<loading-indicator></loading-indicator>
            <restaurant-detail id="content"></restaurant-detail>`;
  }

  static async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const loadingElement = document.querySelector('loading-indicator');
    const restaurantElement = document.querySelector('restaurant-detail');

    try {
      const response = await ApiRepository.getRestaurantDetail(url.id);
      console.log(response);
      restaurantElement.restaurantItem = response;
    } catch (message) {
      restaurantElement.renderError(message);
    } finally {
      loadingElement.style.display = 'none';
    }
  }
}

export default Detail;
