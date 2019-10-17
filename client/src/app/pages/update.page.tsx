import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { MovieUpdate } from '../components/movie-update/movie-update.component';

interface PathParams {
  id: string;
}

interface UpdatePageProps extends RouteComponentProps<PathParams> {}

class UpdatePage extends React.Component<UpdatePageProps> {
  render() {
    return <MovieUpdate />;
  }
}

export default withRouter(UpdatePage);
