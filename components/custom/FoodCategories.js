/* eslint-disable no-console */
import React from "react";
import { Card, CardHeader, CardBody, Divider, Image } from "@nextui-org/react";

const FoodCategories = (props) => {
  const { categoryOfFood, natureOfFood, selectedIndex, setSelectedIndex } =
    props;

  return (
    <Card className="max-w-full">
      <CardHeader className="flex gap-2 justify-center">
        <div className="flex flex-col">
          <p className="text-lg justify-center">Food Categories</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="odd:bg-gray-800">
        {categoryOfFood?.map((item, index) => {
          return (
            <div
              key={index}
              className="flex items-center shadow rounded-lg mb-4"
              role="button"
              tabIndex={0}
              onClick={() => setSelectedIndex(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setSelectedIndex(index);
                }
              }}
            >
              <Image
                alt={`Food Category ${index}`}
                className="w-20 h-20 rounded-md mr-4"
                src="https://placehold.co/100x100"
              />
              <div className="ml-6">
                <h3 className="text-lg font-medium text-white-900">{item}</h3>
                <p className="text-gray-500 text-sm">{natureOfFood[index]}</p>
              </div>
            </div>
          );
        })}
      </CardBody>
      <Divider />
    </Card>
  );
};

export { FoodCategories };
