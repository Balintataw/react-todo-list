import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Button } from 'semantic-ui-react'
import { getListItems, addChecked, removeChecked, editItem } from '../../actions/listActions'
import { addItemToList } from '../../actions/listActions'
import { removeItem } from '../../actions/listActions'
import TaskHandler from './TaskHandler'
import './itemsList.css'

export class ItemsList extends Component {
    state = { 
        currentValue: '',
        editMessage: ''
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
                <p>double click to edit</p>
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
    state = {
        edit: false,
        editMessage: '',
        editId: ''
    }

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

    handleDoubleClick = (e) => {
        e.preventDefault()
        this.setState({
            edit: !this.state.edit,
            editId: e.target.id
        })
    }

    handleChange = ({ target }) => {
        this.setState({ 
            [target.name]: target.value
        })
    }

    handleEdit = (e) => {
        e.preventDefault()
        editItem(this.state.editId, this.state.editMessage)
        this.setState({
            edit: !this.state.edit
        })
    }

    render() {
        return (
            
            <List.Item  className="list-item-wrapper" 
                        draggable="true" 
                        // onDoubleClick={this.handleDoubleClick}
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
                {!this.state.edit ? <List.Content className="message-wrapper">
                    <List.Content className={this.props.messageState} id={this.props.id} onDoubleClick={this.handleDoubleClick}>{this.props.text}</List.Content>
                </List.Content> : <form id="edit-form"><input type="text"
                                         id={this.props.id}
                                        //  placeholder={this.props.text}
                                         name="editMessage"
                                         value={this.state.editMessage}
                                         onChange={this.handleChange}
                                         />
                                         <Button type="submit" onClick={this.handleEdit}/></form>}
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
