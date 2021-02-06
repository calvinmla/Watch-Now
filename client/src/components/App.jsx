import React from 'react';
import MovieButton from './movieButton.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // still implementing
      isClicked: false
    };
  }
  render() {
    return (
      <React.Fragment>
        <h1>Stop thinking about what to watch and...</h1>
        <MovieButton/>
      </React.Fragment>
    )
  }
};

export default App;