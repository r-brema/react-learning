// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";

import { useNavigate } from "react-router-dom";
import { useURLPosition } from "../hooks/useURLPosition";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Button from "./Button";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCitiesContext } from "../contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [lat, lng] = useURLPosition();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [isGeocodeLoading, setIsGeocodeLoading] = useState(false);
  const [isGeocodingError, setIsGeocodingError] = useState("");
  const navigate = useNavigate();

  const { addCity, isLoading } = useCitiesContext();
  useEffect(
    function () {
      async function getCityData() {
        try {
          setIsGeocodeLoading(true);
          setIsGeocodingError("");
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
          );
          const data = await res.json();

          if (!data.countryCode)
            throw new Error("That doesnt seem to be valid city. ");
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          setIsGeocodingError(err.message);
        } finally {
          setIsGeocodeLoading(false);
        }
      }
      getCityData();
    },
    [lat, lng]
  );
  async function submitHandler(e) {
    e.preventDefault();
    if (!cityName || !date) {
      alert(" city and date should not be blank");
      return;
    }
    const newCityObj = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    await addCity(newCityObj);
    navigate("/app/cities");
  }
  if (isGeocodeLoading) return <Spinner />;
  if (isGeocodingError) return <Message message={isGeocodingError} />;
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={submitHandler}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {<span className={styles.flag}>{emoji}</span>}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          onChange={(date) => setDate(Date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" onClick={submitHandler}>
          {" "}
          Add
        </Button>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
