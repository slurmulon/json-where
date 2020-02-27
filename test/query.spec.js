import { query, QueryRef, QueryRefSpec } from '../src/query'

import chai from 'chai'
import chaiThings from 'chai-things'

chai.should()
chai.use(chaiThings)

describe('QueryRefSpec', () => {
  
  it('should properly query paths against objects', () => {
    new QueryRef('foo.bar').use({ foo: { bar: 'win' } }).get().should.equal('win')
    new QueryRef('foo.bar').use({ bar: { foo: 'fail' } }).get().should.be.empty
  })

  it('should ignore invalid query paths against objects', () => {
    chai.should(new QueryRef('!').use({ bar: 'fail' }).get()).not.throw
  })

  it('should have a short-hand alias', () => {
    query('foo.bar').use({ foo: { bar: 'win' } }).get().should.equal('win')
  })

  // TODO - test array rel

})
