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
import { Genre } from '../../models/genres.interface';
import { Series } from '../../models/series.interface';

interface SliderPosterCardProps {
    isLarge: boolean;
    data: Movie | Series;
}

const SliderPosterCard: React.FunctionComponent<SliderPosterCardProps> = (props) => {
    let { title, images, imagesVertical, slug } = props.data;

    let genresConverted = [props.data.genres];

    let poster_path = imagesVertical[0].location.cloudFrontUrl;
    let backdrop_path = images[0].location.cloudFrontUrl;
    let isLarge = props.isLarge;
    let hasAddedinWatchlist = false;
    const [modalOpen, setModalOpen] = React.useState(false);

    const closeModal = () => {
        setModalOpen(false);
    }


    const handleAdd = (event: any) => {
        event.stopPropagation();
        // dispatch(addToFavourites({ ...item, isFavourite }));
    };
    const handleRemove = (event: any) => {
        event.stopPropagation();
        // dispatch(removeFromFavourites({ ...item, isFavourite }));
    };
    const handleModalOpening = () => {
        // dispatch(showModalDetail({ ...item, fallbackTitle, genresConverted, isFavourite }));
    }
    const handlePlayAction = (event: any) => {
        event.stopPropagation();

    };
    return (
        <div>
            <MovieDetails modalOpen={modalOpen} modalData={props.data} closeModal={closeModal} />
            <div
                className={`SliderPosterCard__poster ${isLarge && "SliderPosterCard__poster--big"}`}
                onClick={handleModalOpening}
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
                            onClick={handlePlayAction}
                            to={`/movie/${slug}`}
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
                        {genresConverted && genresConverted.map(genre => (
                            <span key={`Genre--id_${genre}`} className="genre-title">{genre}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SliderPosterCard;
