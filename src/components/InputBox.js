// @flow
import "../style/InputBox.css";
import { isMobile } from "./utils";
import React, { useEffect, useState } from "react";

const mobile = isMobile();

type InputBoxProps = {
  submitHandler: (string) => void,
  filterButtonHandler: () => void,
  setIncludePlurals: (boolean) => void,
  includePlurals: boolean,
  queryString: string,
};

export default function InputBox({
  submitHandler,
  filterButtonHandler,
  setIncludePlurals,
  includePlurals,
  queryString,
}: InputBoxProps): React$MixedElement {
  const [query, setQuery] = useState<string>(queryString);

  useEffect(() => {
    setQuery(queryString);
  }, [queryString]);

  const handleChange = (event: any) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: any) => {
    if (query !== "") submitHandler(query.trim());
    event.preventDefault();
  };

  const handlePlurals = (event: any) => {
    setIncludePlurals(!includePlurals);
  }

  return (
    <>
      <div className="InputBox">
        <form onSubmit={handleSubmit}>
          <label>
            <input
              className={mobile ? "queryBox queryBox-mobile" : "queryBox"}
              type="text"
              value={query}
              onChange={handleChange}
            />
          </label>
          <input className="submitButton" type="submit" value="➔" />
        </form>
        <div className="filtersWrapper">
        <span className="filterModalButton" onClick={handlePlurals}>{includePlurals ? "Including plurals" : "Not including plurals"}</span>
          <span className="filterModalButton" onClick={filterButtonHandler}>
            Filter by album
          </span>
        </div>
      </div>
    </>
  );
}
