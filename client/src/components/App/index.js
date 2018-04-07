import React, { Component } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ShowActive from '../Filters/ShowActive'
import ShowCompleted from '../Filters/ShowCompleted'

import ItemsList from './ItemsList'


class App extends Component {
  render() {
    return (
      <Router>
        <div id="malaking-container">
          <h1 className="app-title">To Do List</h1>
          {/* Routes go here */}
          <Route exact path="/" component={ItemsList} />
          <Route path="/showactive" component={ShowActive} />
          <Route path="/showcompleted" component={ShowCompleted} />
        </div>
      </Router>
    )
  }
}

export default App
