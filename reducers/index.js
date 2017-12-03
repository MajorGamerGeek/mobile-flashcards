import {  
  ADD_DECK, 
  ADD_CARD_TO_DECK, 
  GET_DECK, 
  GET_DECKS 
} from '../actions'

function decks (state = {}, action) {
  switch (action.type) {
    case GET_DECKS :
      console.log("Inside GET_DECKS REDUCER");
      return {
        ...state,
        ...action.decks,
      }
    case ADD_DECK:
      console.log(action);
      return {
        ...state,
        [action.deck.title]: { ...action.deck }
      }
    default :
      return state
  }
}

export default decks