import jsonPointer from 'jsonpointer'
import {AbstractRef, AbstractRefSpec} from './abstract'

export class PointerRef extends AbstractRef {

  constructor(path, value) {
    super({ path, value, spec: new PointerRefSpec() })
  }

}

export class PointerRefSpec extends AbstractRefSpec {

  constructor() {
    super('json-pointer', 'http://tools.ietf.org/html/draft-ietf-appsawg-json-pointer-08')
  }

  matches(rel) {
    if (rel && !rel.constructor === String) {
      return false
    }

    try {
      return jsonPointer.compile([rel]) instanceof Object
    } catch (e) {
      return false
    }
  }

  follow(rel, data) {
    if (this.matches(rel)) {
      return jsonPointer.get(data, rel)
    }

    return []
  }

  update(rel, obj, data) {
    return jsonPointer.set(obj, rel, data)
  }

}

delete new PointerRefSpec() // register spec with global pool by immediately invoking it

export const pointer = (path, value) => new PointerRef(path, value)

export default {PointerRef, PointerRefSpec, pointer}
