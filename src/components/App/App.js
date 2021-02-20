import React, { Component } from 'react';

import AppHeader from '../AppHeader';
import SearchPanel from '../SearchPanel';
import TodoList from '../TodoList';
import ItemStatusFilter from '../ItemStatusFilter';
import AddItemForm from '../AddItemForm';

import './App.css';

class App extends Component {

  maxId = 100;

  constructor() {
    super();

    this.state = {
      todoData: [
        this.createTodoItem('Drink Coffee'),
        this.createTodoItem('Make Awesome App'),
        this.createTodoItem('Have a lunch'),
      ],
      term: '',
      filter: 'all'
    }
  }

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  deleteItem = (id) => {

    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArr = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArr
      }
    })
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];

      return {
        todoData: newArr
      }
    })
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

    // update object
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }

    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ]
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    })
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    })
  }

  onSearchChange = (term) => {
    this.setState({ term })
  }

  search = (items, value) => {

    // search in items
    const searchArr = items.filter((listItem) => {
      return listItem.label.toLowerCase().indexOf(value.toLowerCase()) > -1;
    })

    if (value) {
      return searchArr;
    } else {
      return items;
    }
  }

  filter = (items, filter) => {
    switch (filter) {
      case "all":
        return items;
      case 'active':
        return items.filter((item) => !item.done)
      case 'done':
        return items.filter((item) => item.done)
      default:
        return items;
    }
  }

  onStatusHandler = (filter) => {
    this.setState({ filter })
  }

  render() {

    const doneCount = this.state.todoData.filter(item => item.done).length;
    const todoCount = this.state.todoData.length - doneCount;
    const { todoData, term, filter } = this.state;
    const visibleItems = this.filter(
      this.search(todoData, term), filter);

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter
            filter={filter}
            onStatusHandler={this.onStatusHandler} />
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />

        <AddItemForm
          addItem={this.addItem}
        />
      </div>
    );
  }
};

export default App