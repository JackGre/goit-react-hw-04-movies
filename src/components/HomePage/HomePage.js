// import styles from './HomePage.module.css';

import { fetchTrendingMovies } from '../../fetch-service';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import TheatersIcon from '@material-ui/icons/Theaters';

export default function HomePage({ loader }) {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const location = useLocation();

    useEffect(() => {
        const getMovies = async function () {
            try {
                setLoading(true);
                const res = await fetchTrendingMovies();
                setMovies(res.data.results);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        getMovies();
    }, []);

    return movies ? (
        <>
            <h1>Trending today</h1>
            {loading && loader}
            <ul>
                {movies.map((movie) => {
                    return (
                        <li key={movie.id}>
                            <Link
                                to={{
                                    pathname: `movies/${movie.id}`,
                                    state: { from: location },
                                }}
                            >
                                {/* <TheatersIcon /> */}
                                <span>{ movie.title ?? movie.name}</span>
                            </Link>
                        </li>

                    );
                })}
            </ul>
        </>
    ) : (
        <p>{error}</p>
    );
}
