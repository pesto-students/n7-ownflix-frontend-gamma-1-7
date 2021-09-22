import * as React from 'react';
import Slider from '../../components/Slider/Slider';
import './homepage.scss';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularMoviesAsync } from '../../redux/movies/movies.actions';
import { requests } from '../../requests';
import { RootState } from '../../redux/rootReducer';

const Homepage = () => {

    const dispatch = useDispatch();
    const popularMovies = useSelector(
        (state: RootState) => state.movies.popularMovies
    );
    React.useEffect(() => {
        dispatch(fetchPopularMoviesAsync(requests.fetchPopularMovies, 1))
    }, [dispatch])
    return (
        <div className="HomePage">
            <div className="main-header">
                <div className="header">
                    <div className="image" style={{ backgroundImage: `url(${`https://image.tmdb.org/t/p/original//gFZriCkpJYsApPZEF3jhxL4yLzG.jpg`})` }}>
                    </div>
                </div>
                <div className="header-content">
                    <img src="https://image.tmdb.org/t/p/original//reEMJA1uzscCbkpeRJeTT2bjqUp.jpg" alt="poster" className="home-poster" />
                    <div className="poster-details">
                        <div className="poster-details-1">
                            <h2 className="movie-type">Most Popular</h2>
                            <h1 className="movie-title">Movie Name</h1>
                            <div className="movie-details">
                                <div className="movie-details-details">1 hr 54 min - R</div>
                                <div className="movie-details-details">Drama/Mystery</div>
                                <div className="movie-details-details">89% Match</div>
                            </div>
                            <p className="movie-description">
                                Money Heist is a Spanish heist crime drama television series created by Álex Pina. The series traces two long-prepared heists led by the Professor, one on the Royal Mint of Spain, and one on the Bank of Spain, told from the perspective of one of the robbers, Tokyo
                            </p>
                            <div className="movie-options">
                                <Button variant="contained" color="primary" className="movie-options-options">Watch</Button>
                                <Button variant="outlined" color="primary">+ Add to My List</Button>
                            </div>
                        </div>
                        <div className="poster-details-2">
                            <div className="poster-images">
                                <img src="https://image.tmdb.org/t/p/original//gFZriCkpJYsApPZEF3jhxL4yLzG.jpg" alt="poster" />
                                <img src="https://image.tmdb.org/t/p/original//gFZriCkpJYsApPZEF3jhxL4yLzG.jpg" alt="poster" />
                                <img src="https://image.tmdb.org/t/p/original//gFZriCkpJYsApPZEF3jhxL4yLzG.jpg" alt="poster" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Homepage__content">
                <Slider isLarge={false} title='Popular Movies' data={popularMovies}></Slider>
                <Slider isLarge={true} title='Popular TV Series' data={popularMovies}></Slider>
                <Slider isLarge={false} title='Action' data={popularMovies}></Slider>
                <Slider isLarge={false} title='Drama' data={popularMovies}></Slider>

            </div>
        </div>
    )
}

export default Homepage;