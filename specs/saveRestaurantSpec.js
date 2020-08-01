import * as TestFactories from './helper/testFactories';
import LocalData from '../src/scripts/data/local-data';

describe('Saving a restaurant', () => {
  const restaurantSample = {
    id: 'mu6g39gdgbnkdgkzor',
    name: 'Melting Pot',
    description: 'Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,',
    pictureId: '37',
    city: 'Medan',
    rating: 3.7,
  };

  beforeEach(() => {
    document.body.innerHTML = '<div id="saveButtonContainer"></div>';
  });

  it('Should show the save button when the restaurant has not been saved before', async () => {
    await TestFactories.createSavedButton(restaurantSample);
    expect(document.querySelector('[aria-label="Save to Favorite"]')).toBeTruthy();
  });

  it('Should not show the delete button when the restaurant has not been saved before', async () => {
    await TestFactories.createSavedButton(restaurantSample);
    expect(document.querySelector('[aria-label="Delete from Favorite"]')).toBeFalsy();
  });

  it('Should be able to save the restaurant', async () => {
    await TestFactories.createSavedButton(restaurantSample);

    document.querySelector('#saveButton').dispatchEvent(new Event('click'));
    const restaurant = await LocalData.getRestaurantById(restaurantSample.id);

    expect(restaurant).toEqual(restaurantSample);

    await LocalData.deleteRestaurant(restaurantSample.id);
  });

  it('Should not save a restaurant again when its already saved', async () => {
    await TestFactories.createSavedButton(restaurantSample);

    await LocalData.saveRestaurant(restaurantSample);

    document.querySelector('#saveButton').dispatchEvent(new Event('click'));
    expect(await LocalData.getAllSaved()).toEqual([restaurantSample]);

    await LocalData.deleteRestaurant(restaurantSample.id);
  });

  it('Should not save a restaurant when it has no id', async () => {
    await TestFactories.createSavedButton({});

    document.querySelector('#saveButton').dispatchEvent(new Event('click'));

    expect(await LocalData.getAllSaved()).toEqual([]);
  });
});
