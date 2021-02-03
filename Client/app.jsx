class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <h1>Watch Now</h1>
        <form action='/movies' method='GET'>
          <input type='submit' value='Click Here!'></input>
        </form>
      </React.Fragment>
    )
  }
};

ReactDOM.render(<App/>, document.getElementById('root'));
