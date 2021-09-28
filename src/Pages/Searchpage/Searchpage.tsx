import * as React from 'react';
import PosterCard from '../../components/PosterCard/PosterCard';
import './Searchpage.scss';

interface ISearchpageProps {
}

const Searchpage: React.FunctionComponent<ISearchpageProps> = (props) => {
    let results = [0, 1, 2, 3, 4, 5, 6, 7]
    return (
        // <div className="Searchpage">
        //     <div className="Searchpage__Search">
        //         <h2>Search Results for: </h2> <h1 className="Searchpage__Search--Query">Money Heist</h1>
        //     </div>
        //     <div
        //         className="Searchpage__wrp"
        //     >
        //         {results && results.length > 0
        //             ? results.map((result, i) => (
        //                 <PosterCard
        //                     key={i}
        //                 />)
        //             )
        //             : (
        //                 <h2 className="Searchpage__title">
        //                     No search results found.
        //                 </h2>
        //             )
        //         }
        //     </div>
        // </div>
        <div></div>
    );
};

export default Searchpage;
