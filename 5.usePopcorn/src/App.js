import { useState } from "react";
import { useMovies, useGetMovie } from "./useMovies";
import NavBar from "./NavBar";
import Main from "./Main";

export default function App() {
  const [searchText, setSearchText] = useState("Batman");
  const [watched, setWatched] = useState(function () {
    const storedMovies = localStorage.getItem("popcornWatchedMovies");
    return storedMovies ? JSON.parse(storedMovies) : [];
  });
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  //custom hooks
  const { isLoading, movies, error } = useMovies(searchText);
  const { movie } = useGetMovie(selectedMovieId);

  function handleMovieClick(movieId) {
    setSelectedMovieId(movieId);
  }
  function handleCloseMovie() {
    setSelectedMovieId(null);
  }
  function handleAddToList(watchedMovie) {
    setWatched((prev) => [...prev, watchedMovie]);
    localStorage.setItem(
      "popcornWatchedMovies",
      JSON.stringify([...watched, watchedMovie])
    );
  }

  function handleDeleteWatchedMovie(movieId) {
    setWatched((prev) => prev.filter((wm) => wm.imdbID !== movieId));
    const storedMovies = localStorage.getItem("popcornWatchedMovies");
    const updatedMovies = JSON.parse(storedMovies).filter(
      (movie) => movie.imdbID !== movieId
    );
    setWatched(updatedMovies);
    localStorage.setItem("popcornWatchedMovies", JSON.stringify(updatedMovies));
  }
  return (
    <>
      <NavBar
        moviesCount={movies.length}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <Main
        movies={movies}
        watched={watched}
        isLoading={isLoading}
        errorMessage={error}
        selectedMovie={selectedMovieId}
        movie={movie}
        handleMovieClick={handleMovieClick}
        handleCloseMovie={handleCloseMovie}
        onAddToList={handleAddToList}
        onDeleteWatchedMovie={handleDeleteWatchedMovie}
      />
    </>
  );
}
