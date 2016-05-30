import 'blanket'

import {path, PathRef, PathRefSpec} from '../src/path'

import chai from 'chai'
import chaiThings from 'chai-things'

chai.should()
chai.use(chaiThings)

describe('PathRefSpec', () => {
  
  it('should properly query paths against objects', () => {
    new PathRef('foo').use({foo: 'win'}).get().should.contain('win')
    new PathRef('foo').use({bar: 'fail'}).get().should.be.empty
  })

  it('should ignore invalid query paths against objects', () => {
    chai.should(new PathRef('!').use({bar: 'fail'}).get()).not.throw
  })

  it('should have a short-hand alias', () => {
    path('foo').use({foo: 'win'}).get().should.contain('win')
  })


})
