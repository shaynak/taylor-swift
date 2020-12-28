// @flow
import React from 'react';
import SongLyric from './SongLyric';

const lyricsJSON = require('../taylor-swift-lyrics/lyrics.json');

type QueriedLyricsProps = {
    query: string
}

class QueriedLyrics extends React.Component<QueriedLyricsProps> {
    containsQuery(lyric: string): bool {
        const query = this.props.query;
        const regex = new RegExp(`([\\.?!,\\s]+|^)${query}([\\.?!,\\s]+|$)`);
        console.log(regex);
        return (lyric.search(regex) >= 0);
    }

    render(): any {
        return (
            <div className="QueriedLyrics">
                {
                    Object.keys(lyricsJSON).map(album =>
                        Object.keys(lyricsJSON[album]).map(song =>
                            lyricsJSON[album][song].map(songLyric => {
                                if (this.containsQuery(songLyric.lyric)) {
                                    return (<SongLyric album={album} song={song} lyric={songLyric.lyric} next={songLyric.next} prev={songLyric.prev} />);
                                }
                            })
                        )
                    )
                }
            </div>
        );
    }
}

export default QueriedLyrics;
