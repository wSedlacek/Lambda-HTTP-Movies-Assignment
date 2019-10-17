import React from 'react';
import { Link } from 'react-router-dom';

import { Movie } from '../models/Movie';
import { MovieCard } from '../components/movie-card/movie-card.component';

interface MoviesPageProps {
  movies: Movie[];
}

class MoviesPage extends React.Component<MoviesPageProps> {
  render() {
    const { movies } = this.props;

    return (
      <div>
        {movies.map((movie) => (
          <Link to={`/movies/${movie.id}`}>
            <MovieCard key={movie.id} movie={movie} />
          </Link>
        ))}
      </div>
    );
  }
}

export default MoviesPage;
