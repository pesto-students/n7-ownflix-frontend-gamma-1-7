import React from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Slider from '../../components/Slider/Slider';
import WatchflixPlayer from '../../components/WatchflixPlayer/WatchflixPlayer';
import { Movie } from '../../models/movie.interface';
import { fetchMovieAsync } from '../../redux/player/player.actions';
import { RootState } from '../../redux/rootReducer';
import './Playerpage.scss';
import axios from '../../utils/axiosInstance';

const Playerpage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    // const movieSlug = 
    const [movieSlug, setMovieSlug] = React.useState('')
    // console.log(movieSlug)
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

    React.useEffect(()=>{
        setMovieSlug(location.pathname.split('/')[2])
        dispatch(fetchMovieAsync(`/movies/s/${movieSlug}`))
        console.log("called",playerData);
        if(playerData?.data?.title){
            let u=`resume-watch/get-details?userId=${localStorage.getItem("user")}&entity=movies&entityId=${playerData.data?._id}`;
            axios.get(u).then(res=>{
                console.log(res.data.runningTime);
                // playerData.data.currentTime=res.data.runningTime
            })
            let ud=`resume-watch/check-or-update?userId=${localStorage.getItem("user")}&entity=movies&entityId=${playerData.data?._id}&runningTime=20`;
            axios.get(ud).then(res=>{
                console.log("done",res.data.runningTime);
                // playerData.data.currentTime=res.data.runningTime
            })
            axios.get('movies/views/'+playerData.data?._id).then(res=>{
                console.log("views",res.data.views);
            })
        }
        // console.log("S")
    }, [dispatch, movieSlug,playerData?.data?.title])

    return (
        <div className="Playerpage">
            <WatchflixPlayer playerData={playerData} />
            <Slider isLarge={false} title='Recommended Movies' sliderData={recommendedMovies}></Slider>
            <Helmet defer={false}>
				<title>{playerData?.data?.title || 'Movie'} - {process.env.REACT_APP_NAME}</title>
			</Helmet>
        </div>
    )
}

export default Playerpage;