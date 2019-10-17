import React from 'react';
import { Link } from 'react-router-dom';

import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';

import { Movie } from '../../models/Movie';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
  },
  card: {
    position: 'relative',
  },
  link: {
    textDecoration: 'none',
    color: 'unset',
  },
  children: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
}));

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FunctionComponent<MovieCardProps> = (props) => {
  const { title, director, metascore, stars, id } = props.movie;
  const classes = useStyles({});

  return (
    <Link className={classes.link} to={`/movies/${id}`}>
      <Card className={classes.root} elevation={3}>
        <CardContent className={classes.card}>
          <Typography variant='h4' gutterBottom>
            {title}
          </Typography>

          <Typography variant='body1'>
            Director: <em>{director}</em>
          </Typography>
          <Typography variant='body1' gutterBottom>
            Metascore: <strong>{metascore}</strong>
          </Typography>

          <Typography variant='h5'>Actors</Typography>
          {stars.map((star) => (
            <Typography variant='body1' key={star}>
              {star}
            </Typography>
          ))}
          <div className={classes.children}>{props.children}</div>
        </CardContent>
      </Card>
    </Link>
  );
};

export { MovieCard };
