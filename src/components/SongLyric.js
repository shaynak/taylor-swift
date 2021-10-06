// @flow
import "../style/SongLyric.css";
import { containsQuery, cleanLyric } from "./utils.js";
import React from "react";

type SongLyricProps = {
  album: string,
  song: string,
  prev: string,
  lyric: string,
  next: string,
  query: string,
};

class SongLyric extends React.Component<SongLyricProps> {
  boldQuery(lyric: string, query: string): string {
    lyric = cleanLyric(lyric);
    query = cleanLyric(query);
    let start: number, end: number;
    let boldedLyric = "";
    do {
      start = containsQuery(lyric, query);
      if (start === -1) {
        return boldedLyric + lyric;
      }
      end = start + query.length;
      // If not at the beginning, we need to shift start and end
      // because containsQuery will return the index of the space
      // before the start of the query
      if (lyric.toLowerCase().charAt(0) !== query.toLowerCase().charAt(0)) {
        start += 1;
        end += 1;
      }
      boldedLyric =
        boldedLyric +
        lyric.substring(0, start) +
        '<span class="query">' +
        lyric.substring(start, end) +
        "</span>";
      lyric = lyric.substring(end);
    } while (lyric.length > 0);
    return boldedLyric;
  }

  render(): any {
    return (
      <div className="SongLyric">
        <p>
          {this.props.prev}
          {this.props.prev.length > 0 ? <br /> : ""}
          <span
            className="lyric"
            dangerouslySetInnerHTML={{
              __html: this.boldQuery(this.props.lyric, this.props.query),
            }}
          />
          {this.props.next.length > 0 ? <br /> : ""}
          {this.props.next}
        </p>
        {this.props.song}
        {this.props.album !== "NaN" ? "," : ""}{" "}
        <i>{this.props.album !== "NaN" ? this.props.album : ""}</i>        <hr></hr>
      </div>
    );
  }
}

export default SongLyric;
