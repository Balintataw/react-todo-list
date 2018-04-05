import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Dropdown} from 'semantic-ui-react'
import { getListItems } from '../../actions/listActions'
import { addItemToList } from '../../actions/listActions'

// const options = [
//     { key: 'English', text: 'English', value: 'English' },
//     { key: 'French', text: 'French', value: 'French' },
//     { key: 'Spanish', text: 'Spanish', value: 'Spanish' },
//     { key: 'German', text: 'German', value: 'German' },
//     { key: 'Chinese', text: 'Chinese', value: 'Chinese' },
// ]

export class ItemsList extends Component {
    state = { 
        currentValue: ''    
    }

    static defaultProps = {
        options:[
            // {
            //     key: '',
            //     text: ''
            // }    
        ],
    }
    componentDidMount = () => {
        getListItems()
    }

    handleAddition = (e, { value }) => {
        // this.setState({
        //     options: [{ message: value }, ...this.props.options],
        // })
        console.log(value)
        addItemToList(value)
    }
            
    handleChange = (e, { value }) => {
        this.setState({ 
            currentValue: value 
        })
    }        
    render() {
        const { currentValue } = this.props
    
        return (
            <div>
                <div>{console.log(this.props)}
            <Dropdown
            options={this.props.options}
            placeholder='What needs to be done?'
            search
            open
            selection
            fluid
            allowAdditions
            value={currentValue}
            onAddItem={this.handleAddition}
            onChange={this.handleChange}
            />
            </div>
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
