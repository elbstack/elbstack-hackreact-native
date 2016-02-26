let instance = null

class NavigatorManager {
  constructor() {
    // because the react native navigator uses indexOf() with objects to check if a route is already
    // in the stack we need references to our route changes. Unfortunately as we work with redux
    // we are fans of immutability and so we need this dirty hack to store references (see usages of this
    // private property)
    this._dirtyRouteStack = []

    if (!instance) {
      instance = this
    }

    return instance

  }
}

export default new NavigatorManager()


