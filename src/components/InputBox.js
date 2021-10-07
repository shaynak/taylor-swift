// @flow
import "../style/InputBox.css";
import { isMobile } from "./utils";
import React, { useState } from "react";

const mobile = isMobile();

type InputBoxProps = {
  submitHandler: (string) => void,
};

export default function InputBox({
  submitHandler,
}: InputBoxProps): React$MixedElement {
  const [query, setQuery] = useState<string>("");

  const handleChange = (event: any) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: any) => {
    if (query !== "") submitHandler(query.trim());
    event.preventDefault();
  };

  return (
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
    </div>
  );
}
