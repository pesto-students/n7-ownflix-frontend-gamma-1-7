import * as React from 'react';
import { Helmet } from 'react-helmet';
import Slider from '../../components/Slider/Slider';
import './homepage.scss';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActionMoviesAsync, fetchComedyMoviesAsync, fetchDramaMoviesAsync, fetchHorrorMoviesAsync, fetchLatestMoviesAsync, fetchPopularMoviesAsync, fetchThrillerMoviesAsync } from '../../redux/movies/movies.actions';
import { requests } from '../../requests';
import { RootState } from '../../redux/rootReducer';
import { getPlot } from '../../utils/utils';
import { useHistory } from 'react-router-dom';
import { addToWatchlistAsync, removeFromWatchlistAsync } from '../../redux/watchlist/watchlist.actions';
import SkeletonBanner from '../../components/SkeletonBanner/SkeletonBanner';

const Homepage = () => {

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
        dispatch(fetchPopularMoviesAsync(requests.fetchPopularMovies, 1))
        dispatch(fetchLatestMoviesAsync(requests.fetchLatestMovies, 1))
        dispatch(fetchActionMoviesAsync(requests.fetchActionMovies, 1))
        // dispatch(fetchDramaMoviesAsync(requests.fetchDramaMovies, 1))
        dispatch(fetchComedyMoviesAsync(requests.fetchComedyMovies, 1))
        dispatch(fetchHorrorMoviesAsync(requests.fetchHorrorMovies, 1))
        dispatch(fetchThrillerMoviesAsync(requests.fetchThrillerMovies, 1))
    }, [dispatch])
    const history = useHistory();

    const onWatch = (slug: string) => {
        let path = `movie/${slug}`;
        history.push(path);
    }
    const watchlist = useSelector(
        (state: RootState) => state.watchlist
    );
    const hasAddedinWatchlist = watchlist.movies.filter((w: any) => w.movie._id === popularMovies.data[0]._id).length > 0

    const handleAdd = (event: any) => {
        event.stopPropagation();
        dispatch(addToWatchlistAsync('/watch-list/', { entityId: popularMovies.data[0]._id, user: localStorage.getItem("user"), entity: 'movies' }, 'movies', popularMovies.data[0]));
    };
    const handleRemove = (event: any) => {
        event.stopPropagation();
        const addedList = watchlist.movies.find((w: any) => w.movie._id === popularMovies.data[0]._id)
        dispatch(removeFromWatchlistAsync(`/watch-list/${addedList.watchlistId}`, addedList.watchlistId, 'movies'))
    };
    return (
        <>
            <Helmet defer={false}>
                <title>{`Home - ${process.env.REACT_APP_NAME}`}</title>
            </Helmet>
            <div className="HomePage">
                <div className="main-header">
                    {!popularMovies.loading && popularMovies.data.length > 0 ?
                        <>
                            <div className="header">
                                <div className="image" style={{ backgroundImage: `url(${popularMovies.data[0].images[0].location.cloudFrontUrl})` }}>
                                </div>
                            </div>
                            <div className="header-content">
                                <img src={popularMovies.data[0].imagesVertical[0].location.cloudFrontUrl} alt="poster" className="home-poster" />
                                <div className="poster-details">
                                    <div className="poster-details-1">
                                        <h2 className="movie-type">Most Popular</h2>
                                        <h1 className="movie-title">{popularMovies.data[0].title}</h1>
                                        <div className="movie-details">
                                            <div className="movie-details-runningTime">{popularMovies.data[0].runningTime} - {popularMovies.data[0].rated}</div>
                                            <div className="movie-details-genres">
                                                {popularMovies.data[0].genres && popularMovies.data[0].genres.map(genre => (
                                                    <span key={`Genre--id_${genre._id}`} className="genre-title">{genre.title}</span>
                                                ))}
                                            </div>
                                            <div className="movie-details-rating">Rating: {popularMovies.data[0].imdbRating}</div>
                                        </div>
                                        <p className="movie-description">
                                            {getPlot(popularMovies.data[0].plot || '')}
                                        </p>
                                        <div className="movie-options">
                                            <Button variant="contained" color="primary" onClick={() => onWatch(popularMovies.data[0].slug)} className="movie-options-options">Watch</Button>
                                            {!hasAddedinWatchlist ?
                                                <Button variant="outlined" color="primary" onClick={handleAdd} >+ Add to my list</Button> :
                                                <Button variant="contained" color="primary" onClick={handleRemove} >- Remove from my list</Button>}
                                        </div>
                                    </div>
                                    <div className="poster-details-2">
                                        <div className="poster-images">
                                            {popularMovies.data[0].images.length ? <img src={popularMovies.data[0].images[0].location.cloudFrontUrl} alt="poster" /> : null}
                                            {popularMovies.data[0].images.length > 1 ? <img src={popularMovies.data[0].images[1].location.cloudFrontUrl} alt="poster1" /> : null}
                                            {popularMovies.data[0].images.length > 2 ? <img src={popularMovies.data[0].images[2].location.cloudFrontUrl} alt="poster1" /> : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </> : <SkeletonBanner />} </div>
                <div className="Homepage__content">
                    <Slider isLarge={false} title='Latest' sliderData={latestMovies}></Slider>
                    <Slider isLarge={true} title='Popular' sliderData={popularMovies}></Slider>
                    <Slider isLarge={false} title='Action' sliderData={actionMovies}></Slider>
                    {/* <Slider isLarge={false} title='Drama' sliderData={dramaMovies}></Slider> */}
                    <Slider isLarge={false} title='Thriller' sliderData={thrillerMovies}></Slider>
                    <Slider isLarge={false} title='Comedy' sliderData={comedyMovies}></Slider>
                    <Slider isLarge={false} title='Horror' sliderData={horrorMovies}></Slider>
                </div>
            </div>
        </>
    )
}

export default Homepage;