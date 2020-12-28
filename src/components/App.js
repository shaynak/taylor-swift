// @flow
import '../style/App.css';
import InputBox from './InputBox';
import React from 'react';

type AppState = {
  queried: bool,
  query: ?string,
};

class App extends React.Component<{}, AppState> {
  constructor() {
    super();
    this.state = {
      queried: false,
      query: undefined,
    };
    // NOTE(shayna): this is a workaround for flow
    (this: any).searchHandler = this.searchHandler.bind(this);
  }

  searchHandler(query: string) {
    this.setState({
      queried: true,
      query: query,
    });
  }

  render(): any {
    return (
    <div className="App">
      {
        this.state.queried 
        ? <InputBox submitHandler={this.searchHandler}/>
        : <InputBox submitHandler={this.searchHandler}/>
      }
    </div>);
  } 
}

export default App;
