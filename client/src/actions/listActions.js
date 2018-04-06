import axios from 'axios'
import store from '../services/store'

export function getListItems() {
    axios.get("http://localhost:3001/listItems").then(resp => {
        const items = resp.data.map(item => ({
            id: item.id,
            text: item.text,
            isChecked : item.isChecked
        }))
        store.dispatch({
            type: "GET_LIST_ITEMS",
            payload: items
        })
    }).catch(e => console.log(e))
}

export function addItemToList(item) {
    axios.post('http://localhost:3001/listItems', {
        text: item
    }).then(resp => {
        getListItems()
    }).catch(e => console.log(e))
}

export function removeItems(array) {
    array.forEach((item, i) => {
        axios.delete('http://localhost:3001/listItems/' + item).then(resp => {
            getListItems()
        }).catch(e => console.log(e))
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

