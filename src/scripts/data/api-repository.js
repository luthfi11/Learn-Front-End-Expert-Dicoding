import API_CONFIG from './api-config';
import CONFIG from './config';

class ApiRepository {
  static async getRestaurantList() {
    const response = await fetch(API_CONFIG.RESTAURANT_LIST);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async getRestaurantDetail(id) {
    const response = await fetch(API_CONFIG.DETAIL(id));
    return response.json();
  }

  static async addReview(review) {
    const response = await fetch(API_CONFIG.REVIEW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': CONFIG.API_KEY,
      },
      body: JSON.stringify(review),
    });
    return response.json();
  }
}

export default ApiRepository;
