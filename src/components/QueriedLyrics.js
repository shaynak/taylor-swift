// @flow
import "../style/QueriedLyrics.css";
import React from "react";
import SongLyric from "./SongLyric";
import { containsQuery, isMobile, queriesFound } from "./utils.js";

const lyricsJSON = require("../taylor-swift-lyrics/lyrics.json");
const mobile = isMobile();
type QueriedLyricsProps = {
  query: string,
};

class QueriedLyrics extends React.Component<QueriedLyricsProps> {
  countOccurrences(): number {
    let found = 0;
    for (const album in lyricsJSON) {
      if (album !== "Uncategorized") {
        for (const song in lyricsJSON[album]) {
          for (let i = 0; i < lyricsJSON[album][song].length; i++) {
            const songLyric = lyricsJSON[album][song][i];
            found +=
              songLyric.multiplicity *
              queriesFound(songLyric.lyric, this.props.query);
          }
        }
      }
    }
    return found;
  }

  render(): any {
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
                    containsQuery(songLyric.lyric, this.props.query) >= 0 &&
                    album !== "Uncategorized"
                  ) {
                    // Temporary fix because get_lyric_list in scraper.py is failing at this
                    const nextLyric = songLyric.next[0] === '[' ? "" : songLyric.next;
                    return (
                      <SongLyric
                        key={counter}
                        album={album}
                        song={song}
                        lyric={songLyric.lyric}
                        next={nextLyric}
                        prev={songLyric.prev}
                        query={this.props.query}
                      />
                    );
                  }
                  return <></>;
                })
              )
            )}
        </div>
        <div className={mobile ? "totalResults-mobile" : "totalResults"}>
          Total usages found: {this.countOccurrences()}
        </div>
      </div>
    );
  }
}

export default QueriedLyrics;
