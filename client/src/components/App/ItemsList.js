import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Button } from 'semantic-ui-react'
import { getListItems, addChecked, removeChecked } from '../../actions/listActions'
import { addItemToList } from '../../actions/listActions'
import { removeItem } from '../../actions/listActions'
import TaskHandler from './TaskHandler'
import './itemsList.css'

var placeholder = document.createElement("li");
placeholder.className = "placeholder";

export class ItemsList extends Component {
    state = { 
        currentValue: '',
    }
    static defaultProps = {
        options:[ ]
    }
    componentDidMount = () => { getListItems() }

    handleAddition = (e) => { 
        e.preventDefault()
        addItemToList(this.state.currentValue) 
    }

    handleChange = ({ target }) => {
        this.setState({ 
            [target.name]: target.value
        })
    }

    componentWillReceiveProps(newProps) {
        // console.log(this.props)
        // console.log(newProps)
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
                <List divided selection verticalAlign='middle' >
                        {this.props.options.map((task, i) => {
                            return  (
                                <Item key={'item' + task.id} {...task}/>
                            )
                        })}
                        <TaskHandler {...this.props}/>
                </List>
             </div>
        )
    }
};

class Item extends Component {
    onCheckboxChange = ({target}) => {
        if (this.props.isChecked === false) {
            addChecked(target.id)
        } else if (this.props.isChecked === true) {
            removeChecked(target.value)
        }
    }

    handleTaskRemoval = (e) => {
        e.preventDefault()
        removeItem(this.props.id)
    }

    render() {
        return (
            
            <List.Item  className="list-item-wrapper" 
                        draggable="true" 
                        // onDragEnd={this.dragEnd}
                        // onDragStart={this.dragStart}
                        >
                <input  type="checkbox" 
                        className="checkbox"
                        id={this.props.id}
                        value={this.props.id}
                        defaultChecked={this.props.checked}
                        onClick={this.onCheckboxChange}/>
                <List.Content className="message-wrapper">
                    <List.Content className="message">{this.props.text}</List.Content>
                </List.Content>
                <List.Content floated='right'>
                    <Button onClick={this.handleTaskRemoval}>X</Button>
                </List.Content>
            </List.Item> 
        )
    }
}

function mapStateToProps(state) {
    console.log(state.listReducer)
    return {
        options: state.listReducer.listItems
    }
}

export default connect(mapStateToProps)(ItemsList);
