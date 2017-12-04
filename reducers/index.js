import {  
  ADD_DECK, 
  ADD_CARD_TO_DECK, 
  GET_DECK, 
  GET_DECKS 
} from '../actions';

function decks (state = {}, action) {
  switch (action.type) {
    case GET_DECKS :
      return {
        ...state,
        ...action.decks
      };
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      };
    default :
      return state;
  }
}

export default decks;