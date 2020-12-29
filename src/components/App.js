// @flow
import '../style/App.css';
import '../style/index.css';
import InputBox from './InputBox';
import QueriedLyrics from './QueriedLyrics';
import InfoButton from './InfoButton';
import InfoModal from './InfoModal';
import React from 'react';

type AppState = {
  queried: bool,
  query: ?string,
  modal: bool,
};

class App extends React.Component<{}, AppState> {
  constructor() {
    super();
    this.state = {
      queried: false,
      query: undefined,
      modal: false,
    };
    // NOTE(shayna): this is a workaround for flow
    (this: any).searchHandler = this.searchHandler.bind(this);
    (this: any).infoButtonHandler = this.infoButtonHandler.bind(this);
    (this: any).infoModalHandler = this.infoModalHandler.bind(this);
  }

  searchHandler(query: string) {
    this.setState({
      queried: true,
      query: query,
    });
  }

  infoButtonHandler() {
    this.setState({
      modal: true,
    });
  }

  infoModalHandler() {
    this.setState({
      modal: false,
    });
  }

  render(): any {
    return (
      <div className="App">
        <InfoModal handler={this.infoModalHandler} display={this.state.modal} />
        {this.state.queried && this.state.query ? <div className="top-title"><span className="top-text" onClick={(event) => window.location.reload()}>taylor swift lyric searcher</span></div> : <div className="title"><span className="title-text">taylor swift <br /> lyric searcher</span></div>}
        <InputBox submitHandler={this.searchHandler} />
        {this.state.queried && this.state.query ? <QueriedLyrics query={this.state.query} /> : ""}
        <InfoButton handler={this.infoButtonHandler}></InfoButton>
      </div>);
  }
}


export default App;
