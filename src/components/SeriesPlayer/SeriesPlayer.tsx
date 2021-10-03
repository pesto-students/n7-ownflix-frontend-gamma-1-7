import { Button } from "@material-ui/core";
import PlayerContainer from "griffith";
import { Movie } from "../../models/movie.interface";
import { logEvent } from "../../utils/utils";
import './SeriesPlayer.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../redux/rootReducer";
import { addToWatchlistAsync, removeFromWatchlistAsync } from "../../redux/watchlist/watchlist.actions";
import SkeletonElement from "../SkeletonElement/SkeletonElement";
import { Series } from "../../models/series.interface";

interface ISeriesPlayerProps {
    playerData: {
        loading: boolean;
        error: string;
        data: Series | null;
    };
}

const SeriesPlayer: React.FunctionComponent<ISeriesPlayerProps> = (props) => {
    const dispatch = useDispatch();

    const watchlist = useSelector(
        (state: RootState) => state.watchlist
    );
    const hasAddedinWatchlist = watchlist.movies.filter((w: any) => w.movie._id === props.playerData.data?._id).length > 0

    // const handleAdd = (event: any) => {
    //     event.stopPropagation();
    //     dispatch(addToWatchlistAsync('/watch-list/', { entityId: props.playerData.data?._id, user: localStorage.getItem("user"), entity: 'movies' }, 'movies', (props.playerData.data as Series)));
    // };
    // const handleRemove = (event: any) => {
    //     event.stopPropagation();
    //     const addedList = watchlist.movies.find((w: any) => w.movie._id === props.playerData.data?._id)
    //     dispatch(removeFromWatchlistAsync(`/watch-list/${addedList.watchlistId}`, addedList.watchlistId, 'movies'))
    // };
    if (props.playerData.data?.episodes) {
        const { title, plot, images, videoMain } = (props.playerData.data.episodes[0] as any)
        const { genres, yearOfRelease, imdbRating, rated } = (props.playerData.data as any)
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
        }

        return (
            <div className="SeriesPlayer">
                <div className="SeriesPlayer__Player">
                    <PlayerContainer {...playerProps} />
                </div>
                <div className="SeriesPlayer__Info">
                    <div className="SeriesPlayer__Info--title">
                        <h3>{title}</h3>
                    </div>
                    <div className="SeriesPlayer__Info--genres">
                        {genres && genres.map((genre: any) => (
                            <span key={`Genre--id_${genre._id}`} className="genre-title">{genre.title}</span>
                        ))}
                        <span className="genre-title">{yearOfRelease}</span>
                        <span className="genre-title">{rated}</span>
                        <span className="genre-title">Rating: {imdbRating}</span>
                    </div>
                    <p>{plot}</p>
                </div>
                {/* <div className="SeriesPlayer__MovieOptions">
                    {!hasAddedinWatchlist ?
                        <Button variant="outlined" color="primary" onClick={handleAdd} >+ Add to my list</Button> :
                        <Button variant="contained" color="primary" onClick={handleRemove} >- Remove from my list</Button>}
                </div> */}
            </div>
        )
    } else {
        return (
            <div className="Skeleton__Player">
                <SkeletonElement type="player"></SkeletonElement>
                <SkeletonElement type="title"></SkeletonElement>
                <SkeletonElement type="text"></SkeletonElement>
                <SkeletonElement type="text"></SkeletonElement>
                <SkeletonElement type="button"></SkeletonElement>
            </div>
        )
    }
}

export default SeriesPlayer