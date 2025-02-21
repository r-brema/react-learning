import Movie from "./Movie";

function MoviesList({ movies, handleMovieClick }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          key={movie.imdbID}
          movie={movie}
          handleMovieClick={handleMovieClick}
        />
      ))}
    </ul>
  );
}

export default MoviesList;
