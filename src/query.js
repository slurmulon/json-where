import jsonQuery from 'json-query'
import { AbstractRef, AbstractRefSpec } from './abstract'

export class QueryRef extends AbstractRef {

  constructor (path, value) {
    super({ path, value, spec: new QueryRefSpec() })
  }
}

export class QueryRefSpec extends AbstractRefSpec {

  constructor () {
    super('json-query', 'https://www.npmjs.com/package/json-query')
  }

  matches (rel) {
    if (!rel || (typeof rel !== 'string' && !Array.isArray(rel))) {
      return false
    }

    // FIXME: Use a RegEx instead, not sufficient
    return jsonQuery(rel).key !== undefined
  }

  follow (rel, data, locals) {
    if (this.matches(rel)) {
      return jsonQuery(rel, { data, locals }).value || []
    }
  }

  update (rel, obj, data) {
    // TODO: No core support, so add it here
    console.warn('json-query does not support updating values!')
  }

}

delete new QueryRefSpec() // register spec with global pool by immediately invoking it

export const query = (path, value) => new QueryRef(path, value)

export default { QueryRef, QueryRefSpec, query }
