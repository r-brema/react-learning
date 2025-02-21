import { useEffect, useReducer } from "react";
import { createContext, useContext } from "react";

const CitiesContext = createContext();
const END_POINT = "http://localhost:9001/";
const initialState = {
  cities: [],
  currentCity: {},
  isLoading: false,
  error: null,
};
function citiesReducer(state, action) {
  /*console.group();
  console.log(state);
  console.log(action);
  console.groupEnd();*/
  switch (action.type) {
    case "data/loading":
      return { ...state, isLoading: true };
    case "data/error":
      return { ...state, isLoading: false, error: action.payload };
    case "cities/get":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/get":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/delete":
      const cities = state.cities.filter((city) => city.id !== action.payload);
      return { ...state, isLoading: false, cities: cities };
    case "city/add":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    default:
      throw new Error("unknown type");
  }
}
function CitiesProviderContext({ children }) {
  const [{ cities, isLoading, error, currentCity }, dispatch] = useReducer(
    citiesReducer,
    initialState
  );

  useEffect(function () {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      dispatch({ type: "data/loading" });
      async function getCities() {
        const res = await fetch(`${END_POINT}cities`, { signal });
        if (!res.ok)
          throw new Error("Something went wrong while fetching the data");
        const data = await res.json();
        dispatch({ type: "cities/get", payload: data });
      }
      getCities();
    } catch (err) {
      dispatch({ type: "data/error", payload: err.message });
    }
    //Abort the request when component unmount
    // return () => controller.abort();
  }, []);

  async function getCity(id, signal) {
    //no need to fetch if id is same as current city
    if (id === currentCity.id) return;
    try {
      dispatch({ type: "data/loading" });
      const res = await fetch(`${END_POINT}cities/${id}`, { signal });
      if (!res.ok)
        throw new Error("Something went wrong while fetching the data");
      const data = await res.json();
      dispatch({ type: "city/get", payload: data });
    } catch (err) {
      dispatch({ type: "data/error", payload: err.message });
    }
  }
  async function addCity(city) {
    try {
      dispatch({ type: "data/loading" });
      const res = await fetch(`${END_POINT}cities`, {
        method: "POST",
        body: JSON.stringify(city),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok)
        throw new Error("Something went wrong while adding new city");
      const data = await res.json();
      dispatch({ type: "city/add", payload: data });
    } catch (err) {
      dispatch({ type: "data/error", payload: err.message });
    }
  }

  async function deleteCity(cityId) {
    try {
      dispatch({ type: "data/loading" });
      const res = await fetch(`${END_POINT}cities/${cityId}`, {
        method: "DELETE",
      });
      if (!res.ok)
        throw new Error("Something went wrong while adding new city");
    } catch (err) {
      dispatch({ type: "data/error", payload: err.message });
    }
    dispatch({ type: "city/delete", payload: cityId });
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        error,
        getCity,
        currentCity,
        addCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCitiesContext() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error("context used outside the scope");
  return context;
}

export { CitiesProviderContext, useCitiesContext };
