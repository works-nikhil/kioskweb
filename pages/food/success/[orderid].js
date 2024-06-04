import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";

import { MyCartContext } from "../../_app";

const Success = () => {
  const router = useRouter();
  const { orderid } = router.query;
  const [timer, setTimer] = useState(5);
  const { cart, setCart } = useContext(MyCartContext);

  useEffect(() => {
    let countdown = 5;
    const interval = setInterval(() => {
      countdown--;
      setTimer(countdown);
      if (countdown === 0) {
        clearInterval(interval);
        setCart([]);
        router.push("/food/menu/7");
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">
        Order Placed Successfully! #{orderid}
      </h1>
      <p className="text-lg text-gray-600">
        Thank you for your order. Your order is getting processed.
      </p>
      <p className="text-lg text-gray-600">
        You will be redirected to home page in {timer} seconds.
      </p>
    </div>
  );
};

export default Success;
