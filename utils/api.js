import { AsyncStorage } from 'react-native'
import { FLASH_CARD_STORAGE_KEY } from './_flashCards'

export function fetchDecks () {
  return AsyncStorage.getItem(FLASH_CARD_STORAGE_KEY).then((results) => console.log(results))
}

export function submitDeck ({ key, deck }) {
  return AsyncStorage.mergeItem(FLASH_CARD_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }))
}