import * as React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PosterCard from '../../components/PosterCard/PosterCard';
import './Searchpage.scss';
import axios from '../../utils/axiosInstance';
import { AxiosResponse } from 'axios';
import { Movie } from '../../models/movie.interface';
import SkeletonPoster from '../../components/SkeletonPoster/SkeletonPoster';
import { Helmet } from 'react-helmet';

interface ISearchpageProps {
}

const Searchpage: React.FunctionComponent<ISearchpageProps> = (props) => {
    const search = useLocation().search;
    const query = new URLSearchParams(search).get('q');
    const [loading, setLoading] = React.useState(false);
    const [movies, setMovies] = React.useState([]);
    React.useEffect(() => {
        setLoading(true);
        axios
            .get(`/movies?search=${query}`)
            .then((res: AxiosResponse<any>) => {
                setLoading(false);
                setMovies(res.data.docs)
            })
    }, [query])
    return (
        <div className="Searchpage">
            <Helmet defer={false}>
				<title>Search Results for: {query} - {process.env.REACT_APP_NAME}</title>
			</Helmet>
            <div className="Searchpage__Search">
                <h2>Search Results for: </h2> <h1 className="Searchpage__Search--Query">{query}</h1>
            </div>
            <div
                className="Searchpage__wrp"
            >
                {!loading ?
                    movies && movies.length > 0
                        ? movies.map((movie: Movie, i: number) => (
                            <PosterCard data={movie}
                                key={i}
                            />)
                        )
                        : (
                            <h2 className="Searchpage__title">
                                No search results found.
                            </h2>
                        )
                    :
                    <SkeletonPoster></SkeletonPoster>
                }
            </div>
        </div>
    );
};

export default Searchpage;
