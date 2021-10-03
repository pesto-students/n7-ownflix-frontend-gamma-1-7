import * as React from 'react';
import './SliderPosterCard.scss';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import RemoveIcon from '@material-ui/icons/Remove';
import MovieDetails from '../MovieDetails/MovieDetails';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { Movie } from '../../models/movie.interface';
import { RootState } from '../../redux/rootReducer';
import { Series } from '../../models/series.interface';
import { addToWatchlistAsync, removeFromWatchlistAsync } from '../../redux/watchlist/watchlist.actions';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
interface SliderPosterCardProps {
    isLarge: boolean;
    data: Movie | Series;
}

const SliderPosterCard: React.FunctionComponent<SliderPosterCardProps> = (props) => {
    let { title, images, imagesVertical, slug, genres, duration, halfwatchedTime } = (props.data as Movie);
    let watchedTime = 0;
    if (duration && halfwatchedTime) {
        watchedTime = (100 * halfwatchedTime) / duration;
    }
    let { noOfEpisodes } = (props.data as Series);

    let poster_path = imagesVertical[0].location.cloudFrontUrl;
    let backdrop_path = images[0].location.cloudFrontUrl;
    let isLarge = props.isLarge;
    const [modalOpen, setModalOpen] = React.useState(false);
    const dispatch = useDispatch();
    const watchlist = useSelector(
        (state: RootState) => state.watchlist
    );
    const hasAddedinWatchlist = watchlist.movies.filter((w: any) => w.movie._id === props.data._id).length > 0
    const closeModal = () => {
        setModalOpen(false);
    }


    const handleAdd = (event: any) => {
        event.stopPropagation();
        dispatch(addToWatchlistAsync('/watch-list/', { entityId: props.data._id, user: localStorage.getItem("user"), entity: 'movies' }, 'movies', props.data));
    };
    const handleRemove = (event: any) => {
        event.stopPropagation();
        const addedList = watchlist.movies.find((w: any) => w.movie._id === props.data?._id)
        dispatch(removeFromWatchlistAsync(`/watch-list/${addedList.watchlistId}`, addedList.watchlistId, 'movies'))
    };
    const handlePlayAction = (e: any, slug: any) => {
        e.stopPropagation();
        window.location.href = '/movie/' + slug;
    };

    return (
        <div>
            <MovieDetails modalOpen={modalOpen} modalData={props.data} closeModal={closeModal} />
            <div
                className={`SliderPosterCard__poster ${isLarge && "SliderPosterCard__poster--big"}`}
                onClick={() => { setModalOpen(true) }}
            >
                {isLarge ? (
                    poster_path ? (
                        <img src={poster_path} alt={title} />
                    ) : ""
                ) : backdrop_path ? (
                    <img src={backdrop_path} alt={title} />
                ) : (
                    <>
                        <img src='images/home-image.jpg' alt={title} />
                        <div className="SliderPosterCard__poster__fallback">
                            <span>{title}</span>
                        </div>
                    </>
                )}
                <div className="SliderPosterCard__poster-info" onClick={() => { setModalOpen(true) }}>
                    <div className="SliderPosterCard__poster-info--iconswrp">
                        <Link
                            className="SliderPosterCard__poster-info--icon icon--play"
                            to={!noOfEpisodes ? `/movies/s/${slug}` : `/series/s/${slug}`}
                        >
                            <PlayArrowIcon fontSize="small" />
                        </Link>
                        {!hasAddedinWatchlist
                            ? (
                                <button className='SliderPosterCard__poster-info--icon icon--favourite' onClick={handleAdd}>
                                    <AddIcon fontSize="small" />
                                </button>
                            ) : (
                                <button className='SliderPosterCard__poster-info--icon icon--favourite' onClick={handleRemove}>
                                    <RemoveIcon fontSize="small" />
                                </button>
                            )}
                        <button className='SliderPosterCard__poster-info--icon icon--favourite' onClick={() => { setModalOpen(true) }}>
                            <KeyboardArrowDownIcon fontSize="small" />
                        </button>
                    </div>
                    <div className="SliderPosterCard__poster-info--title">
                        <h3>{title}</h3>
                    </div>
                    <div className="SliderPosterCard__poster-info--genres">
                        {genres && genres.map(genre => (
                            <span key={`Genre--id_${genre._id}`} className="genre-title">{genre.title}</span>
                        ))}
                    </div>
                    {watchedTime > 0 &&
                        <LinearProgress variant="determinate" style={{ width: "95%", marginTop: '4px' }} value={watchedTime} />
                    }
                </div>
            </div>
        </div>
    );
};

export default SliderPosterCard;


