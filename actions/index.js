
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'
export const GET_DECK = 'GET_DECK'
export const GET_DECKS = 'GET_DECKS'

export function addDeck (decks) {
  return {
    type: ADD_DECK,
    decks
  }
};

export function addCardToDeck (deckId, card) {
  return {
    type: ADD_CARD_TO_DECK,
    deck
  }
};

export function getDeck (deckId) {
  return {
    type: GET_DECK,
    deckId
  }
};

export function getDecks (decks) {
  return {
    type: GET_DECKS,
    decks
  }
};