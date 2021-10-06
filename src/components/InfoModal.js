// @flow
import "../style/InfoModal.css";
import { isMobile } from "./utils";
import { ModalText } from "./constants";
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
          <p dangerouslySetInnerHTML={{ __html: ModalText }} />
          {/** CREDITS: Please do not edit this. Feel free to add your own credits to ModalText. */}
          <p style={{ "fontSize": "14px" }}>
            Made by&nbsp;<a href="http://shaynak.github.io">Shayna Kothari</a>
            &nbsp;using&nbsp;
            <a href="http://reactjs.org">React</a>. Lyrics scraped from&nbsp;
            <a href="http://genius.com">Genius</a>&nbsp; using&nbsp;
            <a href="https://github.com/johnwmillr/LyricsGenius">
              LyricsGenius
            </a>
            . If you have comments or suggestions, contact me by{" "}
            <a href="mailto:shayna.kothari@berkeley.edu">email</a> or find me on{" "}
            <a href="http://twitter.com/shaynapping">Twitter</a>!
          </p>
        </div>
      </div>
    );
  }
}

export default InfoModal;
