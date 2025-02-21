import { useEffect } from "react";
import { useCitiesContext } from "../contexts/CitiesContext";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

function CityList() {
  const { cities, isLoading, error } = useCitiesContext();

  useEffect(function () {});

  if (isLoading) return <Spinner />;
  if (error !== null) return <Message message={error} />;
  if (cities.length === 0)
    return (
      <Message
        message={
          "No cities found.  Pls click on map to add cities to your list"
        }
      />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
