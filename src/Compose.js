import React, { Component } from 'react';

import TextField from 'material-ui/TextField';

export default class Compose extends Component {
  style = {
    border: "solid 2px blue",
    borderRadius: "10px",
    padding: "10px"
  }

  render() {
    return <TextField autoFocus={true}
                      hintText="Write your tweet"
                      multiLine={true}
                      rows={4} 
                      style={this.style} />;
  }
}