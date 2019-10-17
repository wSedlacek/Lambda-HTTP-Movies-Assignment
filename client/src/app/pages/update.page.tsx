import React from 'react';
import axios from 'axios';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Movie } from '../models/Movie';
import { MovieUpdate } from '../components/movie-update/movie-update.component';

interface PathParams {
  id: string;
}

interface UpdatePageProps extends RouteComponentProps<PathParams> {
  updateMovie: (movie: Movie) => Promise<void>;
}

interface UpdatePageState {
  movie: Movie | null;
  mounted: boolean;
}

class UpdatePage extends React.Component<UpdatePageProps, UpdatePageState> {
  constructor(props: UpdatePageProps) {
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

  render() {
    const { updateMovie } = this.props;
    const { movie } = this.state;

    if (!movie) return <div>Loading movie information...</div>;
    return <MovieUpdate movie={movie} updateMovie={updateMovie}></MovieUpdate>;
  }
}

export default withRouter(UpdatePage);
