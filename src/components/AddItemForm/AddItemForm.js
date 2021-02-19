import React, { Component } from 'react'

import './AddItemForm.css'

class AddItemForm extends Component {

  render() {
    return (
      <div className="add-item-form">
        <button
          className="btn btn-outline-secondary"
          onClick={() => this.props.addItem("Hello World")}
        >
          Add Item
        </button>
      </div>
    )
  }
}

export default AddItemForm