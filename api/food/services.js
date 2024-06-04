/* eslint-disable no-console */
import { fetchDataFromEndpoint } from "../utils";

export async function fetchFoodMenu(id) {
  try {
    const data = await fetchDataFromEndpoint(`/api/food/menu/${id}`);

    return data;
  } catch (error) {
    console.error(`Error in API call to ${url}: ${error.message}`);
    throw error;
  }
}

export async function placeOrder(orderObject) {
  try {
    const data = await fetchDataFromEndpoint("/api/food/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderObject),
    });

    return data;
  } catch (error) {
    console.error(`Error in API call to ${url}: ${error.message}`);
    throw error;
  }
}

export async function fetchOrderStatus(id) {
  try {
    const data = await fetchDataFromEndpoint(`/api/food/status/${id}`);

    return data;
  } catch (error) {
    console.error(`Error in API call to ${url}: ${error.message}`);
    throw error;
  }
}

export async function updateOrderStatus(orderId, statusId) {
  try {
    const data = await fetchDataFromEndpoint(`/api/food/orderUpdate`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order_id: orderId, status_id: statusId }),
    });

    return data;
  } catch (error) {
    console.error(`Error in API call to ${url}: ${error.message}`);
    throw error;
  }
}
