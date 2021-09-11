import * as React from 'react';
import homeimage from '../../images/home-image.jpg';
import './homepage.scss';

const Homepage = () => {
    return (
        <div className="home-page">
            <div>
                <div className="home-image">
                    <img src={homeimage} className="imagee" alt="home" />
                </div>
            </div>
        </div>
    )
}

export default Homepage;