// @flow
import "../style/SongLyric.css";
import { boldQueries } from "./utils.js";
import React from "react";

type SongLyricProps = {
  album: string,
  song: string,
  prev: string,
  lyric: string,
  next: string,
  queries: Array<string>,
};

export default function SongLyric({
  album,
  song,
  prev,
  lyric,
  next,
  queries,
}: SongLyricProps): React$MixedElement {
  return (
    <div className="SongLyric">
      <p>
        {prev}
        {prev.length > 0 ? <br /> : ""}
        <span
          className="lyric"
          dangerouslySetInnerHTML={{
            __html: boldQueries(lyric, queries),
          }}
        />
        {next.length > 0 ? <br /> : ""}
        {next}
      </p>
      {song}
      {album !== "NaN" ? "," : ""} <i>{album !== "NaN" ? album : ""}</i>
      <hr></hr>
    </div>
  );
}
