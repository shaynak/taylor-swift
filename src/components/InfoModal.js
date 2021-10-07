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

export default function InfoModal({
  handler,
  display,
}: InfoModalProps): React$MixedElement {
  const clickOutHandler = (event: any) => {
    if (event.target.className !== "ModalBox") {
      handler();
    }
  };

  return (
    <div
      className="InfoModal"
      onClick={clickOutHandler}
      style={{ display: display ? "block" : "none" }}
    >
      <div className={mobile ? "ModalBox ModalBox-mobile" : "ModalBox"}>
        <p dangerouslySetInnerHTML={{ __html: ModalText }} />
        {/** CREDITS: Please do not edit this. Feel free to add your own credits to ModalText. */}
        <p style={{ fontSize: "14px" }}>
          Made by&nbsp;<a href="http://shaynak.github.io">Shayna Kothari</a>
          &nbsp;using&nbsp;
          <a href="http://reactjs.org">React</a>. Lyrics scraped from&nbsp;
          <a href="http://genius.com">Genius</a>&nbsp; using&nbsp;
          <a href="https://github.com/johnwmillr/LyricsGenius">LyricsGenius</a>.
          If you have comments or suggestions, contact me by{" "}
          <a href="mailto:shayna.kothari@berkeley.edu">email</a> or find me on{" "}
          <a href="http://twitter.com/shaynapping">Twitter</a>!
        </p>
      </div>
    </div>
  );
}
