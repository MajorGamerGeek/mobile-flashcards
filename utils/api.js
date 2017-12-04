import { AsyncStorage } from 'react-native'

const FLASH_CARD_STORAGE_KEY = 'mobileFlashCards:decks';

export function fetchDecks () {
  console.log(FLASH_CARD_STORAGE_KEY);
  return AsyncStorage.getItem(FLASH_CARD_STORAGE_KEY).then((results) => JSON.parse(results))
}

export function submitDeck ({ key, deck }) {
  return AsyncStorage.mergeItem(FLASH_CARD_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }))
}