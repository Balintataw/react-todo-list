import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Image, Button } from 'semantic-ui-react'
import { getListItems } from '../../actions/listActions'
import { addItemToList } from '../../actions/listActions'

import './itemsList.css'

export class ItemsList extends Component {
    state = { 
        currentValue: ''    
    }

    static defaultProps = {
        options:[ ],
    }
    componentDidMount = () => {
        getListItems()
    }

    handleAddition = (e, { value }) => {
        console.log(value)
        addItemToList(value)
    }
            
    handleChange = ({ target }) => {
        this.setState({ 
            [target.name]: target.value 
        })
    }        
    render() {
        return (
            <div className="list-wrapper">
                <form action="">
                    <input  type="text"
                            id="task-input"
                            placeholder="What needs to be done?" 
                            name="currentValue"
                            value={this.state.currentValue}
                            onChange={this.handleChange}
                            onSubmit={this.handleAddition}
                    />
                    <button type="submit" id="add-btn">Add</button>
                </form>
                <List animated divided selection verticalAlign='middle'>
                    {this.props.options.map((task, i) => {
                        return  <List.Item key={"task" + i} className="list-item-wrapper">
                                    <input type="checkbox" className="checkbox"/>
                                    <List.Content className="message-wrapper">
                                        <List.Content className="message">{task.text}</List.Content>
                                    </List.Content>
                                    <List.Content floated='right'>
                                        <Button>X</Button>
                                    </List.Content>
                                </List.Item>
                    })}
                </List>
            </div>
        )
    }
};

function mapStateToProps(state) {
    // console.log(state.listReducer)
    return {
        options: state.listReducer.listItems
    }
}

export default connect(mapStateToProps)(ItemsList);
