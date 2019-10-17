import React from 'react';
import axios from 'axios';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Movie } from '../models/Movie';
import { MovieUpdate } from '../components/movie-update/movie-update.component';

import { MovieCard } from '../components/movie-card/movie-card.component';

interface PathParams {
  id: string;
}

interface UpdatePageProps extends RouteComponentProps<PathParams> {
  updateMovie: (movie: Movie) => void;
}

interface UpdatePageState {
  movie: Movie | null;
}

class UpdatePage extends React.Component<UpdatePageProps, UpdatePageState> {
  constructor(props: UpdatePageProps) {
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

  render() {
    const { updateMovie } = this.props;
    const { movie } = this.state;

    if (!movie) return <div>Loading movie information...</div>;
    return <MovieUpdate movie={movie} updateMovie={updateMovie}></MovieUpdate>;
  }
}

export default withRouter(UpdatePage);
