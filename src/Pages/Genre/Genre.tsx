import * as React from "react";
import "./Genre.scss";
import PosterCard from "../../components/PosterCard/PosterCard";
import { useLocation } from "react-router-dom";
import { GENRE } from "../../models/genre.enum";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchActionMoviesAsync,
  fetchComedyMoviesAsync,
  fetchHorrorMoviesAsync,
  fetchLatestMoviesAsync,
  fetchPopularMoviesAsync,
  fetchThrillerMoviesAsync,
} from "../../redux/movies/movies.actions";
import { requests } from "../../requests";
import { RootState } from "../../redux/rootReducer";
import { Movie } from "../../models/movie.interface";
import SkeletonPoster from "../../components/SkeletonPoster/SkeletonPoster";

interface IGenreProps {}

const Genre: React.FunctionComponent<IGenreProps> = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const genre = location.pathname.split("/")[2];
  let page = 1;
  React.useEffect(() => {
    switch (genre) {
      case GENRE.ACTION:
        dispatch(fetchActionMoviesAsync(requests.fetchActionMovies, page));
        break;
      case GENRE.LATEST:
        dispatch(fetchLatestMoviesAsync(requests.fetchLatestMovies, page));
        break;
      case GENRE.COMEDY:
        dispatch(fetchComedyMoviesAsync(requests.fetchComedyMovies, page));
        break;
      case GENRE.HORROR:
        dispatch(fetchHorrorMoviesAsync(requests.fetchHorrorMovies, page));
        break;
      case GENRE.POPULAR:
        dispatch(fetchPopularMoviesAsync(requests.fetchPopularMovies, page));
        break;
      case GENRE.THRILLER:
        dispatch(fetchThrillerMoviesAsync(requests.fetchThrillerMovies, page));
        break;
    }
  }, [dispatch, genre, page]);

  const movies = useSelector((state: RootState) => {
    switch (genre) {
      case GENRE.ACTION:
        return state.movies.actionMovies;
      case GENRE.LATEST:
        return state.movies.latestMovies;
      case GENRE.COMEDY:
        return state.movies.comedyMovies;
      case GENRE.HORROR:
        return state.movies.horrorMovies;
      case GENRE.POPULAR:
        return state.movies.popularMovies;
      case GENRE.THRILLER:
        return state.movies.thrillerMovies;
    }
  });

  return (
    <div className="Genre">
      <div className="Genre__Header">
        <h1>{genre.charAt(0).toUpperCase() + genre.slice(1)}</h1>
      </div>
      <div className="Genre__wrp">
        {!movies?.loading ? (
          movies && movies.data.length > 0 ? (
            movies.data.map((movie: Movie, i: number) => (
              <PosterCard data={movie} key={i} />
            ))
          ) : (
            <h2 className="Genre__title">No results found.</h2>
          )
        ) : (
          <SkeletonPoster></SkeletonPoster>
        )}
      </div>
    </div>
  );
};

export default Genre;
