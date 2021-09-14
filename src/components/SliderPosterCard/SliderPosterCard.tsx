import * as React from 'react';
import './SliderPosterCard.scss';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import RemoveIcon from '@material-ui/icons/Remove';

interface SliderPosterCardProps {
    isLarge: boolean
}

const SliderPosterCard: React.FunctionComponent<SliderPosterCardProps> = (props) => {
    let fallbackTitle = 'Money Heist';
    let genresConverted = ['Action', 'Thriller'];
    let poster_path = 'https://image.tmdb.org/t/p/original//reEMJA1uzscCbkpeRJeTT2bjqUp.jpg';
    let backdrop_path = 'https://image.tmdb.org/t/p/original//gFZriCkpJYsApPZEF3jhxL4yLzG.jpg';
    let isLarge = props.isLarge;
    let hasAddedinWatchlist = false;


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
    return <div>
        <div
            className={`SliderPosterCard__poster ${isLarge && "SliderPosterCard__poster--big"}`}
            onClick={handleModalOpening}
        >
            {isLarge ? (
                poster_path ? (
                    <img src={poster_path} alt={fallbackTitle} />
                ) : ""
            ) : backdrop_path ? (
                <img src={backdrop_path} alt={fallbackTitle} />
            ) : (
                <>
                    <img src='images/home-image.jpg' alt={fallbackTitle} />
                    <div className="SliderPosterCard__poster__fallback">
                        <span>{fallbackTitle}</span>
                    </div>
                </>
            )}
            <div className="SliderPosterCard__poster-info">
                <div className="SliderPosterCard__poster-info--iconswrp">
                    <Link
                        className="SliderPosterCard__poster-info--icon icon--play"
                        onClick={handlePlayAction}
                        to={'/play'}
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
                </div>
                <div className="SliderPosterCard__poster-info--title">
                    <h3>{fallbackTitle}</h3>
                </div>
                <div className="SliderPosterCard__poster-info--genres">
                    {genresConverted && genresConverted.map(genre => (
                        <span key={`Genre--id_${genre}`} className="genre-title">{genre}</span>
                    ))}
                </div>
            </div>
        </div>
    </div>;
};

export default SliderPosterCard;
