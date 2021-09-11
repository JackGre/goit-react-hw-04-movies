import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCastInfo } from '../../fetch-service';
// import styles from './Cast.module.css';

export default function Cast({ loader }) {
    const [cast, setCast] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { movieID } = useParams();

    useEffect(() => {
        const getCasts = async function () {
            try {
                setLoading(true);
                const res = await fetchCastInfo(movieID);
                setCast(res.data.cast)
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        getCasts();
    }, [movieID]);

    return (
        <section>
            {loading && loader}
            {cast.length !== 0 ? (
                <ul>
                    {cast.map((actor) => {
                        return (
                            <li key={actor.id}>
                                <img
                                    loading="lazy"
                                    src={
                                        actor.profile_path
                                            ? `https://image.tmdb.org/t/p/original/${actor.profile_path}`
                                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXmAK1GGD4iQBqkvTIk3bEnF_nF1LDbpbwNVe69CDB2iudz-6_fh4T6DLLZ1xaTD0FCAw&usqp=CAU"
                                    }
                                    width="100"
                                    alt={actor.name}
                                />
                            </li>
                        );
                    })}
                </ul>
            ) : (<p>No cast info</p>)}
            {error && <p>{error}</p>}
        </section>
    );
}