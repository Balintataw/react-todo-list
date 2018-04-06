import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Image, Button } from 'semantic-ui-react'
import { getListItems } from '../../actions/listActions'
import { addItemToList } from '../../actions/listActions'
import { removeItems } from '../../actions/listActions'

import './itemsList.css'

export class ItemsList extends Component {
    state = { 
        currentValue: '',
        checked: false,
        checkedArray: []
    }

    static defaultProps = {
        options:[ ]
    }
    componentDidMount = () => {
        getListItems()
    }

    handleAddition = ({ value }) => {
        addItemToList(this.state.currentValue)
    }
    handleChange = ({ target }) => {
        this.setState({ 
            [target.name]: target.value,
            currentValue: target.value
        })
    }
    handleTaskRemoval = (e) => {
        removeItems(this.state.checkedArray)
    }
    onCheckboxChange = (e) => {
        this.setState({
            [e.target.checked]: !!e.target.checked,
        })
        if (e.target.checked === true) {
            console.log('is checked')
            
            this.setState({
                checkedArray: [...this.state.checkedArray, e.target.value]
            })
        } else {
            //remove this from array this is more of a clear all than delete single
        }
    }
    render() {
        return (
            
            <div className="list-wrapper">
                <form action=""  >
                    <input  type="text"
                            id="task-input"
                            placeholder="What needs to be done?" 
                            name="currentValue"
                            value={this.state.currentValue}
                            onChange={this.handleChange}
                            // onClick={this.handleAddition}
                    />
                    <button type="submit" onClick={this.handleAddition} id="add-btn">Add</button>
                </form>
        {console.log(this.state.checkedArray)}
                
                <List animated divided selection verticalAlign='middle'>
                    {this.props.options.map((task, i) => {
                        return  <List.Item key={"task" + i} className="list-item-wrapper">
                                    <input  type="checkbox" 
                                            className="checkbox"
                                            value={task.key}
                                            defaultChecked={this.state.checked}
                                            onMouseDown={this.onCheckboxChange}/>
                                    <List.Content className="message-wrapper">
                                        <List.Content className="message">{task.text}</List.Content>
                                    </List.Content>
                                    <List.Content floated='right'>
                                        <Button onClick={this.handleTaskRemoval}>X</Button>
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
