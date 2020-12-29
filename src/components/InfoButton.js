// @flow
import '../style/InfoButton.css';
import React from 'react';

type InfoButtonProps = {
    handler: (any) => void;
}

class InfoButton extends React.Component<InfoButtonProps> {
    render(): any {
        return (
            <div className="InfoButton" onClick={this.props.handler}>?</div>
        );
    }
}

export default InfoButton;
