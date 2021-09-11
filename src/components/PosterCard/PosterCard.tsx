import * as React from 'react';
import './PosterCard.scss';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import RemoveIcon from '@material-ui/icons/Remove';
interface PosterCardProps {
    isLarge: boolean
}

const PosterCard: React.FunctionComponent<PosterCardProps> = (props) => {
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
            className={`Row__poster ${isLarge && "Row__poster--big"}`}
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
                    <div className="Row__poster__fallback">
                        <span>{fallbackTitle}</span>
                    </div>
                </>
            )}
            <div className="Row__poster-info">
                <div className="Row__poster-info--iconswrp">
                    <Link
                        className="Row__poster-info--icon icon--play"
                        onClick={handlePlayAction}
                        to={'/play'}
                    >
                        <PlayArrowIcon fontSize="small" />
                    </Link>
                    {!hasAddedinWatchlist
                        ? (
                            <button className='Row__poster-info--icon icon--favourite' onClick={handleAdd}>
                                <AddIcon fontSize="small" />
                            </button>
                        ) : (
                            <button className='Row__poster-info--icon icon--favourite' onClick={handleRemove}>
                                <RemoveIcon fontSize="small" />
                            </button>
                        )}
                </div>
                <div className="Row__poster-info--title">
                    <h3>{fallbackTitle}</h3>
                </div>
                <div className="Row__poster-info--genres">
                    {genresConverted && genresConverted.map(genre => (
                        <span key={`Genre--id_${genre}`} className="genre-title">{genre}</span>
                    ))}
                </div>
            </div>
        </div>
    </div>;
};

export default PosterCard;
