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
    return (
      <div>
        <div className={mobile ? "QueriedLyrics-mobile" : "QueriedLyrics"}>
          {Object.keys(lyricsJSON).map((album) =>
            Object.keys(lyricsJSON[album]).map((song) =>
              lyricsJSON[album][song].map((songLyric) => {
                if (
                  containsQuery(songLyric.lyric, this.props.query) >= 0 &&
                  album !== "Uncategorized"
                ) {
                  return (
                    <SongLyric
                      album={album}
                      song={song}
                      lyric={songLyric.lyric}
                      next={songLyric.next}
                      prev={songLyric.prev}
                      query={this.props.query}
                    />
                  );
                }
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
