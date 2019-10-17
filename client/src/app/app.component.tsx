import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import MoviePage from './pages/movie.page';
import MoviesPage from './pages/movies.page';
import UpdatePage from './pages/update.page';

import { Movie } from './models/Movie';
import { SavedList } from './components/saved-list/saved-list.component';

const App = () => {
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [savedList, setSavedList] = React.useState<Movie[]>([]);

  React.useEffect(() => {
    axios
      .get<Movie[]>('http://localhost:5000/api/movies')
      .then((res) => setMovies(res.data))
      .catch((err) => console.log(err.response));
  }, []);

  const addToSavedList = (movie: Movie) => {
    setSavedList([...savedList, movie]);
  };

  const deleteMovie = (movie: Movie) => {
    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then(() => {
        setMovies(movies.filter((item) => item.id !== movie.id));
        setSavedList(savedList.filter((item) => item.id !== movie.id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <Router>
      <SavedList list={savedList} />

      <Switch>
        <Route exact path='/' render={(props) => <MoviesPage {...props} movies={movies} />} />
        <Route
          path='/movies/:id'
          render={(props) => (
            <MoviePage {...props} addToSavedList={addToSavedList} deleteMovie={deleteMovie} />
          )}
        />
        <Route path='/update-movie/:id' render={(props) => <UpdatePage {...props} />} />
      </Switch>
    </Router>
  );
};

export default App;
