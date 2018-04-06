import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { removeItems } from '../../actions/listActions'

export class TaskHandler extends Component {
    //removes all items in checkedArray 
    handleTasksRemoval = (e) => {
        console.log(this.props.options)
        e.preventDefault()
        removeItems(this.props.options)
    }
    render() {
        return (
            <div>
                <p>{this.props.options.length} items left</p>
                <Button>All</Button>
                <Button>Active</Button>
                <Button>Completed</Button>
                <Button onClick={this.handleTasksRemoval}>Clear Completed</Button>
            </div>
        )
    }
};

export default TaskHandler;
