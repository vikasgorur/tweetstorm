import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Compose from './Compose';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
            <Compose />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
