import LocalData from '../../data/local-data';
import '../../component/restaurant-list';

class Favorite {
  static async render() {
    return `<h1>Your Favorite Restaurant</h1>
        <h2 id="emptyData">There are no favorite restaurants yet</h2>
        <restaurant-list class="wrapper" id="content"></restaurant-list>`;
  }

  static async afterRender() {
    const restaurantListElement = document.querySelector('restaurant-list');
    const favoriteData = await LocalData.getAllSaved();
    const emptyCaption = document.querySelector('#emptyData');

    if (favoriteData.length > 0) {
      emptyCaption.style.display = 'none';
    }

    restaurantListElement.restaurants = favoriteData;
  }
}

export default Favorite;
