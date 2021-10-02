import { Button } from "@material-ui/core";
import Player, { ACTIONS, useMessageContextRef } from "griffith";
import { Movie } from "../../models/movie.interface";
import { logEvent } from "../../utils/utils";
import './WatchflixPlayer.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../redux/rootReducer";
import { addToWatchlistAsync, removeFromWatchlistAsync } from "../../redux/watchlist/watchlist.actions";
import { useEffect } from "react";

interface IWatchflixPlayerProps {
    playerData: {
        loading: boolean;
        error: string;
        data: Movie | null;
    };
    views: number;
    currentTime: number;
}

const WatchflixPlayer: React.FunctionComponent<IWatchflixPlayerProps> = (props) => {
    const dispatch = useDispatch();
    const messageContextRef = useMessageContextRef();

    useEffect(() => {
        messageContextRef.dispatchAction(ACTIONS.TIME_UPDATE, { currentTime: props.currentTime })
    }, [messageContextRef, props])

    const watchlist = useSelector(
        (state: RootState) => state.watchlist
    );
    const hasAddedinWatchlist = watchlist.movies.filter((w: any) => w.movie._id === props.playerData.data?._id).length > 0

    const handleAdd = (event: any) => {
        event.stopPropagation();
        dispatch(addToWatchlistAsync('/watch-list/', { entityId: props.playerData.data?._id, user: localStorage.getItem("user"), entity: 'movies' }, 'movies', (props.playerData.data as Movie)));
    };
    const handleRemove = (event: any) => {
        event.stopPropagation();
        const addedList = watchlist.movies.find((w: any) => w.movie._id === props.playerData.data?._id)
        dispatch(removeFromWatchlistAsync(`/watch-list/${addedList.watchlistId}`, addedList.watchlistId, 'movies'))
    };
    const { title, rated, imdbRating, yearOfRelease, plot, images, videoMain, genres } = (props.playerData.data as Movie)
    const thumbNail = images[0].location.cloudFrontUrl
    const autoVideoUrl = videoMain.destinationLocation.location.cloudFrontUrl
    const sdVideoUrl = autoVideoUrl.split('.').slice(0, -1).join('.') + '_Ott_Hls_Ts_Avc_Aac_16x9_480x270p_0.4Mbps_qvbr.m3u8'
    const hdVideoUrl = autoVideoUrl.split('.').slice(0, -1).join('.') + '_Ott_Hls_Ts_Avc_Aac_16x9_960x540p_3.5Mbps_qvbr.m3u8'

    const sources = {
        "auto": {
            format: 'm3u8',
            play_url: autoVideoUrl
        },
        "sd": {
            format: 'm3u8',
            play_url: sdVideoUrl
        },
        "hd": {
            format: 'm3u8',
            play_url: hdVideoUrl
        },

    }

    const playerProps = {
        id: 'test-hls-video',
        title: `${title} - Watchflix`,
        cover: thumbNail,
        sources,
        shouldObserveResize: true,
        autoplay: true,
        onEvent: logEvent,
        elapsed: 150,
        progressDots: []
    }

    return (
        <div className="WatchflixPlayer">
            <div className="WatchflixPlayer__Player">
                <Player  {...playerProps} messageContextRef={messageContextRef} />
            </div>
            <div className="WatchflixPlayer__Info">
                <div className="WatchflixPlayer__Info--title">
                    <h3>{title}</h3>
                </div>
                <p className="WatchflixPlayer__Info--views">Views: {props.views}</p>
                <div className="WatchflixPlayer__Info--genres">
                    {genres && genres.map(genre => (
                        <span key={`Genre--id_${genre._id}`} className="genre-title">{genre.title}</span>
                    ))}
                    <span className="genre-title">{yearOfRelease}</span>
                    <span className="genre-title">{rated}</span>
                    <span className="genre-title">Rating: {imdbRating}</span>
                </div>
                <p>{plot}</p>
            </div>
            <div className="WatchflixPlayer__MovieOptions">
                {!hasAddedinWatchlist ?
                    <Button variant="outlined" color="primary" onClick={handleAdd} >+ Add to my list</Button> :
                    <Button variant="contained" color="primary" onClick={handleRemove} >- Remove from my list</Button>}
            </div>
        </div>
    )
}

export default WatchflixPlayer