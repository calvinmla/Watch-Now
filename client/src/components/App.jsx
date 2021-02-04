import React, { Fragment } from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Fragment>
        <h1>Watch Now</h1>
        <form action='/movies' method='GET'>
          <input type='submit' value='Click Here!'/>
        </form>
      </Fragment>
    )
  }
};

export default App;