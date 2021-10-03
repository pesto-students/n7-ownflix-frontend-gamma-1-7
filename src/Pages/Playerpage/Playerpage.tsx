import React from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import SeriesPlayer from '../../components/SeriesPlayer/SeriesPlayer';
import Slider from '../../components/Slider/Slider';
import WatchflixPlayer from '../../components/WatchflixPlayer/WatchflixPlayer';
import { Movie } from '../../models/movie.interface';
import { Series } from '../../models/series.interface';
import { fetchMovieAsync, fetchSeriesAsync } from '../../redux/player/player.actions';
import { RootState } from '../../redux/rootReducer';
import './Playerpage.scss';
import axios from '../../utils/axiosInstance';
import SkeletonElement from '../../components/SkeletonElement/SkeletonElement';
import { useEffect } from 'react';

const Playerpage = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    // const movieSlug = 
    const [movieSlug, setMovieSlug] = React.useState('')
    const [views, setViews] = React.useState(0)
    const [time, setTime] = React.useState(0);
    // console.log(movieSlug)
    const type = location.pathname.split('/')[1]
    let recommendedMovies = {
        ...useSelector(
            (state: RootState) => state.movies.recommendedMovies
        )
    };
    if (type === 'movies') {
        recommendedMovies.data = recommendedMovies.data.filter(m => {
            return m.slug !== movieSlug
        })
    }
    const playerData: {
        loading: boolean;
        error: string;
        data: any;
    } = useSelector(
        (state: RootState) => state.player
    );

    function setEmomInterval(expr: any, ...rest: any): any {
        setTimeout(function () {
            expr(...rest);
            setInterval(expr, 60000, ...rest);
        }, 60000 - new Date().getTime() % (60 * 1000));
    }

    useEffect(() => {
        if (playerData.data?._id) {
            setEmomInterval(() => {
                let rt = localStorage.getItem("runningTime") || 0;
                let ud = `resume-watch/check-or-update?userId=${localStorage.getItem("user")}&entity=movies&entityId=${playerData.data?._id}&runningTime=${rt}`;
                axios.get(ud).then(res => {
                    console.log("done", res.data.runningTime);
                })
            });
        }
    }, [playerData.data?._id])

    useEffect(() => {
        const slug = location.pathname.split('/')[3]
        setMovieSlug(slug)
        if (type === 'movies') {
            dispatch(fetchMovieAsync(`/movies/s/${slug}`))
        } else {
            dispatch(fetchSeriesAsync(`/series/s/${slug}`))

        }
    }, [dispatch, location, type])

    useEffect(() => {
        if (playerData.data?._id) {
            let u = `resume-watch/get-details?userId=${localStorage.getItem("user")}&entity=movies&entityId=${playerData.data?._id}`;
            axios.get(u).then(res => {
                console.log(res.data.runningTime);
                setTime(res.data.runningTime);
            })
        }
    }, [time, setTime, playerData.data?._id])

    useEffect(() => {
        if (playerData.data?._id)
            axios.get('movies/views/' + playerData.data?._id).then(res => {
                setViews(res.data.views)
            })
    }, [playerData.data?._id])

    return (
        <div className="Playerpage">
            {type === 'movies' ? playerData.data ?
                <WatchflixPlayer currentTime={time} playerData={playerData} views={views} /> :
                <div className="Skeleton__Player">
                    <SkeletonElement type="player"></SkeletonElement>
                    <SkeletonElement type="title"></SkeletonElement>
                    <SkeletonElement type="text"></SkeletonElement>
                    <SkeletonElement type="text"></SkeletonElement>
                    <SkeletonElement type="button"></SkeletonElement>
                </div>
                :
                <SeriesPlayer playerData={playerData}  ></SeriesPlayer>}
            <Slider isLarge={false} title='Recommended Movies' type="movies" sliderData={recommendedMovies}></Slider>
            <Helmet defer={false}>
                <title>{playerData?.data?.title || 'Movie'} - {process.env.REACT_APP_NAME}</title>
            </Helmet>
        </div>
    )
}

export default Playerpage;