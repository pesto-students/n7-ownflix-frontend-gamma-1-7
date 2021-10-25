import * as React from 'react';
import './SeriesGenre.scss';
import PosterCard from '../../components/PosterCard/PosterCard';
import { useLocation } from 'react-router-dom';
import { GENRE } from '../../models/genre.enum';
import { useDispatch, useSelector } from 'react-redux';
import { requests } from '../../requests';
import { RootState } from '../../redux/rootReducer';
import SkeletonPoster from '../../components/SkeletonPoster/SkeletonPoster';
import { fetchActionSeriesAsync, fetchLatestSeriesAsync, fetchComedySeriesAsync, fetchHorrorSeriesAsync, fetchPopularSeriesAsync, fetchThrillerSeriesAsync } from '../../redux/series/series.actions';
import { Series } from '../../models/series.interface';

interface ISeriesGenreProps {
}

const SeriesGenre: React.FunctionComponent<ISeriesGenreProps> = (props) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const genre = location.pathname.split('/')[2]
    let page = 1;
    React.useEffect(() => {
        switch (genre) {
            case GENRE.ACTION:
                dispatch(fetchActionSeriesAsync(requests.fetchActionSeries, page));
                break;
            case GENRE.LATEST:
                dispatch(fetchLatestSeriesAsync(requests.fetchLatestSeries, page));
                break;
            case GENRE.COMEDY:
                dispatch(fetchComedySeriesAsync(requests.fetchComedySeries, page));
                break;
            case GENRE.HORROR:
                dispatch(fetchHorrorSeriesAsync(requests.fetchHorrorSeries, page));
                break;
            case GENRE.POPULAR:
                dispatch(fetchPopularSeriesAsync(requests.fetchPopularSeries, page));
                break;
            case GENRE.THRILLER:
                dispatch(fetchThrillerSeriesAsync(requests.fetchThrillerSeries, page));
                break;
        }
    }, [dispatch, genre, page])

    const series = useSelector(
        (state: RootState) => {
            switch (genre) {
                case GENRE.ACTION:
                    return state.series.actionSeries;
                case GENRE.LATEST:
                    return state.series.latestSeries;
                case GENRE.COMEDY:
                    return state.series.comedySeries;
                case GENRE.HORROR:
                    return state.series.horrorSeries;
                case GENRE.POPULAR:
                    return state.series.popularSeries;
                case GENRE.THRILLER:
                    return state.series.thrillerSeries;
            }
        }
    );

    return (
        <div className="SeriesGenre">

            <div className="Popular__Header">
                <h1>{genre.charAt(0).toUpperCase() + genre.slice(1)}</h1>
            </div>
            <div
                className="Popular__wrp"
            >
                {!series?.loading ?
                    series && series.data.length > 0
                        ? series.data.map((series: Series, i: number) => (
                            <PosterCard data={series}
                                key={i}
                            />)
                        )
                        : (
                            <h2 className="Popular__title">
                                No results found.
                            </h2>
                        )
                    :
                    <SkeletonPoster></SkeletonPoster>}
            </div>
        </div>
    );
};

export default SeriesGenre;
