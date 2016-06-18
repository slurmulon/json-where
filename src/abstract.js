export const _specs = {}

export class AbstractRef {

  constructor({path, spec, value}) {
    if (new.target === AbstractRef && !spec) {
      throw new TypeError('Cannot construct AbstractRef instances without a defined `spec`')
    }

    this.path  = path
    this.spec  = spec
    this.value = value
  }

  use(obj) {
    this.value = obj

    return this
  }

  get(obj = this.value, single = true) {
    const value = this.spec.follow(this.path, obj)

    if (value instanceof Array) {
      return single && value.length ? value[0] : value
    }

    return single ? value : [value]
  }

  one(obj = this.value) {
    return this.get(obj, true)
  }

  all(obj = this.value) {
    return this.get(obj, false)
  }

  count(obj = this.value) {
    const results = this.get(obj)

    if (results instanceof Array) {
      return results.length
    }

    return results ? 1 : 0
  }

  any(obj = this.value) {
    return !!this.count(obj)
  }

  set(data, obj = this.value) {
    return this.spec.update(this.path, obj, data)
  }

}

export class AbstractRefSpec {

  constructor(label, draft) {
    const methods = ['matches', 'follow', 'update']

    if (new.target === AbstractRefSpec) {
      throw new TypeError('Cannot construct AbstractRefSpec instances directly')
    }

    methods.forEach(method => {
      if (Object.is(this[method], undefined)) {
        throw new TypeError(`Must override ${method}`)
      }
    })

    this.label = label
    this.draft = draft

    _specs[label] = this
  }

  static identify(data) {
    return Object.keys(_specs).find((label) => {
      if (_specs[label].matches(data)) {
        return label
      }
    })
  }

}

export const $ = (path, value) => {
  const key  = AbstractRefSpec.identify(path)
  const spec = _specs[key]

  if (spec instanceof AbstractRefSpec) {
    return new AbstractRef({path, value, spec})
  }

  throw new TypeError(`Failed to identify path specification for ${path}`)
}

export const which = AbstractRefSpec.identify

export default {AbstractRef, AbstractRefSpec, which, $}
