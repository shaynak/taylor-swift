// @flow
import '../style/SongLyric.css';
import { containsQuery } from './utils.js';
import React from 'react';

type SongLyricProps = {
    album: string,
    song: string,
    prev: string,
    lyric: string,
    next: string,
    query: string,
}

class SongLyric extends React.Component<SongLyricProps> {
    boldQuery(lyric: string, query: string): string {
        const start = containsQuery(lyric, query);
        // This case should never be hit, since a SongLyric 
        // is only created if it contains the query
        if (start === -1) {
            return "";
        }
        const end = start + query.length + 1;
        const left = this.props.lyric.substring(0, start);
        const foundQuery = this.props.lyric.substring(start, end);
        const right = this.props.lyric.substring(end);
        return left + "<b>" + foundQuery + "</b>" + right;
    }

    render(): any {
        return (
            <div className="SongLyric">
                <p>
                    {this.props.prev}
                    <br />
                    <span class="lyric" dangerouslySetInnerHTML={{ __html: this.boldQuery(this.props.lyric, this.props.query) }} />
                    <br />
                    {this.props.next}
                </p>
                {this.props.song}, <i>{this.props.album}</i>
                <hr></hr>
            </div>
        );
    }
}

export default SongLyric;
