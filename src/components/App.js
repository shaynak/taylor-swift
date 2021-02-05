// @flow
import "../style/index.css";
import "../style/App.css";
import InputBox from "./InputBox";
import QueriedLyrics from "./QueriedLyrics";
import InfoButton from "./InfoButton";
import InfoModal from "./InfoModal";
import { isMobile } from "./utils";
import { ArtistName } from "./constants";
import React from "react";

const mobile = isMobile();
type AppState = {
  queried: boolean,
  query: ?string,
  modal: boolean,
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
        {this.state.queried && this.state.query ? (
          <div className="top-title">
            <span
              className={mobile ? "top-text-mobile header" : "top-text header"}
              onClick={(event) => window.location.reload()}
            >
              {ArtistName} lyric searcher
            </span>
          </div>
        ) : (
          <div className="title">
            <span
              className={
                mobile ? "title-text-mobile header" : "title-text header"
              }
            >
              {ArtistName} <br /> lyric searcher
            </span>
          </div>
        )}
        <InputBox submitHandler={this.searchHandler} />
        {this.state.queried && this.state.query ? (
          <QueriedLyrics query={this.state.query} />
        ) : (
          ""
        )}
        <InfoButton handler={this.infoButtonHandler}></InfoButton>
      </div>
    );
  }
}

export default App;
