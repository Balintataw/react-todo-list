import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { removeItems, getListItems, getActiveListItems, getCompletedListItems } from '../../actions/listActions'

export class TaskHandler extends Component {
    //removes all items in checkedArray 
    handleTasksRemoval = (e) => {
        e.preventDefault()
        removeItems(this.props.options)
    }
    componentWillReceiveProps = (newProps) => {
    }
    handleShowAll = () => {
        getListItems()
    }
    handleShowActive = () => {
        getActiveListItems()
    }
    handleShowCompleted =() => {
        getCompletedListItems()
    }
    render() {
        return (
            <div id="task-handler-wrapper">
                <p>Items left: {this.props.options.length}</p>
                <Link to={'/'}><Button onClick={this.handleShowAll}>All</Button></Link>
                {/* <Button onClick={this.handleShowActive}>Active</Button> */}
                <Link to={'./showactive'}><Button onClick={this.handleShowActive}>Active</Button></Link>
                {/* <Button onClick={this.handleShowCompleted}>Completed</Button> */}
                <Link to={'./showcompleted'}><Button onClick={this.handleShowCompleted}>Completed</Button></Link>
                <Button onClick={this.handleTasksRemoval}>Clear Completed</Button>
            </div>
        )
    }
};

export default TaskHandler;
