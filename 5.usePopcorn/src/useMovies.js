import { useState, useEffect } from "react";
const OMDB_API_KEY = "b977f12a";
const API_URL = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`;

export function useMovies(searchText) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovieData() {
        try {
          setIsLoading(true);
          const res = await fetch(`${API_URL}&s=${searchText}`, {
            signal: controller.signal,
          });
          if (res.ok) {
            const data = await res.json();
            if (data.Response === "False") throw new Error("Movies not found");
            setMovies(data.Search);
            setError(null);
          } else {
            throw new Error("Something went wrong while fetching movies");
          }
        } catch (error) {
          setError(error.message);
          setMovies([]);
        }

        setIsLoading(false);
      }
      fetchMovieData();
      return () => controller.abort();
    },
    [searchText]
  );
  return { isLoading, movies, error };
}

export function useGetMovie(selectedMovieId) {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  useEffect(
    function () {
      async function getMovie() {
        // setIsLoading(true);
        try {
          const res = await fetch(`${API_URL}&i=${selectedMovieId}`);
          if (res.ok) {
            const data = await res.json();
            setMovie(data);
            if (!data.Title) return;
            document.title = `Movie | ${data.Title}`;
          } else {
            throw new Error("Something went wrong while fetch movie details");
          }
        } catch (error) {
          setError(error.message);
        }
        // setIsLoading(false);
      }
      getMovie();
      return () => (document.title = "usePopcorn");
    },
    [selectedMovieId]
  );
  return { movie, error };
}
