// @flow
import '../style/App.css';
import InputBox from './InputBox';
import React from 'react';

class App extends React.Component<{}> {
  render(): any {
    return (
      <div className="App">
        <InputBox/>
      </div>
    );
  } 
}

export default App;
