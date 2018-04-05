const initialState = {
    listItems: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case "GET_LIST_ITEMS":
            return {...state, listItems: action.payload}
        default:
            return state
    }
}

