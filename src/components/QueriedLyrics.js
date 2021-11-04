// @flow
import "../style/QueriedLyrics.css";
import React from "react";
import SongLyric from "./SongLyric";
import { containsQuery, isMobile, queriesFound } from "./utils.js";

const lyricsJSON = require("../taylor-swift-lyrics/lyrics.json");
const mobile = isMobile();
type QueriedLyricsProps = {
  queries: Array<string>,
};

export default function QueriedLyrics({
  queries,
}: QueriedLyricsProps): React$MixedElement {
  const countOccurrences = (): { occurrences: number, songs: number } => {
    let found = 0;
    let songs = 0;
    for (const query of queries) {
      for (const album in lyricsJSON) {
        if (album !== "Uncategorized") {
          for (const song in lyricsJSON[album]) {
            let foundInSong = false;
            for (let i = 0; i < lyricsJSON[album][song].length; i++) {
              const songLyric = lyricsJSON[album][song][i];
              const timesFound = queriesFound(songLyric.lyric, query);
              found += songLyric.multiplicity * timesFound;
              foundInSong = foundInSong || timesFound > 0;
            }
            songs += foundInSong ? 1 : 0;
          }
        }
      }
    }
    return { occurrences: found, songs: songs };
  };

  const {occurrences, songs} = countOccurrences();
  let counter = 0;
  return (
    <div>
      <div className={mobile ? "QueriedLyrics-mobile" : "QueriedLyrics"}>
        {Object.keys(lyricsJSON)
          .sort((album1, album2) => {
            if (album1 === "Unreleased Songs") {
              return 1;
            } else if (album2 === "Unreleased Songs") {
              return -1;
            }
            return 0;
          })
          .map((album) =>
            Object.keys(lyricsJSON[album]).map((song) =>
              lyricsJSON[album][song].map((songLyric) => {
                counter++;
                if (
                  queries.some(
                    (query) => containsQuery(songLyric.lyric, query) >= 0
                  ) &&
                  album !== "Uncategorized"
                ) {
                  return (
                    <SongLyric
                      key={counter}
                      album={album}
                      song={song}
                      lyric={songLyric.lyric}
                      next={songLyric.next}
                      prev={songLyric.prev}
                      queries={queries}
                    />
                  );
                }
                return <></>;
              })
            )
          )}
      </div>
      <div className={mobile ? "totalResults-mobile" : "totalResults"}>
        Found {occurrences} usage{occurrences === 1 ? "" : "s"} in {songs}{" "}
        song{songs === 1 ? "" : "s"}
      </div>
    </div>
  );
}
