import React from 'react';
import axios from 'axios';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

import { Button } from '@material-ui/core';

import { MovieCard } from '../components/movie-card/movie-card.component';
import { Movie } from '../models/Movie';

interface PathParams {
  id: string;
}

interface MoviePageProps extends RouteComponentProps<PathParams> {
  addToSavedList: (movie: Movie) => void;
  deleteMovie: (movie: Movie) => Promise<void>;
}

interface MoviePageState {
  movie: Movie | null;
  mounted: boolean;
}

class MoviePage extends React.Component<MoviePageProps, MoviePageState> {
  constructor(props: MoviePageProps) {
    super(props);
    this.state = {
      movie: null,
      mounted: false,
    };
  }

  componentDidMount() {
    this.setState({ ...this.state, mounted: true });
    this.componentDidUpdate();
  }

  componentWillUnmount() {
    this.setState({ ...this.state, mounted: false });
  }

  componentDidUpdate() {
    const { id } = this.props.match.params;
    const { mounted, movie } = this.state;

    if (!movie || `${movie.id}` !== id) {
      axios
        .get<Movie>(`http://localhost:5000/api/movies/${id}`)
        .then((res) => {
          if (mounted) this.setState({ movie: res.data });
        })
        .catch((err) => console.log(err));
    }
  }

  saveMovie = () => {
    const { addToSavedList } = this.props;
    const { movie } = this.state;
    if (!movie) return;

    addToSavedList(movie);
  };

  deleteMovie = async () => {
    const { deleteMovie, history } = this.props;
    const { movie } = this.state;
    if (!movie) return;

    await deleteMovie(movie);
    history.goBack();
  };

  render() {
    const { movie } = this.state;
    if (!movie) return <div>Loading movie information...</div>;

    return (
      <MovieCard movie={movie}>
        <Button onClick={this.saveMovie}>Save</Button>
        <Link to={`/update-movie/${movie.id}`}>
          <Button>Edit</Button>
        </Link>
        <Button onClick={this.deleteMovie}>Delete</Button>
      </MovieCard>
    );
  }
}

export default withRouter(MoviePage);
