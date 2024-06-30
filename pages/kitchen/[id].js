/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import React, { useState, useEffect, useContext } from "react";
import { Card, CardBody, Button, CardFooter, Divider } from "@nextui-org/react";
import { useRouter } from "next/router";

import { fetchOrderStatus, updateOrderStatus } from "../../api/food/services";
import { MyCartContext } from "../../pages/_app";

export default function Kitchen() {
  const router = useRouter();
  const { id } = router.query;
  const [fetchedData, setFetchedData] = useState(null);
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [preparingOrders, setPreparingOrders] = useState([]);
  const [readyOrders, setReadyOrders] = useState([]);
  const [rerender, setRerender] = useState(false);
  const { isReRenderRequired, setIsReRenderRequired } = useContext(MyCartContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData = await fetchOrderStatus(id);

        if (jsonData?.status === "success") {
          setFetchedData(jsonData?.data);
          setIsReRenderRequired(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (id) {
      fetchData();
      setRerender(false);
    }
  }, [id, rerender, isReRenderRequired]);

  useEffect(() => {
    if (fetchedData) {
      setAcceptedOrders(
        fetchedData?.filter((order) => order.status === "Accepted"),
      );
      setPreparingOrders(
        fetchedData?.filter((order) => order.status === "Preparing"),
      );
      setReadyOrders(fetchedData?.filter((order) => order.status === "Ready"));
    }
  }, [fetchedData]);

  const handleMoveToPreparing = async (orderId) => {
    const order = acceptedOrders.find((order) => order.order_id === orderId);

    if (order) {
      try {
        const jsonData = await updateOrderStatus(orderId, 2);

        if (jsonData?.status === "success") {
          setRerender(!rerender);
        }
      } catch (error) {
        console.error("Error updating data:", error);
      }
    }
  };

  const handleMoveToReady = async (orderId) => {
    const order = preparingOrders.find((order) => order.order_id === orderId);

    console.log(orderId, order, "nikhil");

    if (order) {
      try {
        const jsonData = await updateOrderStatus(orderId, 3);

        if (jsonData?.status === "success") {
          setRerender(!rerender);
        }
      } catch (error) {
        console.error("Error updating data:", error);
      }
    }
  };

  const handleMoveToCompleted = async (orderId) => {
    const order = readyOrders.find((order) => order.order_id === orderId);

    if (order) {
      try {
        const jsonData = await updateOrderStatus(orderId, 4);

        if (jsonData?.status === "success") {
          setRerender(!rerender);
        }
      } catch (error) {
        console.error("Error updating data:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center">
          <div>Accepted</div>
          {acceptedOrders.map((order) => (
            <Card key={order.order_id} className="w-full mb-4">
              <CardBody>
                <div>Order ID: #{order.order_id}</div>
                <Divider />
                {order.items?.map((item, index) => (
                  <div key={index} className="m-1">
                    {item.item_name} - {item.quantity}
                  </div>
                ))}
              </CardBody>
              <Divider />
              <CardFooter>
                <Button onClick={() => handleMoveToPreparing(order.order_id)}>
                  Move to Preparing
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex flex-col items-center">
          <div>Preparing</div>
          {preparingOrders.map((order) => (
            <Card key={order.order_id} className="w-full mb-4">
              <CardBody>
                <div>Order ID: #{order.order_id}</div>
                <Divider />
                {order.items?.map((item, index) => (
                  <div key={index} className="m-1">
                    {item.item_name} - {item.quantity}
                  </div>
                ))}
              </CardBody>
              <Divider />
              <CardFooter>
                <Button onClick={() => handleMoveToReady(order.order_id)}>
                  Move to Ready
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex flex-col items-center">
          <div>Ready</div>
          {readyOrders.map((order) => (
            <Card key={order.order_id} className="w-full mb-4">
              <CardBody>
                <div>Order ID: #{order.order_id}</div>
                <Divider />
                {order.items?.map((item, index) => (
                  <div key={index} className="m-1">
                    {item.item_name} - {item.quantity}
                  </div>
                ))}
              </CardBody>
              <Divider />
              <CardFooter>
                <Button onClick={() => handleMoveToCompleted(order.order_id)}>
                  Move to Completed
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
