/* eslint-disable no-console */
import { React, useContext } from "react";
import {
  Card,
  CardHeader,
  Divider,
  CardBody,
  Image,
  CardFooter,
} from "@nextui-org/react";

import { MyCartContext } from "../../pages/_app";
import { addToCart } from "../../lib/common/cartUtils";

const FoodItems = (props) => {
  const { foodItems, selectedIndex } = props;
  const { cart, setCart } = useContext(MyCartContext);

  let selectedCategory = Object.keys(foodItems);
  const [firstFoodItem] = Object.values(foodItems);

  return (
    <Card className="max-w-full">
      <CardHeader className="flex gap-2 justify-center">
        <div className="flex flex-col">
          <p className="text-lg justify-center">{selectedCategory}</p>
        </div>
      </CardHeader>
      <Divider />
      {firstFoodItem.map((item) => (
        <Card
          key={item.item_id}
          isPressable
          className="w-full sm:w-[200px] max-h-[200px] m-6 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 bg-gray-500"
          shadow="sm hover:shadow-lg"
          onPress={() => addToCart(cart, setCart, item)}
        >
          <CardBody className="overflow-visible p-2">
            <Image
              alt={item.item_name}
              className="w-full object-cover h-[140px]"
              radius="lg"
              shadow="sm"
              src="https://placehold.co/100x100"
              width="100%"
            />
          </CardBody>
          <CardFooter className="text-small">
            <div className="flex flex-row justify-between">
              <b>{item.item_name}</b>
              <p className="text-default-500">₹{item.price}</p>
            </div>
          </CardFooter>
        </Card>
      ))}
    </Card>
  );
};

export { FoodItems };
