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

type QueriedLyricsState = {
  occurrences: number,
};

class QueriedLyrics extends React.Component<
  QueriedLyricsProps,
  QueriedLyricsState
> {
  constructor(props: QueriedLyricsProps) {
    super(props);
    this.state = {
      occurrences: 0,
    };
  }

  componentDidMount(): any {
    this.setState({
      occurrences: document.querySelectorAll(".query").length,
    });
  }

  componentDidUpdate(): any {
    const occurrences = document.querySelectorAll(".query").length;
    if (this.state.occurrences != occurrences) {
      this.setState({
        occurrences: occurrences,
      });
    }
  }

  render(): any {
    return (
      <div>
        <div className={mobile ? "QueriedLyrics-mobile" : "QueriedLyrics"}>
          {Object.keys(lyricsJSON).map((album) =>
            Object.keys(lyricsJSON[album]).map((song) =>
              lyricsJSON[album][song].map((songLyric) => {
                if (containsQuery(songLyric.lyric, this.props.query) >= 0 && album !== "Uncategorized") {
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
          Total usages found: {this.state.occurrences}
        </div>
      </div>
    );
  }
}

export default QueriedLyrics;
