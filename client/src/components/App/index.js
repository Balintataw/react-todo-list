import React, { Component } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import ItemsList from './ItemsList'


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <h1>To Do List</h1>
          {/* Routes go here */}
          <Route exact path="/" component={ItemsList} />
        </div>
      </Router>
    )
  }
}

export default App
