import CONFIG from '../data/config';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

class RestaurantItem extends HTMLElement {
  set restaurantItem(restaurant) {
    this.restaurant = restaurant;
    this.render();
  }

  render() {
    this.innerHTML = `
            <img class="lazyload" data-src="${CONFIG.BASE_IMAGE_URL}${this.restaurant.pictureId}" alt="${this.restaurant.name}">
            <p class="info">${this.restaurant.city} <b>(${this.restaurant.rating})</b></p>
            <h3 class="title">${this.restaurant.name}</h3>
            <p>${this.restaurant.description}</p>
            <a href="#/detail/${this.restaurant.id}" aria-label="See details of ${this.restaurant.name}">See Details</a>`;
  }
}

customElements.define('restaurant-item', RestaurantItem);
