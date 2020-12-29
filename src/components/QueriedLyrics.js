// @flow
import "../style/QueriedLyrics.css";
import React from "react";
import SongLyric from "./SongLyric";
import { containsQuery, isMobile } from "./utils.js";

const lyricsJSON = require("../taylor-swift-lyrics/lyrics.json");
const mobile = isMobile();
type QueriedLyricsProps = {
  query: string,
};

class QueriedLyrics extends React.Component<QueriedLyricsProps> {
  render(): any {
    return (
      <div className={mobile ? "QueriedLyrics-mobile" : "QueriedLyrics"}>
        {Object.keys(lyricsJSON).map((album) =>
          Object.keys(lyricsJSON[album]).map((song) =>
            lyricsJSON[album][song].map((songLyric) => {
              if (containsQuery(songLyric.lyric, this.props.query) >= 0) {
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
    );
  }
}

export default QueriedLyrics;
