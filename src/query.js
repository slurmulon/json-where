import jsonQuery from 'json-query'
import {AbstractRel, AbstractRelSpec} from './abstract'

export class QueryRelSpec extends AbstractRelSpec {

  constructor() {
    super('json-query', 'https://www.npmjs.com/package/json-query')
  }

  matches(rel) {
    if (!rel.constructor === String && !rel.constructor === Array) {
      return false
    }

    return jsonQuery(rel).key !== undefined
  }

}
