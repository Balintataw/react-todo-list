import axios from 'axios'
import store from '../services/store'

export function getListItems() {
    axios.get("http://localhost:3001/listItems").then(resp => {
        store.dispatch({
            type: "GET_LIST_ITEMS",
            payload: resp.data
        })
    }).catch(e => console.log(e))
}

export function getActiveListItems() {
    axios.get("http://localhost:3001/listItems?isChecked=false").then(resp => {
        store.dispatch({
            type: "GET_ACTIVE_ITEMS",
            payload: resp.data
        })
    })
}

export function getCompletedListItems() {
    axios.get("http://localhost:3001/listItems?isChecked=true").then(resp => {
        store.dispatch({
            type: "GET_COMPLETED_ITEMS",
            payload: resp.data
        })
    })
}

export function addItemToList(item) {
    axios.post('http://localhost:3001/listItems', {
        text: item,
        isChecked: false
    }).then(resp => {
        getListItems()
    }).catch(e => console.log(e))
}

export function removeItems(array) {
    array.forEach((item, i) => {
        if (item.isChecked === true) {
            axios.delete('http://localhost:3001/listItems/' + item.id).then(resp => {
                getListItems()
            }).catch(e => console.log(e))
        }
    })
}

export function removeItem(id) {
    axios.delete('http://localhost:3001/listItems/' + id).then(resp => {
        getListItems()
    }).catch(e => console.log(e))
}

export function addChecked(id) {
    axios.patch('http://localhost:3001/listItems/' + id, {
        isChecked: true
    }).then(resp => {
        getListItems()
    }).catch(e => console.log(e))
}

export function removeChecked(id) {
    axios.patch('http://localhost:3001/listItems/' + id, {
        isChecked: false
    }).then(resp => {
        getListItems()
    }).catch(e => console.log(e))
}

