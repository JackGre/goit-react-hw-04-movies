import React from "react";
import { useState, useEffect } from "react";
import {
  useParams,
  useRouteMatch,
  NavLink,
  Route,
  useHistory,
  useLocation,
} from "react-router-dom";
import { fetchMovieById } from '../../fetch-service';
import styles from './MovieDetailsPage.module.css';

const Cast = React.lazy(() =>
  import("../Cast" /* webpackChunkName: "cast-page" */)
);
const Reviews = React.lazy(() =>
  import("../Reviews" /* webpackChunkName: "reviews-page" */)
);


export default function MovieDetailsPage({loader}) {
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { url, path } = useRouteMatch();
    const location = useLocation();
    const history = useHistory();
    const { movieID } = useParams();

    const historyParam = location.state ? location.state.from : "/";

     useEffect(() => {
    const getMovies = async function () {
      try {
        setLoading(true);
        const res = await fetchMovieById(movieID);
        setMovie(res.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [movieID]);

  const onGoBack = () => {
    history.push(historyParam);
  };

  return (
    <>
      {loading && loader}
      {movie ? (
        <>
          <section className={styles.movieCard}>
            <button
              className={styles.button}
              type="button"
              onClick={() => onGoBack()}
            >
              
              <span className={styles.buttonName}> Go back</span>
            </button>
            <img
              className={styles.image}
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                  : "http://lexingtonvenue.com/media/poster-placeholder.jpg"
              }
              alt={movie.title}
              width="200"
              height="auto"
            />
            <h2>
              {movie.title ?? movie.name}
              {movie.release_date !== ""
                ? ` (${movie.release_date?.slice(0, 4)})`
                : null}
            </h2>

            <p className={styles.rateStat}>
              Popularity: {Math.round(movie.popularity)}
            </p>

            <h3>Overview</h3>
            <p className={styles.descr}>
              {movie.overview !== ""
                ? movie.overview
                : "No overview for this movie"}
            </p>
            <h3>Genres</h3>
            <p>
              {movie.genres.length !== 0
                ? movie.genres.map((genre) => genre.name).join(", ")
                : "Unknown"}
            </p>
          </section>
          <section>
            <h2 className={styles.infoHeading}>Additional information</h2>
            <ul className={styles.infoList}>
              <li className={styles.infoItem}>
                <NavLink
                  className={styles.link}
                  activeClassName={styles.linkActive}
                  to={{
                    pathname: `${url}/cast`,
                    state: { from: historyParam },
                  }}
                >
                   Cast
                </NavLink>
              </li>
              <li className={styles.infoItem}>
                <NavLink
                  className={styles.link}
                  activeClassName={styles.linkActive}
                  to={{
                    pathname: `${url}/reviews`,
                    state: { from: historyParam },
                  }}
                >
                   Reviews
                </NavLink>
              </li>
            </ul>
          </section>
          <Route path={`${path}/cast`}>
            <Cast loader={loader} />
          </Route>
          <Route path={`${path}/reviews`}>
            <Reviews loader={loader} />
          </Route>
        </>
      ) : (
        <p>{error}</p>
      )}
    </>
  );
}


