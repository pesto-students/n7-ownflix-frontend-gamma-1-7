import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Slider from '../../components/Slider/Slider';
import WatchflixPlayer from '../../components/WatchflixPlayer/WatchflixPlayer';
import { Movie } from '../../models/movie.interface';
import { fetchMovieAsync } from '../../redux/player/player.actions';
import { RootState } from '../../redux/rootReducer';
import './Playerpage.scss';

const Playerpage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    console.log(location.pathname);
    const movieSlug = location.pathname.split('/')[2]
    console.log(movieSlug)
    let recommendedMovies = {
        ...useSelector(
            (state: RootState) => state.movies.recommendedMovies
        )
    };
    recommendedMovies.data = recommendedMovies.data.filter(m => {
        return m.slug !== movieSlug
    })
    const playerData: {
        loading: boolean;
        error: string;
        data: Movie | null;
    } = useSelector(
        (state: RootState) => state.player
    );

    React.useEffect(() => {
        dispatch(fetchMovieAsync(`/movies/s/${movieSlug}`))
    }, [dispatch, movieSlug])

    return (
        <div className="Playerpage">
            <WatchflixPlayer playerData={playerData} />
            <Slider isLarge={false} title='Recommended Movies' sliderData={recommendedMovies}></Slider>
        </div>
    )
}

export default Playerpage;