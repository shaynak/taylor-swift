// @flow
import "../style/FilterModal.css";
import { isMobile, getAlbums } from "./utils";
import { ModalText } from "./constants";
import React, { useState } from "react";

const mobile = isMobile();

type FilterModalProps = {
  albumFilters: Array<string>,
  handler: () => void,
  setAlbumFilters: (Array<string>) => void,
  display: boolean,
};

export default function FilterModal({
  albumFilters,
  handler,
  setAlbumFilters,
  display,
}: FilterModalProps): React$MixedElement {
  const [selectedAlbums, setSelectedAlbums] = useState<Array<string>>(
    albumFilters
  );

  const albums = getAlbums();

  const clickOutHandler = (event: any) => {
    if (event.target.className === "FilterModal") {
      setAlbumFilters(selectedAlbums);
      handler();
    }
  };

  const handleChange = (event: any) => {
    const album: string = event.target.value;
    if (event.target.checked && !selectedAlbums.includes(album)) {
      setSelectedAlbums(selectedAlbums.concat(album));
    } else if (!event.target.checked) {
      setSelectedAlbums(
        selectedAlbums.filter((selectedAlbum) => selectedAlbum !== album)
      );
    }
  };

  const handleSubmit = (event: any) => {
    setAlbumFilters(selectedAlbums);
    handler();
    event.preventDefault();
  };

  return (
    <div
      className="FilterModal"
      onClick={clickOutHandler}
      style={{ display: display ? "block" : "none" }}
    >
      <div className={mobile ? "ModalBox ModalBox-mobile" : "ModalBox"}>
        Select any albums and/or categories of music that you'd like to filter
        on! If no albums are selected, all albums will be searched. Click out to save.
        <div className="filterInput">
          <form onSubmit={handleSubmit}>
            {albums.sort().map((album) => (
              <label className="checkboxInput">
                <input
                  className={"checkbox"}
                  checked={selectedAlbums.includes(album)}
                  type="checkbox"
                  value={album}
                  onChange={handleChange}
                />
                {album}
              </label>
            ))}
          </form>
        </div>
      </div>
    </div>
  );
}
