import * as React from 'react';
import PosterCard from '../../components/PosterCard/PosterCard';
import './Popular.scss';

interface IPopularProps {
}

const Popular: React.FunctionComponent<IPopularProps> = (props) => {
    let results = [0, 1, 2, 3, 4, 5, 6, 7]
    return (
        <div className="Popular">
            <div className="Popular__Header">
                <h1>Popular</h1>
            </div>
            <div
                className="Popular__wrp"
            >
                {results && results.length > 0
                    ? results.map((result, i) => (
                        <PosterCard
                            key={i}
                        />)
                    )
                    : (
                        <h2 className="Popular__title">
                            No results found.
                        </h2>
                    )
                }
            </div>
        </div>
    );
};

export default Popular;
