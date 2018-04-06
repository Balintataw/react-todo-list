import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

export class TaskHandler extends Component {
    render() {
        return (
            <div>
                <p>{this.props.options.length} items left</p>
                <Button>All</Button>
                <Button>Active</Button>
                <Button>Completed</Button>
                <Button>Clear Completed</Button>
            </div>
        )
    }
};

export default TaskHandler;
