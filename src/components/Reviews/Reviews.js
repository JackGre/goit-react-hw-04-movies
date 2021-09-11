import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchReviews } from '../../fetch-service';
// import styles from './Reviews.module.css';

export default function Reviews({ loader }) {
    const [reviews, setReviews] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { movieID } = useParams();
    const [notice, setNotice] = useState(false);

    useEffect(() => {
        const getReviews = async function () {
            try {
                setLoading(true);
                const res = await fetchReviews(movieID);
                if (res.data.results.length !== 0) {
                    setReviews(res.data.results);
                } else {
                    setNotice(true)
                }
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        };
        getReviews();
    }, [movieID]);

    return (
        <section>
            {loading && loader}
            <ul>
                {reviews &&
                    reviews.map((review) => {
                        return (
                            <li key={review.id}>
                                <h2>{review.author}</h2>
                                <p>{review.content}</p>
                            </li>
                        );
                    })}
            </ul>
            {notice && <p>We don't have any reviews for this movie</p>}
            {error && <p>{error}</p>}
        </section>
    );

}