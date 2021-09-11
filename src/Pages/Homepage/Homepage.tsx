import * as React from 'react';
import Slider from '../../components/Slider/Slider';
import './homepage.scss';

const Homepage = () => {
    return (
        <div className="Homepage">
            <div className="main-header">
                <div className="header">
                    <div className="image" style={{ backgroundImage: `url(${`https://image.tmdb.org/t/p/original//rcA17r3hfHtRrk3Xs3hXrgGeSGT.jpg`})` }}>
                        {/* <img src={'https://image.tmdb.org/t/p/original//rcA17r3hfHtRrk3Xs3hXrgGeSGT.jpg'} className="image" alt="home" /> */}
                    </div>
                </div>
                <div className="header-content">
                    Hi
                </div>
            </div>
            <div className="Homepage__content">
                <Slider isLarge={false}></Slider>
                <Slider isLarge={true}></Slider>
            </div>
        </div>
    )
}

export default Homepage;