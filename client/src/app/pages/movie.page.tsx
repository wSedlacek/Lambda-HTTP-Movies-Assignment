import React from 'react';
import axios from 'axios';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Button } from '@material-ui/core';

import { MovieCard } from '../components/movie-card/movie-card.component';
import { Movie } from '../models/Movie';

interface PathParams {
  id: string;
}

interface MoviePageProps extends RouteComponentProps<PathParams> {
  addToSavedList: (movie: Movie) => void;
  deleteMovie: (movie: Movie) => void;
}

interface MoviePageState {
  movie: Movie | null;
}

class MoviePage extends React.Component<MoviePageProps, MoviePageState> {
  constructor(props: MoviePageProps) {
    super(props);
    this.state = {
      movie: null,
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  fetchMovie = (id: string) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => this.setState({ movie: res.data }))
      .catch((err) => console.log(err.response));
  };

  saveMovie = () => {
    const { addToSavedList } = this.props;
    const { movie } = this.state;
    if (!movie) return;

    addToSavedList(movie);
  };

  deleteMovie = () => {
    const { deleteMovie, history } = this.props;
    const { movie } = this.state;
    if (!movie) return;

    deleteMovie(movie);
    history.goBack();
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <MovieCard movie={this.state.movie}>
        <Button onClick={this.saveMovie}>Save</Button>
        <Button onClick={this.deleteMovie}>Delete</Button>
      </MovieCard>
    );
  }
}

export default withRouter(MoviePage);
