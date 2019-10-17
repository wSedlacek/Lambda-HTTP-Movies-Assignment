import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Card, CardContent, Typography, makeStyles } from '@material-ui/core';

import { Movie } from '../../models/Movie';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    margin: '10px auto',
  },
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  list: {
    display: 'flex',
  },
}));

interface SavedListProps {
  list: Movie[];
}

const SavedList: React.FunctionComponent<SavedListProps> = (props) => {
  const { list } = props;
  const classes = useStyles({});

  return (
    <Card className={classes.root}>
      <CardContent className={classes.card}>
        <Typography variant='h5'>Saved Movies:</Typography>
        <div className={classes.list}>
          {list.map((movie) => {
            return (
              <Link to={`/movies/${movie.id}`} key={movie.id}>
                <Button>{movie.title}</Button>
              </Link>
            );
          })}
        </div>
        <Link to='/'>
          <Button color='primary' variant='contained'>
            Home
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export { SavedList };
