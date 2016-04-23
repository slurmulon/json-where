import 'blanket'

import {query, QueryRel, QueryRelSpec} from '../src/query'

import chai from 'chai'
import chaiThings from 'chai-things'

chai.should()
chai.use(chaiThings)

describe('QueryRelSpec', () => {
  
  it('should properly query paths against objects', () => {
    new QueryRel('foo.bar').use({foo: {bar: 'win'}}).get().should.equal('win')
    new QueryRel('foo.bar').use({bar: {foo: 'fail'}}).get().should.be.empty
  })

  it('should ignore invalid query paths against objects', () => {
    chai.should(new QueryRel('!').use({bar: 'fail'}).get()).not.throw
  })

  it('should have a short-hand alias', () => {
    query('foo.bar').use({foo: {bar: 'win'}}).get().should.equal('win')
  })

  // TODO - test array rel

})
