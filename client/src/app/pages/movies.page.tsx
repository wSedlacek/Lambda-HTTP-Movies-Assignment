import React from 'react';

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
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    );
  }
}

export default MoviesPage;
