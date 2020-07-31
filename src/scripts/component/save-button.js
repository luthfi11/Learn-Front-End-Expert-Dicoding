import LocalData from '../data/local-data';

class SaveButton extends HTMLElement {
  connectedCallback() {
    this._renderButton();
  }

  set restaurantData(item) {
    this.restaurant = item;
  }

  _renderButton() {
    const { id } = this.restaurant;
    LocalData.getRestaurantById(id).then((data) => {
      if (data === undefined) this._renderSave();
      else this._renderDelete();
    });
  }

  _renderSave() {
    this.innerHTML = '<button aria-label="Save to Favorite" id="saveButton" class="like">&#10084;</button>';
    const saveButton = document.querySelector('#saveButton');
    saveButton.addEventListener('click', async () => {
      await LocalData.saveRestaurant(this.restaurant);
      this._renderDelete();
    });
  }

  _renderDelete() {
    this.innerHTML = '<button aria-label="Delete from Favorite" id="deleteButton" class="like">&#10084;</button>';
    const deleteButton = document.querySelector('#deleteButton');
    deleteButton.style.color = 'red';
    deleteButton.addEventListener('click', async () => {
      await LocalData.deleteRestaurant(this.restaurant.id);
      this._renderSave();
    });
  }
}

customElements.define('save-button', SaveButton);
