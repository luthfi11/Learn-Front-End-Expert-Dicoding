import CONFIG from '../data/config';
import './review-form';

class RestaurantDetail extends HTMLElement {
  set restaurantItem(item) {
    this.restaurant = item.restaurant;
    this.render();
  }

  _getCategories() {
    let categories = '';
    this.restaurant.categories.forEach((item) => {
      categories += `${item.name}, `;
    });
    return categories;
  }

  _getFoods() {
    let foods = '<b>Food List</b><div class="menu">';
    this.restaurant.menus.foods.forEach((food) => {
      foods += `<li>${food.name}</li>`;
    });
    foods += '</div>';

    return foods;
  }

  _getDrinks() {
    let drinks = '<b>Drink List</b><div class="menu">';
    this.restaurant.menus.drinks.forEach((drink) => {
      drinks += `<li>${drink.name}</li>`;
    });
    drinks += '</div>';

    return drinks;
  }

  _getReviews() {
    let reviews = '<b>Customer Reviews</b>';
    this.restaurant.customerReviews.forEach((item) => {
      reviews += `<div class="review">
                    <b>${item.name}</b><br>
                    <small>${item.date}</small><br>
                    "<i>${item.review}</i>"
                  </div>`;
    });
    return reviews;
  }

  render() {
    this.innerHTML = `
            <h1>${this.restaurant.name}</h1>
            <img src="${CONFIG.BASE_IMAGE_URL}${this.restaurant.pictureId}" alt="${this.restaurant.name}">
            <div class="basic-info">
              <p>Categories<br><b>${this._getCategories().slice(0, -2)}</b></p>
              <p>Address<br><b>${this.restaurant.address}</b></p>
              <p>City<br><b>${this.restaurant.city}</b></p>
              <p>Rating<br><b>${this.restaurant.rating}</b></p>
            </div>
            <p>${this.restaurant.description}</p>
            ${this._getFoods()}
            ${this._getDrinks()}
            ${this._getReviews()}
            <review-form></review-form>`;
  }

  renderError(message) {
    console.log(message);
    this.innerHTML += '<h3>Failed to load data!<br>You are offline, please check your internet connection.</h3>';
  }
}

customElements.define('restaurant-detail', RestaurantDetail);
