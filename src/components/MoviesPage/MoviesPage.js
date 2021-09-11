import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Link, useRouteMatch } from "react-router-dom";
import queryString from 'query-string';

import { fetchMoviesByName } from '../../fetch-service';

 
export default function MoviesPage({ loader }) {
    const [movieName, setMovieName] = useState("");
    const [serchedMovies, setSerchedMovies] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { url } = useRouteMatch();
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        const parsedSearchedParams = queryString.parse(location.search);
        if (Object.keys(parsedSearchedParams).length !== 0) {
            getMovies(parsedSearchedParams.query);
        }
    }, []);

    const onChange = function (e) {
        setMovieName(e.target.value)
    };

    function onSubmit(e) {
        e.preventDefault();
        const query = movieName.toLowerCase().trim();
        if (query.length === 0) {
            return;
        }

        getMovies(query);
        history.push({ ...location, search: `query=${query}` });
        setMovieName("");
    }

    async function getMovies(query) {
        try {
            setLoading(true);
            const res = await fetchMoviesByName(query);
            setSerchedMovies(res.data.results);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    placeholder="Type movie name"
                    value={movieName}
                    type="text"
                    onChange={onChange}
                ></input>
                <button type="submit">
                    Search
                </button>
            </form>
            {loading && loader}
            {serchedMovies && (
                <ul >
                    {serchedMovies.map((movie) => {
                        return (
                            <li key={movie.id}>
                                <Link
                                    to={{
                                        pathname: `${url}/${movie.id}`,
                                        state: { from: location },
                                    }}
                                >
                                    <span >{movie.name ?? movie.title}</span>
                                </Link>

                            </li>
                        );
                    })}
                </ul>
            )}
            {error && <p>{error}</p>}
        </>
    );
}


// import { useState, useEffect } from "react";
// import { useLocation, useHistory } from "react-router-dom";
// import { Link, useRouteMatch } from "react-router-dom";
// import queryString from "query-string";
// import { fetchMoviesByName } from "../../fetch-service";
// import styles from "./MoviesPage.module.css";


// export default function MoviesPage({ loader }) {
//   const [movieName, setMovieName] = useState("");
//   const [searchedMovies, setSearchedMovie] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const { url } = useRouteMatch();
//   const location = useLocation();
//   const history = useHistory();

//   useEffect(() => {
//     const parsedSearchParams = queryString.parse(location.search);

//     if (Object.keys(parsedSearchParams).length !== 0) {
//       getMovies(parsedSearchParams.query);
//     }
//   }, []);

//   const onChange = function (e) {
//     setMovieName(e.target.value);
//   };

//   function onSubmit(e) {
//     e.preventDefault();
//     const query = movieName.toLowerCase().trim();
//     if (query.length === 0) {
//       return;
//     }

//     getMovies(query);
//     history.push({ ...location, search: `query=${query}` });
//     setMovieName("");
//   }

//   async function getMovies(query) {
//     try {
//       setLoading(true);
//       const res = await fetchMoviesByName(query);
//       setSearchedMovie(res.data.results);
//     } catch (error) {
//       setError(error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <>
//       <form  onSubmit={onSubmit}>
//         <input
//           
//           placeholder="Type movie name"
//           value={movieName}
//           type="text"
//           onChange={onChange}
//         ></input>
//         <button  type="submit">
//           Search
//         </button>
//       </form>

//       {loading && loader}
//       {searchedMovies && (
//         <ul className={styles.list}>
//           {searchedMovies.map((movie) => {
//             return (
//               <li className={styles.item} key={movie.id}>
//                 <Link
//                   className={styles.link}
//                   to={{
//                     pathname: `${url}/${movie.id}`,
//                     state: { from: location },
//                   }}
//                 >
                 
//                   <span className={styles.name}>
//                     {movie.name ?? movie.title}
//                   </span>
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
//       )}
//       {error && <p>{error}</p>}
//     </>
//   );
// }
