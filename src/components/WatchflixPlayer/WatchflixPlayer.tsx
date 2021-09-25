import { Button } from "@material-ui/core";
import PlayerContainer from "griffith";
import { Movie } from "../../models/movie.interface";
import { logEvent } from "../../utils/utils";
import './WatchflixPlayer.scss';

interface IWatchflixPlayerProps {
    playerData: {
        loading: boolean;
        error: string;
        data: Movie | null;
    };
}

const WatchflixPlayer: React.FunctionComponent<IWatchflixPlayerProps> = (props) => {
    if (props.playerData.data) {
        const { title, rated, imdbRating, yearOfRelease, plot, images, videoMain } = (props.playerData.data as Movie)
        const genresConverted = [props?.playerData?.data?.genre.title];
        const thumbNail = images[0].location.cloudFrontUrl
        const autoVideoUrl = videoMain.destinationLocation.location.cloudFrontUrl
        const sources = {
            Auto: {
                format: 'm3u8',
                play_url: autoVideoUrl,
            },
            hd: {
                format: 'm3u8',
                play_url:
                    'https://d3dr7atq7iqw02.cloudfront.net/48626d63-e362-4233-9f2f-f2c3f4c916b1/AppleHLS1/videoplayback_Ott_Hls_Ts_Avc_Aac_16x9_1280x720p_6.0Mbps_qvbr.m3u8',
            },

        }

        const playerProps = {
            id: 'test-hls-video',
            title: `WatchFlix - ${title}`,
            standalone: true,
            cover: thumbNail,
            sources,
            shouldObserveResize: true,
            autoplay: true,
            onEvent: logEvent,
        }

        return (
            <div className="WatchflixPlayer">
                <div className="WatchflixPlayer__Player">
                    <PlayerContainer {...playerProps} />
                </div>
                <div className="WatchflixPlayer__Info">
                    <div className="WatchflixPlayer__Info--title">
                        <h3>{title}</h3>
                    </div>
                    <div className="WatchflixPlayer__Info--genres">
                        {genresConverted && genresConverted.map(genre => (
                            <span key={`Genre--id_${genre}`} className="genre-title">{genre}</span>
                        ))}
                        <span className="genre-title">{yearOfRelease}</span>
                        <span className="genre-title">{rated}</span>
                        <span className="genre-title">Rating: {imdbRating}</span>
                    </div>
                    <p>{plot}</p>
                </div>
                <div className="WatchflixPlayer__MovieOptions">
                    <Button variant="outlined" color="primary">+ Add to My List</Button>
                </div>
            </div>
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }
}

export default WatchflixPlayer