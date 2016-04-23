import jsonPath from 'jsonpath'
import {AbstractRel, AbstractRelSpec} from './abstract'

export class PathRel extends AbstractRel {

  constructor(path, value) {
    super({ path, value, spec: new PathRelSpec() })

    this.path = path
    this.value = value
  }

}

export class PathRelSpec extends AbstractRelSpec {

  constructor() {
    super('json-path', 'http://goessner.net/articles/JsonPath/')
  }

  matches(rel) {
    if (!rel.constructor === String) {
      return false
    }

    try {
      const parsed = jsonPath.parse(rel)

      return !!parsed.length
    } catch (e) {
      return false
    }
  }

  follow(rel, data) {
    if (this.matches(rel)) {
      return jsonPath.query(data, rel)
    }

    return []
  }

  update(rel, obj, data) {
    // TODO! - no core support
  }

}

export const $ = () => new PathRel(...arguments)
