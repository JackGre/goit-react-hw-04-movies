
import React, { Suspense } from "react";
import { Route, Switch, Redirect } from 'react-router-dom';
import { lazy } from 'react';

import Container from './components/Container';
import NavigationBar from './components/NavigationBar';

import Loader from 'react-loader-spinner';



import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const HomePage = lazy(() =>
  import("./components/HomePage" /* webpackChunkName: "home-page" */)
);
const MoviesPage = lazy(() =>
  import("./components/MoviesPage" /* webpackChunkName: "movies-page" */)
);
const MovieDetailsPage = React.lazy(() =>
  import(
    "./components/MovieDetailsPage" /* webpackChunkName: "movie-details-page" */
  )
);


const loader = (
  <Loader
    type="ThreeDots"
    color="rgba(238, 137, 23, 0.874)"
    height={100}
    width={100}
  />
)

function App() {
  return (
    <Container>
      <NavigationBar />
      <Switch>
        <Suspense  fallback={loader} >
          <Route exact path="/">
            <HomePage loader = { loader }/>
          </Route>
          <Route exact path="/movies">
            <MoviesPage loader = { loader }/>
          </Route>
          <Route path="/movies/:movieID">
            <MovieDetailsPage loader={loader} />
          </Route>
          <Redirect to="/" />

        </Suspense>

      </Switch>
    </Container>
  );
}

export default App;
