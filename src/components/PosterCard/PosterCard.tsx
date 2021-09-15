import * as React from 'react';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import RemoveIcon from '@material-ui/icons/Remove';
import './PosterCard.scss';

interface IPosterCardProps {
}

const PosterCard: React.FunctionComponent<IPosterCardProps> = (props) => {
    let fallbackTitle = 'Money Heist';
    let genresConverted = ['Action', 'Thriller'];
    let backdrop_path = 'https://image.tmdb.org/t/p/original//gFZriCkpJYsApPZEF3jhxL4yLzG.jpg';
    let hasAddedinWatchlist = false;
    let fallbackImageUrl = 'https://image.tmdb.org/t/p/original//gFZriCkpJYsApPZEF3jhxL4yLzG.jpg'

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
        <div
            className='PosterCard'
            onClick={handleModalOpening}
        >
            {backdrop_path ? (
                <img src={backdrop_path} alt={fallbackTitle} />
            ) : (
                <>
                    <img src={fallbackImageUrl} alt={fallbackTitle} />
                    <div className='PosterCard__fallback'>
                        <span>{fallbackTitle}</span>
                    </div>
                </>
            )}
            <div className="PosterCard__info">
                <div className="PosterCard__info--iconswrp">
                    <Link
                        className="PosterCard__info--icon icon--play"
                        onClick={handlePlayAction}
                        to={'/play'}
                    >
                        <PlayArrowIcon fontSize="small" />

                    </Link>
                    {!hasAddedinWatchlist
                        ? (
                            <button className='PosterCard__info--icon icon--favourite' onClick={handleAdd}>
                                <AddIcon fontSize="small" />
                            </button>
                        ) : (
                            <button className='PosterCard__info--icon icon--favourite' onClick={handleRemove}>
                                <RemoveIcon fontSize="small" />
                            </button>
                        )}
                    {/* <button className='PosterCard__info--icon icon--toggleModal'>
                        <FaChevronDown onClick={handleModalOpening}/>
                    </button> */}
                </div>
                <div className="PosterCard__info--title">
                    <h3>{fallbackTitle}</h3>
                </div>
                <div className="PosterCard__info--genres">
                    {genresConverted && genresConverted.map(genre => (
                        <span key={`Genre--id_${genre}`} className="genre-title">{genre}</span>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default PosterCard;
