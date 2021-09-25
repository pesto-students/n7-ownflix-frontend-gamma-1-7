import { Button } from "@material-ui/core";
import PlayerContainer from "griffith";
import { logEvent } from "../../utils";
import './WatchflixPlayer.scss';


const WatchflixPlayer = () => {
    let movieTitle = 'Money Heist'
    const sources = {
        sd: {
            format: 'm3u8',
            play_url: 'https://d3dr7atq7iqw02.cloudfront.net/48626d63-e362-4233-9f2f-f2c3f4c916b1/AppleHLS1/videoplayback_Ott_Hls_Ts_Avc_Aac_16x9_1280x720p_6.0Mbps_qvbr.m3u8',
        },
        hd: {
            format: 'm3u8',
            play_url:
                'https://d3dr7atq7iqw02.cloudfront.net/48626d63-e362-4233-9f2f-f2c3f4c916b1/AppleHLS1/videoplayback_Ott_Hls_Ts_Avc_Aac_16x9_1280x720p_6.0Mbps_qvbr.m3u8',
        },

    }

    const props = {
        id: 'test-hls-video',
        title: 'WatchFlix - Money Heist',
        standalone: true,
        cover: 'https://image.tmdb.org/t/p/original//gFZriCkpJYsApPZEF3jhxL4yLzG.jpg',
        sources,
        shouldObserveResize: true,
        autoplay: true,
        onEvent: logEvent,
    }

    let genresConverted = ['Action', 'Thriller'];
    let movieYear = 2021;
    let movieRated = 'U/A 13+'
    let movieDescription = ' Money Heist is a Spanish heist crime drama television series created by Álex Pina. The series traces two long-prepared heists led by the Professor, one on the Royal Mint of Spain, and one on the Bank of Spain, told from the perspective of one of the robbers, Tokyo'
    return (
        <div className="WatchflixPlayer">
            <div className="WatchflixPlayer__Player">
                <PlayerContainer {...props} />
            </div>
            <div className="WatchflixPlayer__Info">
                <div className="WatchflixPlayer__Info--title">
                    <h3>{movieTitle}</h3>
                </div>
                <div className="WatchflixPlayer__Info--genres">
                    {genresConverted && genresConverted.map(genre => (
                        <span key={`Genre--id_${genre}`} className="genre-title">{genre}</span>
                    ))}
                    <span className="genre-title">{movieYear}</span>
                    <span className="genre-title">{movieRated}</span>
                </div>
                <p>{movieDescription}</p>
            </div>
            <div className="WatchflixPlayer__MovieOptions">
                <Button variant="outlined" color="primary">+ Add to My List</Button>
            </div>
        </div>
    )
}

export default WatchflixPlayer