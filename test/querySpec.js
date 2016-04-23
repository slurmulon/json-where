import 'blanket'

import {_, QueryRel, QueryRelSpec} from '../src/query'

import chai from 'chai'
import chaiThings from 'chai-things'

chai.should()
chai.use(chaiThings)

describe('QueryRelSpec', () => {
  
  it('should properly query paths against objects', () => {
    new QueryRel('foo.bar').from({foo: {bar: 'win'}}).get().should.equal('win')
    new QueryRel('foo.bar').from({bar: {foo: 'fail'}}).get().should.be.empty
  })

  it('should ignore invalid query paths against objects', () => {
    chai.should(new QueryRel('!').from({bar: 'fail'}).get()).not.throw
  })

  // TODO - test array rel

})
