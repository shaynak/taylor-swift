// @flow
import "../style/SongLyric.css";
import { boldQuery } from "./utils.js";
import React from "react";

type SongLyricProps = {
  album: string,
  song: string,
  prev: string,
  lyric: string,
  next: string,
  query: string,
};

export default function SongLyric({
  album,
  song,
  prev,
  lyric,
  next,
  query,
}: SongLyricProps): React$MixedElement {
  return (
    <div className="SongLyric">
      <p>
        {prev}
        {prev.length > 0 ? <br /> : ""}
        <span
          className="lyric"
          dangerouslySetInnerHTML={{
            __html: boldQuery(lyric, query),
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
