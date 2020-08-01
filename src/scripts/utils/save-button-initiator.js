import LocalData from '../data/local-data';

const SaveButtonInitiator = {
  async init({ saveButtonContainer, restaurant }) {
    this._saveButtonContainer = saveButtonContainer;
    this._restaurant = restaurant;

    await this._renderButton();
  },

  async _isRestaurantSaved(id) {
    const restaurant = await LocalData.getRestaurantById(id);
    return !!restaurant;
  },

  async _renderButton() {
    const { id } = this._restaurant;
    if (await this._isRestaurantSaved(id)) this._renderDelete();
    else this._renderSave();
  },

  _renderSave() {
    this._saveButtonContainer.innerHTML = '<button aria-label="Save to Favorite" id="saveButton" class="like">&#10084;</button>';
    const saveButton = document.querySelector('#saveButton');
    saveButton.addEventListener('click', async () => {
      await LocalData.saveRestaurant(this._restaurant);
      this._renderDelete();
    });
  },

  _renderDelete() {
    this._saveButtonContainer.innerHTML = '<button aria-label="Delete from Favorite" id="deleteButton" class="like">&#10084;</button>';
    const deleteButton = document.querySelector('#deleteButton');
    deleteButton.style.color = 'red';
    deleteButton.addEventListener('click', async () => {
      await LocalData.deleteRestaurant(this._restaurant.id);
      this._renderSave();
    });
  },
};

export default SaveButtonInitiator;
