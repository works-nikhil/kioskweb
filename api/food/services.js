import { fetchDataFromEndpoint } from '../utils';

export async function fetchFoodMenu(id) {

  try {
    const data = await fetchDataFromEndpoint(`/api/food/menu/${id}`);
    return data;
  } catch (error) {
    console.error(`Error in API call to ${url}: ${error.message}`);
    throw error;
  }
}
