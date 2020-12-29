// @flow
import '../style/App.css';
import '../style/index.css';
import InputBox from './InputBox';
import QueriedLyrics from './QueriedLyrics';
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
    if (this.state.queried && this.state.query) {
      return (<div className="App">
        <div className="top-title"><span className="top-text" onClick={(event) => window.location.reload()}>taylor swift lyric searcher</span></div>
        <InputBox submitHandler={this.searchHandler} />
        <QueriedLyrics query={this.state.query} />
      </div>);
    } else {
      return (<div className="App">
        <div className="title"><span className="title-text">taylor swift</span> <br /><br /><span className="title-text">lyric searcher</span></div>
        <InputBox submitHandler={this.searchHandler} />
      </div>);
    }
  }
}

export default App;
