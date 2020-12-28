// @flow
import '../style/InputBox.css';
import React from 'react';

type InputBoxProps = {
  submitHandler: (string) => void,
}
type InputBoxState = {
  query: ?string,
}

class InputBox extends React.Component<InputBoxProps, InputBoxState> {
  constructor() {
    super();
    this.state = {
      query: undefined,
    };
    // NOTE(shayna): this is a workaround for flow
    (this: any).handleChange = this.handleChange.bind(this);
    (this: any).handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: any) {
    this.setState({ query: event.target.value.trim() });
  }

  handleSubmit(event: any) {
    if (this.state.query) this.props.submitHandler(this.state.query.trim());
    event.preventDefault();
  }

  render(): any {
    return (
      <div className="InputBox">
        <form onSubmit={this.handleSubmit}>
          <label>
            Word:
                  <input type="text" value={this.state.query} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Go" />
        </form>
      </div>
    );
  }
}

export default InputBox;
