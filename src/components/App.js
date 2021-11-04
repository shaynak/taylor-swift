// @flow
import "../style/index.css";
import "../style/App.css";
import InputBox from "./InputBox";
import QueriedLyrics from "./QueriedLyrics";
import InfoButton from "./InfoButton";
import InfoModal from "./InfoModal";
import { isMobile, getURLQueryStrings, URL_QUERY_PARAM } from "./utils";
import { ArtistName } from "./constants";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const mobile = isMobile();

function App(): React$MixedElement {
  const [queries, setQueries] = useState<Array<string>>(getURLQueryStrings());
  const [modal, setModal] = useState<boolean>(false);
  const history = useHistory();

  const searchHandler = (query: string) => {
    const queryStrings = query
      .split(",")
      .map((queryString) => queryString.trim())
      .filter((queryString) => queryString !== "");
    const URLQueryString = queryStrings
      .map((query) => URL_QUERY_PARAM + "=" + query)
      .join("&");
    history.push({ search: URLQueryString });
  };

  history.listen((location, action) => {
    setQueries(getURLQueryStrings());
  });

  const infoButtonHandler = () => setModal(true);
  const infoModalHandler = () => setModal(false);

  return (
    <div className="App">
      <InfoModal handler={infoModalHandler} display={modal} />
      {queries.length > 0 ? (
        <div className="top-title">
          <span
            className={mobile ? "top-text-mobile header" : "top-text header"}
            onClick={(event) => {
              setQueries([]);
              history.push("/");
            }}
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
      <InputBox
        submitHandler={searchHandler}
        queryString={queries.join(", ")}
      />
      {queries.length > 0 ? <QueriedLyrics queries={queries} /> : null}
      <InfoButton handler={infoButtonHandler}></InfoButton>
    </div>
  );
}

export default App;
