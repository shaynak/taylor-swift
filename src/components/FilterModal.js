// @flow
import "../style/FilterModal.css";
import { isMobile } from "./utils";
import { ALBUMS } from "./constants";
import React, { useState } from "react";
import FilterSelection from "./FilterSelection";

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

  const clickOutHandler = (event: any) => {
    if (event.target.className === "FilterModal") {
      setAlbumFilters(selectedAlbums);
      handler();
    }
  };

  const handleChange = (album: string, checked: boolean) => {
    if (checked && !selectedAlbums.includes(album)) {
      setSelectedAlbums(selectedAlbums.concat(album));
    } else if (!checked) {
      setSelectedAlbums(
        selectedAlbums.filter((selectedAlbum) => selectedAlbum !== album)
      );
    }
  };

  return (
    <div
      className="FilterModal"
      onClick={clickOutHandler}
      style={{ display: display ? "block" : "none" }}
    >
      <div className={mobile ? "ModalBox ModalBox-mobile" : "ModalBox"}>
        Select any albums and/or categories of music that you'd like to filter
        on! If no albums are selected, all albums will be searched. Click out to
        save.
        <div className="filterInput">
          {ALBUMS.map((album) => (
            <FilterSelection
              defaultChecked={selectedAlbums.includes(album)}
              value={album}
              onChange={handleChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
