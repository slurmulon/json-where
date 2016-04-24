import jsonQuery from 'json-query'
import {AbstractRel, AbstractRelSpec} from './abstract'

export class QueryRel extends AbstractRel {

  constructor(path, value) {
    super({ path, value, spec: new QueryRelSpec() })

    this.path = path
    this.value = value
  }
}

export class QueryRelSpec extends AbstractRelSpec {

  constructor() {
    super('json-query', 'https://www.npmjs.com/package/json-query')
  }

  matches(rel) {
    if (!rel.constructor === String && !rel instanceof Array) {
      return false
    }

    return jsonQuery(rel).key !== undefined // FIXME - use a RegEx instead, not sufficient
  }

  follow(rel, data, locals) {
    if (this.matches(rel)) {
      return jsonQuery(rel, {data, locals}).value || []
    }
  }

  update(rel, obj, data) {
    // TODO - no core support
  }

}

delete new QueryRelSpec() // ensure spec is registered with global pool by invoking it

export const query = (path, value) => new QueryRel(path, value)

export default {QueryRel, QueryRelSpec, query}
