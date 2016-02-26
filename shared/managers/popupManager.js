let instance = null

class PopupManager {
  constructor() {
    if (!instance) {
      instance = this
    }
    return instance

  }
}

export default new PopupManager()


