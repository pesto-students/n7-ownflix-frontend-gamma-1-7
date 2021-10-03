import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from '../../components/Slider/Slider';
import { RootState } from '../../redux/rootReducer';
import { fetchPopularSeriesAsync, fetchLatestSeriesAsync, fetchActionSeriesAsync, fetchComedySeriesAsync, fetchHorrorSeriesAsync, fetchThrillerSeriesAsync } from '../../redux/series/series.actions';
import { requests } from '../../requests';
import './Series.scss'
interface ISeriesProps {
}

const Series: React.FunctionComponent<ISeriesProps> = (props) => {
    const dispatch = useDispatch();
    const latestSeries = useSelector(
        (state: RootState) => state.series.latestSeries
    );
    const popularSeries = useSelector(
        (state: RootState) => state.series.popularSeries
    );
    const actionSeries = useSelector(
        (state: RootState) => state.series.actionSeries
    );
    // const dramaSeries = useSelector(
    //     (state: RootState) => state.series.dramaSeries
    // );
    const comedySeries = useSelector(
        (state: RootState) => state.series.comedySeries
    );
    const horrorSeries = useSelector(
        (state: RootState) => state.series.horrorSeries
    );
    const thrillerSeries = useSelector(
        (state: RootState) => state.series.thrillerSeries
    );
    React.useEffect(() => {
        dispatch(fetchPopularSeriesAsync(requests.fetchPopularSeries, 1))
        dispatch(fetchLatestSeriesAsync(requests.fetchLatestSeries, 1))
        dispatch(fetchActionSeriesAsync(requests.fetchActionSeries, 1))
        // dispatch(fetchDramaSeriesAsync(requests.fetchDramaSeries, 1))
        dispatch(fetchComedySeriesAsync(requests.fetchComedySeries, 1))
        dispatch(fetchHorrorSeriesAsync(requests.fetchHorrorSeries, 1))
        dispatch(fetchThrillerSeriesAsync(requests.fetchThrillerSeries, 1))
    }, [dispatch])
    return (
        <div className="Series">
            <Slider isLarge={false} title='Latest' type="series" sliderData={latestSeries}></Slider>
            <Slider isLarge={true} title='Popular' type="series" sliderData={popularSeries}></Slider>
            <Slider isLarge={false} title='Action' type="series" sliderData={actionSeries}></Slider>
            <Slider isLarge={false} title='Thriller' type="series" sliderData={thrillerSeries}></Slider>
            <Slider isLarge={false} title='Comedy' type="series" sliderData={comedySeries}></Slider>
            <Slider isLarge={false} title='Horror' type="series" sliderData={horrorSeries}></Slider>
        </div>
    );
};

export default Series;
