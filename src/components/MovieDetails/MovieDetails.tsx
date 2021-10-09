import * as React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import "./MovieDetails.scss";
import CloseIcon from "@material-ui/icons/Close";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import theme from "../../theme";
import { Movie } from "../../models/movie.interface";
import { Series } from "../../models/series.interface";
import { getFormattedDuration, getPlot } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import {
  addToWatchlistAsync,
  removeFromWatchlistAsync,
} from "../../redux/watchlist/watchlist.actions";

interface IMovieDetailsProps {
  modalOpen: boolean;
  closeModal: any;
  modalData: Movie | Series;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: "1200px",
  height: "90%",
  bgcolor: "background.paper",
  backgroundColor: "#101011",
  border: `1px solid ${theme.palette.primary.main}`,
  boxShadow: 24,
  borderRadius: 12,
  p: 4,
};

const MovieDetails: React.FunctionComponent<IMovieDetailsProps> = (props) => {
  const dispatch = useDispatch();
  const [selectedEpisode, setSelectedEpisode] = React.useState<number>(1);
  const {
    title,
    duration,
    rated,
    images,
    imagesVertical,
    imdbRating,
    slug,
    genres,
  } = props.modalData as Movie;
  const runningTime = getFormattedDuration(duration);
  const { noOfEpisodes } = props.modalData as Series;
  var episodes = [];
  for (var i = 1; i <= noOfEpisodes; i++) {
    episodes.push(`Episode ${i}`);
  }
  const plot = getPlot(props.modalData.plot || "");
  const thumbNail =
    images.length > 1
      ? images[1].location.cloudFrontUrl
      : images[0].location.cloudFrontUrl;
  const verticalImage =
    images.length > 1
      ? imagesVertical[1].location.cloudFrontUrl
      : imagesVertical[0].location.cloudFrontUrl;

  const onWatch = () => {
    let path = "";
    if (noOfEpisodes) {
      path = `/series/s/${slug}/${selectedEpisode}`;
    } else {
      path = `/movies/s/${slug}`;
    }
    window.location.href = path;
  };
  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setSelectedEpisode(value);
  };
  const watchlist = useSelector((state: RootState) => state.watchlist);
  let hasAddedinWatchlist = false;
  if (!noOfEpisodes) {
    hasAddedinWatchlist =
      watchlist.movies.filter((w: any) => w.movie._id === props.modalData._id)
        .length > 0;
  } else {
    hasAddedinWatchlist =
      watchlist.series.filter((w: any) => w.series._id === props.modalData._id)
        .length > 0;
  }
  const handleAdd = (event: any) => {
    event.stopPropagation();
    if (!noOfEpisodes) {
      dispatch(
        addToWatchlistAsync(
          "/watch-list/",
          {
            entityId: props.modalData._id,
            user: localStorage.getItem("user"),
            entity: "movies",
          },
          "movies",
          props.modalData
        )
      );
    } else {
      dispatch(
        addToWatchlistAsync(
          "/watch-list/",
          {
            entityId: props.modalData._id,
            user: localStorage.getItem("user"),
            entity: "series",
          },
          "series",
          props.modalData
        )
      );
    }
  };
  const handleRemove = (event: any) => {
    event.stopPropagation();
    if (!noOfEpisodes) {
      const addedList = watchlist.movies.find(
        (w: any) => w.movie._id === props.modalData._id
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
        (w: any) => w.series._id === props.modalData._id
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

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.modalOpen}
        onClose={props.closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        className="movie-details-modal"
      >
        <Fade in={props.modalOpen}>
          <Box sx={style} className="modal-modal">
            <div
              className="modal-bg-img"
              style={{ backgroundImage: `url(${thumbNail})` }}
            ></div>
            <div className="close-button" onClick={props.closeModal}>
              <CloseIcon />
            </div>
            <div className="header-content">
              <div className="home-poster">
                <img src={verticalImage} alt="poster" />
              </div>
              <div className="poster-details">
                <div className="poster-details-1">
                  <h1 className="movie-title">{title}</h1>
                  <div className="movie-details">
                    <div className="movie-details-runningTime">
                      {runningTime} - {rated}
                    </div>
                    <div className="movie-details-genres">
                      {genres &&
                        genres.map((genre) => (
                          <span
                            key={`Genre--id_${genre._id}`}
                            className="genre-title"
                          >
                            {genre.title}
                          </span>
                        ))}
                    </div>
                    <div className="movie-details-rating">
                      Rating: {imdbRating}
                    </div>
                  </div>
                  <p className="movie-description">{plot}</p>
                  <div className="movie-options">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={onWatch}
                      className="movie-options-options"
                    >
                      Watch
                    </Button>
                    {noOfEpisodes ? (
                      <div className="movie-options-options">
                        <FormControl>
                          <Select
                            displayEmpty
                            value={selectedEpisode}
                            onChange={handleChange}
                            input={<OutlinedInput />}
                            renderValue={(selected: any) => {
                              if (selected === 0) {
                                return <em>Episodes</em>;
                              }

                              return `Episode ${selected}`;
                            }}
                            inputProps={{ "aria-label": "Without label" }}
                          >
                            <MenuItem disabled value="">
                              <em>Episodes</em>
                            </MenuItem>
                            {episodes.map((name, i) => (
                              <MenuItem key={name} value={i + 1}>
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                    ) : null}
                    {!hasAddedinWatchlist ? (
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleAdd}
                      >
                        + Add to my list
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleRemove}
                      >
                        - Remove from my list
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default MovieDetails;
