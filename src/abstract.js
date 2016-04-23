'use strict'

export const _specs = {}

export class AbstractRel {

  constructor({path, spec, value}) {
    if (new.target === AbstractRel && !spec) {
      throw new TypeError('Cannot construct AbstractRel instances without a defined `spec`')
    }

    this.path  = path
    this.spec  = spec
    this.value = value
  }

  use(obj) {
    this.value = obj

    return this
  }

  get(obj = this.value) {
    return this.spec.follow(this.path, obj)
  }

  set(obj = this.value, data) {
    return this.spec.update(this.path, obj, data)
  }

}

export class AbstractRelSpec {

  constructor(label, draft) {
    const methods = ['matches', 'follow', 'update']

    if (new.target === AbstractRelSpec) {
      throw new TypeError('Cannot construct AbstractRelSpec instances directly')
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

export default {AbstractRel, AbstractRelSpec}
