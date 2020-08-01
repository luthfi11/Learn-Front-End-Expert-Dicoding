import SaveButtonInitiator from '../../src/scripts/utils/save-button-initiator';

const createSavedButton = async (restaurant) => {
  await SaveButtonInitiator.init({
    saveButtonContainer: document.querySelector('#saveButtonContainer'),
    restaurant,
  });
};

// eslint-disable-next-line import/prefer-default-export
export { createSavedButton };
