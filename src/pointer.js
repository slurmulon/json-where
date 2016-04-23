import jsonPointer from 'jsonpointer'
import {AbstractRel, AbstractRelSpec} from './abstract'

export class PointerRel extends AbstractRel {

  constructor(path, value) {
    super({ path, value, spec: new PointerRelSpec() })

    this.path = path
    this.value = value
  }
}

export class PointerRelSpec extends AbstractRelSpec {

  constructor() {
    super('json-pointer', 'http://tools.ietf.org/html/draft-ietf-appsawg-json-pointer-08')
  }

  matches(rel) {
    if (!rel.constructor === String) {
      return false
    }

    try {
      return jsonPointer.compile(rel) instanceof Object
    } catch (e) {
      return false
    }
  }

  follow(rel, data) {
    if (this.matches(rel)) {
      return jsonPointer.get(data, rel) || [] // ? - settle on always collection or always entity
    }
  }

  update(rel, obj, data) {
    return jsonPointer.set(obj, data)
  }

}

export const _ = () => new PointerRel(...arguments)
