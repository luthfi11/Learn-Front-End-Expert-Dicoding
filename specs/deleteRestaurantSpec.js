import * as TestFactories from './helper/testFactories';
import LocalData from '../src/scripts/data/local-data';

describe('Removing a restaurant', () => {
  const restaurantSample = {
    id: 'mu6g39gdgbnkdgkzor',
    name: 'Melting Pot',
    description: 'Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,',
    pictureId: '37',
    city: 'Medan',
    rating: 3.7,
  };

  beforeEach(async () => {
    document.body.innerHTML = '<div id="saveButtonContainer"></div>';
    await LocalData.saveRestaurant(restaurantSample);
  });

  afterEach(async () => {
    await LocalData.deleteRestaurant(restaurantSample.id);
  });

  it('Should display delete button when the restaurant has been saved', async () => {
    await TestFactories.createSavedButton(restaurantSample);
    expect(document.querySelector('[aria-label="Delete from Favorite"]')).toBeTruthy();
  });

  it('Should not display save button when the restaurant has been saved', async () => {
    await TestFactories.createSavedButton(restaurantSample);
    expect(document.querySelector('[aria-label="Save to Favorite"]')).toBeFalsy();
  });

  it('Should be able to delete the restaurant', async () => {
    await TestFactories.createSavedButton(restaurantSample);
    document.querySelector('#deleteButton').dispatchEvent(new Event('click'));
    expect(await LocalData.getAllSaved()).toEqual([]);
  });

  it('Should not throw error if the deleted restaurant is not in the list', async () => {
    await TestFactories.createSavedButton(restaurantSample);
    await LocalData.deleteRestaurant(restaurantSample.id);

    document.querySelector('#deleteButton').dispatchEvent(new Event('click'));

    expect(await LocalData.getAllSaved()).toEqual([]);
  });
});
