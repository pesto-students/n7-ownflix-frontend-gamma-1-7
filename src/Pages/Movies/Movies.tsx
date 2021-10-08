import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "../../components/Slider/Slider";
import {
  fetchPopularMoviesAsync,
  fetchLatestMoviesAsync,
  fetchActionMoviesAsync,
  fetchComedyMoviesAsync,
  fetchHorrorMoviesAsync,
  fetchThrillerMoviesAsync,
} from "../../redux/movies/movies.actions";
import { RootState } from "../../redux/rootReducer";
import { requests } from "../../requests";
import "./Movies.scss";
interface IMoviesProps {}

const Movies: React.FunctionComponent<IMoviesProps> = (props) => {
  const dispatch = useDispatch();
  const latestMovies = useSelector(
    (state: RootState) => state.movies.latestMovies
  );
  const popularMovies = useSelector(
    (state: RootState) => state.movies.popularMovies
  );
  const actionMovies = useSelector(
    (state: RootState) => state.movies.actionMovies
  );
  // const dramaMovies = useSelector(
  //     (state: RootState) => state.movies.dramaMovies
  // );
  const comedyMovies = useSelector(
    (state: RootState) => state.movies.comedyMovies
  );
  const horrorMovies = useSelector(
    (state: RootState) => state.movies.horrorMovies
  );
  const thrillerMovies = useSelector(
    (state: RootState) => state.movies.thrillerMovies
  );
  React.useEffect(() => {
    dispatch(fetchPopularMoviesAsync(requests.fetchPopularMovies, 1));
    dispatch(fetchLatestMoviesAsync(requests.fetchLatestMovies, 1));
    dispatch(fetchActionMoviesAsync(requests.fetchActionMovies, 1));
    // dispatch(fetchDramaMoviesAsync(requests.fetchDramaMovies, 1))
    dispatch(fetchComedyMoviesAsync(requests.fetchComedyMovies, 1));
    dispatch(fetchHorrorMoviesAsync(requests.fetchHorrorMovies, 1));
    dispatch(fetchThrillerMoviesAsync(requests.fetchThrillerMovies, 1));
  }, [dispatch]);
  return (
    <div className="Movies">
      <div className="Series__Header">
        <h1>Series</h1>
      </div>
      <Slider
        isLarge={false}
        title="Latest"
        type="movies"
        sliderData={latestMovies}
      ></Slider>
      <Slider
        isLarge={true}
        title="Popular"
        type="movies"
        sliderData={popularMovies}
      ></Slider>
      <Slider
        isLarge={false}
        title="Action"
        type="movies"
        sliderData={actionMovies}
      ></Slider>
      <Slider
        isLarge={false}
        title="Thriller"
        type="movies"
        sliderData={thrillerMovies}
      ></Slider>
      <Slider
        isLarge={false}
        title="Comedy"
        type="movies"
        sliderData={comedyMovies}
      ></Slider>
      <Slider
        isLarge={false}
        title="Horror"
        type="movies"
        sliderData={horrorMovies}
      ></Slider>
    </div>
  );
};

export default Movies;
