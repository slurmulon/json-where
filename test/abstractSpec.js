import 'blanket'

import {$, which, AbstractRel, AbstractRelSpec} from '../src/abstract'
import PathRelSpec from '../src/path'

import chai from 'chai'
import chaiThings from 'chai-things'

chai.should()
chai.use(chaiThings)

describe('AbstractRel', () => {

  it('should prevent initialization of abstract members if a spec is not provided', () => {
    // FIXME
    // (() => {
    //   new AbstractRel
    // }).should.throw(TypeError)

    (() => {
      new AbstractRel({spec: PathRelSpec})
    }).should.not.throw(TypeError)
  })

})

describe('AbstractRelSpec', () => {

  it('should prevent initialization of abstract members', () => {
    (() => {
      new AbstractRelSpec()
    }).should.throw(TypeError)
  })

  describe('identify', () => {
    it('should be able to identify arbitrary relations', () => {
      AbstractRelSpec.identify('/').should.equal('json-pointer')
      AbstractRelSpec.identify('#').should.equal('json-query')
      AbstractRelSpec.identify('$').should.equal('json-path')
    })
  })

})

describe('$', () => {

  it('should identify a relatoin\'s specification and create a reflected instance', () => {
    const pointer = $('/foo',  {foo: true})
    const path    = $('$.foo', {foo: true})
    const query   = $('foo',   {foo: true})

    pointer.should.be.an.instanceof(AbstractRel)
    path.should.be.an.instanceof(AbstractRel)
    query.should.be.an.instanceof(AbstractRel)

    pointer.get().should.equal(true)
    path.get().should.equal(true)
    query.get().should.equal(true)
  })

  it('should prevent unrecognizable paths from being provided', () => {
    const empty   = (() => $(null)).should.throw(TypeError)
    // const corrupt = (() => $('~~')).should.throw(TypeError) // TODO
  })

})
