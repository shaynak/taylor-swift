// @flow
import '../style/InfoModal.css';
import React from 'react';

type InfoModalProps = {
    handler: () => void,
    display: bool,
}

type InfoModalState = {
    faded: bool,
}

class InfoModal extends React.Component<InfoModalProps, InfoModalState> {
    constructor(props: InfoModalProps): void {
        super(props);
        this.state = {
            faded: false,
        };
        (this: any).clickOutHandler = this.clickOutHandler.bind(this);
    }

    clickOutHandler(event: any): void {
        if (event.target.className !== 'ModalBox') {
            this.props.handler();
        }
    }

    render(): any {
        console.log(this.props.display);
        return (
            <div className="InfoModal" onClick={this.clickOutHandler} style={{ "display": this.props.display ? "block" : "none" }}>
                <div className="ModalBox">
                    Made by&nbsp;<a href="http://shaynak.github.io">Shayna Kothari</a>&nbsp;using&nbsp;
                 <a href="http://reactjs.org">React</a>. Lyrics scraped
                 from&nbsp;<a href="http://genius.com">Genius</a>&nbsp;
                 using&nbsp;<a href="https://github.com/johnwmillr/LyricsGenius">LyricsGenius</a>. Scraped
                data can be found&nbsp;<a href="https://github.com/shaynak/taylor-swift-lyrics">here</a>.
            </div>
            </div>
        );
    }
}

export default InfoModal;
