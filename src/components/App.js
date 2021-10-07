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
  const [queries, setQueries] = useState<Array<string>>([]);
  const [modal, setModal] = useState<boolean>(false);

  const searchHandler = (query: string) => {
    setQueried(true);
    setQueries(query.split(',').map(queryString => queryString.trim()));
  };
  const infoButtonHandler = () => setModal(true);
  const infoModalHandler = () => setModal(false);

  return (
    <div className="App">
      <InfoModal handler={infoModalHandler} display={modal} />
      {queried && queries.length > 0 ? (
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
      {queried && queries.length > 0 ? <QueriedLyrics queries={queries} /> : null}
      <InfoButton handler={infoButtonHandler}></InfoButton>
    </div>
  );
}

export default App;
