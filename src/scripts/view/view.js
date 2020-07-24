import data from '../../DATA.json';

const main = () => {
    let restaurantElement = '';

    data.restaurants.forEach(resto => {
        restaurantElement += `
        <section class="box">
            <img src="${resto.pictureId}" alt="${resto.name} Image">
            <p class="info">${resto.city} <b>(${resto.rating})</b></p>
            <h3 class="title">${resto.name}</h3>
            <p>${resto.description}</p>
        </section>`;
    });

    document.querySelector(".wrapper").innerHTML = restaurantElement;
    document.querySelector(".jumbotron").style.backgroundImage = "url('./images/heros/hero-image_2.jpg')";
}

export default main;
