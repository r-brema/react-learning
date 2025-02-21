import { useState } from "react";
import { useKey } from "./useKey";
import StarRating from "./StarRating";

function MovieDetails({
  movie,
  handleCloseMovie,
  onAddToList,
  isWatched,
  userMovieRating,
}) {
  useKey("Escape", handleCloseMovie);

  const {
    Title: title,
    imdbID,
    Poster: poster,
    Year: year,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  const [userRating, setUserRating] = useState(0);

  function onSetRating(stars) {
    setUserRating(stars);
  }

  function handleAddToWatchList() {
    const watchedMovie = {
      imdbID,
      title,
      year,
      poster,
      runtime: Number(runtime.split(" ").at(0)),
      imdbRating: Number(imdbRating),
      userRating,
    };
    onAddToList(watchedMovie);
    handleCloseMovie();
  }
  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={handleCloseMovie}>
          &larr;
        </button>
        <img src={poster} alt={`Poster of ${movie} movie`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐️</span>
            {imdbRating} IMDb rating
          </p>
        </div>
      </header>
      {/* <p>{avgRating}</p> */}
      <section>
        <div className="rating">
          <>
            {isWatched ? (
              <p>
                You rated with movie {userMovieRating} <span>⭐️</span>
              </p>
            ) : (
              <StarRating maxRating={10} size={24} onSetRating={onSetRating} />
            )}
            {userRating > 0 && (
              <button className="btn-add" onClick={handleAddToWatchList}>
                + Add to list
              </button>
            )}
          </>
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
      </section>
    </div>
  );
}

export default MovieDetails;
