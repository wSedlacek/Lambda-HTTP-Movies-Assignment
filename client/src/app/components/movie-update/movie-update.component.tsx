import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button, Card, CardContent, TextField, makeStyles } from '@material-ui/core';

import { Movie } from '../../models/Movie';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginBottom: 10,
  },
}));

interface MovieUpdateProps {
  movie: Movie;
  updateMovie: (movie: Movie) => void;
}

const MovieUpdate: React.FunctionComponent<MovieUpdateProps> = (props) => {
  const classes = useStyles({});
  const history = useHistory();
  const [movie, setMovie] = React.useState<Movie>(props.movie);

  const handleChange = (key: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setMovie({
        ...movie,
        [key]: e.target.value,
      });
    };
  };

  const updateMovie = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { updateMovie } = props;
    if (!movie) return;

    updateMovie(movie);
    history.goBack();
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <form className={classes.form} onSubmit={updateMovie}>
          <TextField
            className={classes.input}
            label='Title'
            value={movie.title}
            onChange={handleChange('title')}
          />
          <TextField
            className={classes.input}
            label='Director'
            value={movie.director}
            onChange={handleChange('director')}
          />
          <TextField
            className={classes.input}
            label='Metascore'
            value={movie.metascore}
            onChange={handleChange('metascore')}
            type='number'
          />
          <Button type='submit'>Update</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export { MovieUpdate };
