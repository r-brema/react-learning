import { useCitiesContext } from "../contexts/CitiesContext";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

function CountryList() {
  const { cities, isLoading, error } = useCitiesContext();
  const countries = cities.reduce((arr, city) => {
    if (arr.map((item) => item.name).includes(city.country)) {
      return arr;
    } else {
      return [
        ...arr,
        { id: crypto.randomUUID(), name: city.country, emoji: city.emoji },
      ];
    }
  }, []);

  if (isLoading) return <Spinner />;
  if (error !== null) return <Message message={error} />;
  if (countries.length === 0)
    return (
      <Message
        message={
          "No Countries found.  Pls click on map to add countries to your list"
        }
      />
    );

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.id} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
