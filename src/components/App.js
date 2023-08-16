// @flow
import "../style/index.css";
import "../style/App.css";
import InputBox from "./InputBox";
import QueriedLyrics from "./QueriedLyrics";
import InfoButton from "./InfoButton";
import InfoModal from "./InfoModal";
import FilterModal from "./FilterModal";
import {
  isMobile,
  getURLQueryStrings,
  getURLAlbumStrings,
  URL_QUERY_PARAM,
  URL_ALBUM_PARAM,
  convertQueriesToPlurals,
} from "./utils";
import { ArtistName } from "./constants";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const mobile = isMobile();

function App(): React$MixedElement {
  const [queries, setQueries] = useState<Array<string>>(getURLQueryStrings());
  const [albumFilters, setAlbumFilters] = useState<Array<string>>(
    getURLAlbumStrings()
  );
  const [infoModal, setInfoModal] = useState<boolean>(false);
  const [filterModal, setFilterModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [includePlurals, setIncludePlurals] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  const searchHandler = (query: string) => {
    setIsLoading(true);
    const queryStrings = query
      .split(",")
      .map((queryString) => queryString.trim())
      .filter((queryString) => queryString !== "");
    const URLQueryString = queryStrings
      .map((query) => URL_QUERY_PARAM + "=" + query)
      .concat(albumFilters.map((album) => URL_ALBUM_PARAM + "=" + album))
      .join("&");
    navigate({ search: URLQueryString });
  };

  useEffect(() => {
    // Re-do search if user selects filters unless user is on home screen
    if (queries.length > 0) {
      searchHandler(queries.join(","));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(albumFilters)]);

  useEffect(() => {
    setQueries(getURLQueryStrings());
    setAlbumFilters(getURLAlbumStrings());
    setIsLoading(false);
  }, [location]);

  const infoButtonHandler = () => setInfoModal(true);
  const infoModalHandler = () => setInfoModal(false);

  const filterButtonHandler = () => setFilterModal(true);
  const filterModalHandler = () => setFilterModal(false);

  return (
    <div className="App">
      <InfoModal handler={infoModalHandler} display={infoModal} />
      <FilterModal
        handler={filterModalHandler}
        display={filterModal}
        albumFilters={albumFilters}
        setAlbumFilters={setAlbumFilters}
      />
      {queries.length > 0 ? (
        <div className="top-title">
          <span
            className={mobile ? "top-text-mobile header" : "top-text header"}
            onClick={(event) => {
              setQueries([]);
              setAlbumFilters([]);
              navigate("/");
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
      {queries.length === 0 ? <div className="tips">
          Tip: you can use a * for wildcard search! Try <i>rain*</i>
        </div> : null}
      <InputBox
        submitHandler={searchHandler}
        filterButtonHandler={filterButtonHandler}
        queryString={queries.join(", ")}
        includePlurals={includePlurals}
        setIncludePlurals={setIncludePlurals}
      />
      {queries.length > 0 ? (
        <QueriedLyrics
          queries={includePlurals ? convertQueriesToPlurals(queries) : queries}
          selectedAlbums={albumFilters}
          isLoading={isLoading}
        />
      ) : 
        null
      }
      <InfoButton handler={infoButtonHandler}></InfoButton>
    </div>
  );
}

export default App;
