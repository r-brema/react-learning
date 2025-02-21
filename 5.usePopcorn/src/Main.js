import MoviesList from "./MoviesList";
import WatchedSummary from "./WatchedSummary";
import WatchedMoviesList from "./WatchedMoviesList";
import MovieBox from "./MovieBox";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import MovieDetails from "./MovieDetails";

function Main({
  movies,
  watched,
  isLoading,
  errorMessage,
  selectedMovie,
  handleMovieClick,
  movie,
  handleCloseMovie,
  onAddToList,
  onDeleteWatchedMovie,
}) {
  const movieExist = watched.filter((wm) => wm.imdbID === selectedMovie);
  const isWatched = movieExist.length > 0;
  const userMovieRating = isWatched ? movieExist[0].userRating : 0;
  return (
    <main className="main">
      <MovieBox>
        {isLoading && <Loader />}
        {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
        {!isLoading && !errorMessage && (
          <MoviesList movies={movies} handleMovieClick={handleMovieClick} />
        )}
      </MovieBox>
      {selectedMovie ? (
        <MovieBox>
          <MovieDetails
            movie={movie}
            handleCloseMovie={handleCloseMovie}
            onAddToList={onAddToList}
            isWatched={isWatched}
            userMovieRating={userMovieRating}
          />
        </MovieBox>
      ) : (
        <MovieBox>
          {watched.length === 0 ? (
            <ErrorMessage errorMessage="You havent watched any movies" />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatchedMovie={onDeleteWatchedMovie}
              />
            </>
          )}
        </MovieBox>
      )}
    </main>
  );
}

export default Main;
