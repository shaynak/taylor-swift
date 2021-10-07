// @flow
import "../style/index.css";
import "../style/App.css";
import InputBox from "./InputBox";
import QueriedLyrics from "./QueriedLyrics";
import InfoButton from "./InfoButton";
import InfoModal from "./InfoModal";
import { isMobile } from "./utils";
import { ArtistName } from "./constants";
import React, { useState } from "react";

const mobile = isMobile();

function App(): React$MixedElement {
  const [queried, setQueried] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);

  const searchHandler = (query: string) => {
    setQueried(true);
    setQuery(query);
  };
  const infoButtonHandler = () => setModal(true);
  const infoModalHandler = () => setModal(false);

  return (
    <div className="App">
      <InfoModal handler={infoModalHandler} display={modal} />
      {queried && query !== "" ? (
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
      <InputBox submitHandler={searchHandler} />
      {queried && query !== "" ? <QueriedLyrics query={query} /> : ""}
      <InfoButton handler={infoButtonHandler}></InfoButton>
    </div>
  );
}

export default App;
