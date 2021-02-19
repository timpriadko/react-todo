import React, { Component } from 'react'

import './AddItemForm.css'

class AddItemForm extends Component {

  constructor() {
    super();

    this.state = {
      label: ''
    }
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();

    this.props.addItem(this.state.label);

    this.state.label = '';
  }

  render() {
    return (
      <form className="add-item-form d-flex"
        onSubmit={this.onSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="What needs to be done"
          onChange={this.onLabelChange}
          value={this.state.label}
        />
        <button
          className="btn btn-outline-secondary"
        >
          Add Item
        </button>
      </form>
    )
  }
}

export default AddItemForm