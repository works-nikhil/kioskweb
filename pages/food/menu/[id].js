/* eslint-disable no-console */
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";

import { MyCartContext } from "../../_app";
import { fetchFoodMenu } from "../../../api/food/services";
import { FoodCategories } from "../../../components/custom/FoodCategories";
import { FoodItems } from "../../../components/custom/FoodItems";
import { Cart } from "../../../components/custom/Cart";

export default function Menu() {
  const router = useRouter();
  const { id } = router.query;
  const [fetchedData, setFetchedData] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { cart, setCart } = useContext(MyCartContext);

  // let nameOfRestaurant;
  let natureOfFood = [];
  let categoryOfFood = [];
  let foodItems = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData = await fetchFoodMenu(id);

        if (jsonData?.status === "success") {
          setFetchedData(jsonData?.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  fetchedData?.map((item) => {
    nameOfRestaurant = item?.location_name;
    item?.natures?.map((nature) => {
      natureOfFood.push(nature?.nature);
      nature?.categories?.map((category) => {
        categoryOfFood.push(category?.category);
        foodItems.push({ [category?.category]: category?.items });
      });
    });
  });

  return (
    <div className="h-screen">
      <div className="h-full flex flex-col bg-gray-50">
        <div className="flex flex-1 overflow-hidden space-x-4 p-4">
          <div className="w-1/4 p-0 overflow-y-auto bg-white-700 rounded-lg">
            {fetchedData && (
              <FoodCategories
                categoryOfFood={categoryOfFood}
                natureOfFood={natureOfFood}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
              />
            )}
          </div>

          <div className="w-1/2 p-0 overflow-y-auto bg-white-700 rounded-lg">
            {foodItems && foodItems[selectedIndex] && (
              <FoodItems
                foodItems={foodItems[selectedIndex]}
                selectedIndex={selectedIndex}
              />
            )}
          </div>

          <div className="w-1/4 p-0 overflow-y-auto bg-white-700 rounded-lg">
            <Cart cart={cart} id={id} setCart={setCart} />
          </div>
        </div>
      </div>
    </div>
  );
}
