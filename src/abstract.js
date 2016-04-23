'use strict'

export const _specs = {}

export class AbstractRel {

  constructor({path, spec, value}) {
    this.path  = path
    this.spec  = spec
    this.value = value
  }

  from(obj) {
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
    return _specs.find((spec, label) => {
      if (spec.matches(data)) {
        return label
      }
    })
  }

}
