// @flow
import React from 'react';

type SongLyricProps = {
    album: string,
    song: string,
    prev: string,
    lyric: string,
    next: string,
}

class SongLyric extends React.Component<SongLyricProps> {
    render(): any {
        return (
            <div className="SongLyric">
                <p>
                    {this.props.prev}
                    <br />
                    {this.props.lyric}
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
