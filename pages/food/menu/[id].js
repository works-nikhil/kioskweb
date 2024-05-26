import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { fetchFoodMenu } from "../../../api/food/services";

export default function Menu() {
  const router = useRouter();
  const { id } = router.query;
  const [fetchedData, setFetchedData] = useState(null);

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

  return (
    <div>
      <h1>User {id}</h1>
      {fetchedData &&
        fetchedData?.map((item, index) => {
          return <p key={index}>{item?.location_name}</p>;
        })}
    </div>
  );
}
