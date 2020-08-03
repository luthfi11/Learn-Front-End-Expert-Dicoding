import ApiRepository from '../../data/api-repository';
import '../../component/loading-indicator';
import '../../component/restaurant-list';

class Home {
  static async render() {
    return `
            <section class="jumbotron">
                <picture>
                  <source media="(min-width:601px)" srcset="./images/heros/hero-image_2-large.jpg">
                  <source media="(max-width:600px)" srcset="./images/heros/hero-image_2-small.jpg">
                  <img src="./images/heros/hero-image_2-large.jpg" alt="Heroes Image">
                </picture>
                
                <h1 class="jumbotron-title">Welcome to GoFuds!</h1>
            </section>
            
            <article id="content">
                <h2>Explore Restaurant</h2>
                <loading-indicator></loading-indicator>
                <restaurant-list class="wrapper"></restaurant-list>
            </article>`;
  }

  static async afterRender() {
    const mainContent = document.querySelector('#content');
    const loadingElement = document.querySelector('loading-indicator');
    const restaurantListElement = document.querySelector('restaurant-list');

    try {
      const response = await ApiRepository.getRestaurantList();
      console.log(response);
      restaurantListElement.restaurants = response;
    } catch (message) {
      mainContent.innerHTML = '<h3>Failed to load data!<br>You are offline, please check your internet connection.</h3>';
    } finally {
      loadingElement.style.display = 'none';
    }
  }
}

export default Home;
