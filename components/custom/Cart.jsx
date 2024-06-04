/* eslint-disable no-console */
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Image,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

import { placeOrder } from "../../api/food/services";

const Cart = (props) => {
  const { cart, setCart, id } = props;
  const router = useRouter();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const processOrder = async () => {
    const payload = {
      location_id: id,
      items: cart,
    };
    const response = await placeOrder(payload);

    if (response.status === "success") {
      router.push("/food/success/" + response.data.order_id);
    }
  };

  return (
    <Card className="max-w-full">
      <CardHeader className="flex gap-2 justify-center">
        <div className="flex flex-col">
          <p className="text-lg justify-center">Cart</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="odd:bg-gray-800">
        {cart.length > 0 &&
          cart.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex items-center p-4 mb-4 bg-gray-700"
            >
              <Image
                alt={item.item_name}
                className="w-20 h-20 rounded-md mr-4"
                src="https://placehold.co/100x100"
              />
              <div className="ml-4">
                <h3 className="text-lg font-medium">{item.item_name}</h3>
                <p className="text-sm">₹{item.price}</p>
              </div>
              <p className="ml-6">x {item.quantity}</p>
              <div className="ml-auto text-right">
                <span className="font-bold text-lg">
                  {item.price * item.quantity}
                </span>
              </div>
            </div>
          ))}
      </CardBody>
      <Divider />
      <CardFooter className="flex justify-between text-medium">
        <div className="flex">
          <b>Total:</b>
          <p className="text-default-800 ml-6">₹{total}</p>
        </div>
        <Button
          color="success"
          isDisabled={total === 0}
          variant="bordered"
          onClick={processOrder}
        >
          Place Order
        </Button>
      </CardFooter>
    </Card>
  );
};

export { Cart };
