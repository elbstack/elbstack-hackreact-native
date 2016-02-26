import popupManager from '../managers/popupManager'
import { GENERIC_ERROR_MESSAGE } from '../constants/Config'

export function alert(message = GENERIC_ERROR_MESSAGE) {
  return () => {
    popupManager.popup.alert(message)
  }
}
