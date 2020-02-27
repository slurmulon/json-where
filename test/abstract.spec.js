import { $, which, AbstractRef, AbstractRefSpec } from '../src/abstract'
import PathRefSpec from '../src/path'

import chai from 'chai'
import chaiThings from 'chai-things'

chai.should()
chai.use(chaiThings)

describe('AbstractRef', () => {

  it('should prevent initialization of abstract members if a spec is not provided', () => {
    // FIXME
    // (() => {
    //   new AbstractRef()
    // }).should.throw(TypeError)

    (() => {
      new AbstractRef({ spec: PathRefSpec })
    }).should.not.throw(TypeError)
  })

})

describe('AbstractRefSpec', () => {

  it('should prevent initialization of abstract members', () => {
    (() => {
      new AbstractRefSpec()
    }).should.throw(TypeError)
  })

  describe('identify', () => {
    it('should be able to identify arbitrary relations', () => {
      AbstractRefSpec.identify('/').should.equal('json-pointer')
      AbstractRefSpec.identify('#').should.equal('json-query')
      AbstractRefSpec.identify('$').should.equal('json-path')
    })
  })

})

describe('$', () => {

  it('should identify a relatoin\'s specification and create a reflected instance', () => {
    const pointer = $('/foo',  { foo: true })
    const path    = $('$.foo', { foo: true })
    const query   = $('foo',   { foo: true })

    pointer.should.be.an.instanceof(AbstractRef)
    path.should.be.an.instanceof(AbstractRef)
    query.should.be.an.instanceof(AbstractRef)

    pointer.get().should.equal(true)
    path.get().should.equal(true)
    query.get().should.equal(true)
  })

  it('should prevent unrecognizable paths from being provided', () => {
    const empty   = (() => $(null)).should.throw(TypeError)
    // const corrupt = (() => $('~~')).should.throw(TypeError) // TODO
  })

})
