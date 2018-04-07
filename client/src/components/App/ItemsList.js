import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Button } from 'semantic-ui-react'
import { getListItems, addChecked, removeChecked } from '../../actions/listActions'
import { addItemToList } from '../../actions/listActions'
import { removeItem } from '../../actions/listActions'
import TaskHandler from './TaskHandler'
import './itemsList.css'

export class ItemsList extends Component {
    state = { 
        currentValue: '',
    }
    static defaultProps = {
        options:[ ]
    }
    componentDidMount = () => { 
        getListItems() 
    }

    handleAddition = (e) => { 
        e.preventDefault()
        addItemToList(this.state.currentValue) 
        this.setState({
            currentValue: ''
        })
    }

    handleChange = ({ target }) => {
        this.setState({ 
            [target.name]: target.value
        })
    }

    componentWillReceiveProps(newProps) {
        // console.log(this.prop)
        // console.log(newProps)
    }

    render() {
        return (
            <div className="list-wrapper">
                <form action=""  id="form">
                    <input  type="text"
                            id="task-input"
                            placeholder="What needs to be done?" 
                            name="currentValue"
                            value={this.state.currentValue}
                            onChange={this.handleChange}
                    />
                    <Button type="submit" icon="plus" onClick={this.handleAddition} id="add-btn" />
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
        console.log(this.props)
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

    handleDoubleClick = (e) => {
        e.preventDefault()
        console.log('double')
    }

    render() {
        return (
            
            <List.Item  className="list-item-wrapper" 
                        draggable="true" 
                        onDoubleClick={this.handleDoubleClick}
                        // onDragEnd={this.dragEnd}
                        // onDragStart={this.dragStart}
                        >
                <input  type="checkbox" 
                        className="checkbox"
                        id={this.props.id}
                        value={this.props.id}
                        checked={this.props.isChecked}
                        onChange={this.onCheckboxChange}/>  
                <span></span>
                {/* <List.Content  verticalAlign="middle">
                    <Button  icon="pencil alternate" className="pencil" verticalalign="middle"  />
                </List.Content> */}
                <List.Content className="message-wrapper">
                    <List.Content className="message">{this.props.text}</List.Content>
                </List.Content>
                <List.Content floated='right' verticalAlign="middle">
                    <Button circular icon="minus" verticalalign="middle" onClick={this.handleTaskRemoval} />
                </List.Content>
            </List.Item> 
        )
    }
}

function mapStateToProps(state) {
    // console.log(state.listReducer)
    return {
        options: state.listReducer.listItems
    }
}

export default connect(mapStateToProps)(ItemsList);
