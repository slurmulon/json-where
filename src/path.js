import jsonPath from 'jsonpath'
import {AbstractRef, AbstractRefSpec} from './abstract'

export class PathRef extends AbstractRef {

  constructor(path, value) {
    super({ path, value, spec: new PathRefSpec() })
  }

}

export class PathRefSpec extends AbstractRefSpec {

  constructor() {
    super('json-path', 'http://goessner.net/articles/JsonPath/')
  }

  matches(rel) {
    if (rel && !rel.constructor === String) {
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
    console.warn('json-path does not support updating values!')
  }

}

delete new PathRefSpec() // register spec with global pool by immediately invoking it

export const path = (path, value) => new PathRef(path, value)

export default {PathRef, PathRefSpec, path}
