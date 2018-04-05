import axios from 'axios'
import store from '../services/store'

export function getListItems() {
    axios.get("http://localhost:3001/listItems").then(resp => {
        const items = resp.data.map(item => ({
            key: item.id,
            text: item.text
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

