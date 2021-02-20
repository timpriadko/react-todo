import React, { Component } from 'react';

import './SearchPanel.css';

class SearchPanel extends Component {

  constructor() {
    super();

    this.state = {
      term: ''
    }
  }

  onSearchHandler = (e) => {
    const term = e.target.value;
    this.setState({ term })
    this.props.onSearchChange(term);
  }

  render() {

    return (
      <input type="text"
        className="form-control search-input"
        placeholder="type to search"
        onChange={this.onSearchHandler}
        value={this.state.term} />
    );
  }
}

export default SearchPanel;
