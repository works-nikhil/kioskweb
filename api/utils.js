/* eslint-disable no-console */
import { BASE_URL } from "../lib/constants";

export async function fetchDataFromEndpoint(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(`Error in API call to ${url}: ${error.message}`);
    throw error;
  }
}
