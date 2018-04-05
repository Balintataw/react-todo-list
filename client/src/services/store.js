import {createStore, combineReducers} from 'redux'

// import reducers here
import listReducer from '../reducers/listReducer'

const rootReducer = combineReducers(
  { 
    // namespace your reducers here
    listReducer: listReducer
  }
)

export default createStore(rootReducer)