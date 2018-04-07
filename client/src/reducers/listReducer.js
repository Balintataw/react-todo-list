const initialState = {
    listItems: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case "GET_LIST_ITEMS":
            return {...state, listItems: action.payload}
        case "GET_ACTIVE_ITEMS":
            return {...state, listItems: action.payload}
        case "GET_COMPLETED_ITEMS":
            return {...state, listItems: action.payload} 
        default:
            return state
    }
}

