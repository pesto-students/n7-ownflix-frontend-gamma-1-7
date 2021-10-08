import * as React from "react";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import RemoveIcon from "@material-ui/icons/Remove";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import "./PosterCard.scss";
import { useDispatch, useSelector } from "react-redux";
import { Movie } from "../../models/movie.interface";
import { Series } from "../../models/series.interface";
import { RootState } from "../../redux/rootReducer";
import {
  addToWatchlistAsync,
  removeFromWatchlistAsync,
} from "../../redux/watchlist/watchlist.actions";
import fallbackImageUrl from "../../images/fallback-image.png";
import MovieDetails from "../MovieDetails/MovieDetails";
interface IPosterCardProps {
  data: Movie | Series;
}

const PosterCard: React.FunctionComponent<IPosterCardProps> = (props) => {
  let { title, images, slug, genres } = props.data;
  let { noOfEpisodes } = props.data as Series;

  let backdrop_path = images[0].location.cloudFrontUrl;
  const [modalOpen, setModalOpen] = React.useState(false);
  const dispatch = useDispatch();
  const watchlist = useSelector((state: RootState) => state.watchlist);
  let hasAddedinWatchlist = false;
  if (!noOfEpisodes) {
    hasAddedinWatchlist =
      watchlist.movies.filter((w: any) => w.movie._id === props.data._id)
        .length > 0;
  } else {
    hasAddedinWatchlist =
      watchlist.series.filter((w: any) => w.series._id === props.data._id)
        .length > 0;
  }
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAdd = (event: any) => {
    event.stopPropagation();
    if (!noOfEpisodes) {
      dispatch(
        addToWatchlistAsync(
          "/watch-list/",
          {
            entityId: props.data._id,
            user: localStorage.getItem("user"),
            entity: "movies",
          },
          "movies",
          props.data
        )
      );
    } else {
      dispatch(
        addToWatchlistAsync(
          "/watch-list/",
          {
            entityId: props.data._id,
            user: localStorage.getItem("user"),
            entity: "series",
          },
          "series",
          props.data
        )
      );
    }
  };
  const handleRemove = (event: any) => {
    event.stopPropagation();
    if (!noOfEpisodes) {
      const addedList = watchlist.movies.find(
        (w: any) => w.movie._id === props.data?._id
      );
      dispatch(
        removeFromWatchlistAsync(
          `/watch-list/${addedList.watchlistId}`,
          addedList.watchlistId,
          "movies"
        )
      );
    } else {
      const addedList = watchlist.series.find(
        (w: any) => w.series._id === props.data?._id
      );
      dispatch(
        removeFromWatchlistAsync(
          `/watch-list/${addedList.watchlistId}`,
          addedList.watchlistId,
          "series"
        )
      );
    }
  };

  const handlePlayAction = (event: any) => {
    event.stopPropagation();
  };

  return (
    <div className="PosterCard">
      <MovieDetails
        modalOpen={modalOpen}
        modalData={props.data}
        closeModal={closeModal}
      />
      <div
        onClick={() => {
          setModalOpen(true);
        }}
      >
        {backdrop_path ? (
          <img src={backdrop_path} alt={title} />
        ) : (
          <>
            <img src={fallbackImageUrl} alt={title} />
            <div className="PosterCard__fallback">
              <span>{title}</span>
            </div>
          </>
        )}
        <div className="PosterCard__info">
          <div className="PosterCard__info--iconswrp">
            <a
              className="SliderPosterCard__poster-info--icon icon--play"
              href={
                !noOfEpisodes
                  ? `${process.env.REACT_APP_URL}/movies/s/${slug}`
                  : `${process.env.REACT_APP_URL}/series/s/${slug}/1`
              }
              onClick={(e) => {
                e.stopPropagation();
                // setModalOpen(true);
              }}
            >
              <PlayArrowIcon fontSize="small" />
            </a>
            {!hasAddedinWatchlist ? (
              <button
                className="PosterCard__info--icon icon--favourite"
                onClick={handleAdd}
              >
                <AddIcon fontSize="small" />
              </button>
            ) : (
              <button
                className="PosterCard__info--icon icon--favourite"
                onClick={handleRemove}
              >
                <RemoveIcon fontSize="small" />
              </button>
            )}
            <button
              className="SliderPosterCard__poster-info--icon icon--favourite"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              <KeyboardArrowDownIcon fontSize="small" />
            </button>
          </div>
          <div className="PosterCard__info--title">
            <h3>{title}</h3>
          </div>
          <div className="PosterCard__info--genres">
            {genres &&
              genres.map((genre) => (
                <span key={`Genre--id_${genre._id}`} className="genre-title">
                  {genre.title}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosterCard;
