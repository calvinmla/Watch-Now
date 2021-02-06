import React from 'react';

const MovieButton = (props) => {
  return (<React.Fragment>
    <form action='/movies' method='GET'>
      <input type='submit' value='Click Here!'/>
    </form>
  </React.Fragment>);
}

export default MovieButton;