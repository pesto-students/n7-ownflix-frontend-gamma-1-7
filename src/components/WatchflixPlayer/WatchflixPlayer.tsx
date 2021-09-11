import PlayerContainer from "griffith"
import { logEvent } from "../../utils"

const sources = {
    sd: {
        format: 'm3u8',
        play_url: 'https://d3dr7atq7iqw02.cloudfront.net/48626d63-e362-4233-9f2f-f2c3f4c916b1/AppleHLS1/videoplayback_Ott_Hls_Ts_Avc_Aac_16x9_480x270p_0.4Mbps_qvbr.m3u8',
    },
    hd: {
        format: 'm3u8',
        play_url:
            'https://d3dr7atq7iqw02.cloudfront.net/48626d63-e362-4233-9f2f-f2c3f4c916b1/AppleHLS1/videoplayback_Ott_Hls_Ts_Avc_Aac_16x9_1280x720p_6.0Mbps_qvbr.m3u8',
    },
}

const props = {
    id: 'test-hls-video',
    title: 'Test HLS Video',
    standalone: true,
    cover: 'https://zhstatic.zhihu.com/cfe/griffith/player.png',
    sources,
    shouldObserveResize: true,
    autoplay: true,
    onEvent: logEvent,
}

const WatchflixPlayer = () => <PlayerContainer {...props} />

export default WatchflixPlayer