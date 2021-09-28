import * as React from 'react';
import { useSelector } from 'react-redux';
import PosterCard from '../../components/PosterCard/PosterCard';
import { Movie } from '../../models/movie.interface';
import { RootState } from '../../redux/rootReducer';
import './Watchlist.scss';

interface IWatchlistProps {
}

const Watchlist: React.FunctionComponent<IWatchlistProps> = (props) => {

    const watchlist = useSelector(
        (state: RootState) => state.watchlist
    );

    const movies = watchlist.movies;
    const series = watchlist.series
    return (
        <div className="Watchlist">
            <div className="Watchlist__Header">
                <h1>Watchlist</h1>
            </div>
            <div
                className="Watchlist__wrp"
            >
                {movies && movies.length > 0
                    ? movies.map((watchlist: any) => (
                        <PosterCard
                            key={watchlist.watchlistId} data={watchlist.movie}
                        />)
                    )
                    : (
                        <h2 className="Watchlist__title">
                            No results found.
                        </h2>
                    )
                }
            </div>
        </div>
    );
};

export default Watchlist;
