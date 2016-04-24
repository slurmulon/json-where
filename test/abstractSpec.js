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
  
  it('should be able to identify arbitrary relations', () => {
    AbstractRelSpec.identify('/').should.equal('json-pointer')
    AbstractRelSpec.identify('#').should.equal('json-query')
    AbstractRelSpec.identify('$').should.equal('json-path')
  })

  it('should be able to identify and follow arbitrary relations consistently', () => {
    $('/foo',  {foo: true}).get().should.equal(true)
    $('$.foo', {foo: true}).get().should.equal(true)
    $('foo',   {foo: true}).get().should.equal(true)
  })

})
