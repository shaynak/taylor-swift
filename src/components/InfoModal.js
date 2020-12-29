// @flow
import "../style/InfoModal.css";
import { isMobile } from "./utils";
import React from "react";

const mobile = isMobile();

type InfoModalProps = {
  handler: () => void,
  display: boolean,
};

type InfoModalState = {
  faded: boolean,
};

class InfoModal extends React.Component<InfoModalProps, InfoModalState> {
  constructor(props: InfoModalProps): void {
    super(props);
    this.state = {
      faded: false,
    };
    (this: any).clickOutHandler = this.clickOutHandler.bind(this);
  }

  clickOutHandler(event: any): void {
    if (event.target.className !== "ModalBox") {
      this.props.handler();
    }
  }

  render(): any {
    return (
      <div
        className="InfoModal"
        onClick={this.clickOutHandler}
        style={{ display: this.props.display ? "block" : "none" }}
      >
        <div className={mobile ? "ModalBox ModalBox-mobile" : "ModalBox"}>
          <p>
            Search for a word or a phrase and see all the places Taylor Swift
            has used it in her music! Currently, this searcher does not support
            different forms of words (e.g. you must make separate queries for
            "rain" and "raining").
          </p>
          <p style={{ "font-size": "14px" }}>
            Made by&nbsp;<a href="http://shaynak.github.io">Shayna Kothari</a>
            &nbsp;using&nbsp;
            <a href="http://reactjs.org">React</a>. Lyrics scraped from&nbsp;
            <a href="http://genius.com">Genius</a>&nbsp; using&nbsp;
            <a href="https://github.com/johnwmillr/LyricsGenius">
              LyricsGenius
            </a>
            . Scraped data can be found&nbsp;
            <a href="https://github.com/shaynak/taylor-swift-lyrics">here</a>.
          </p>
        </div>
      </div>
    );
  }
}

export default InfoModal;
