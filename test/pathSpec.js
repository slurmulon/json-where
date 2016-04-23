import 'blanket'

import {path, PathRel, PathRelSpec} from '../src/path'

import chai from 'chai'
import chaiThings from 'chai-things'

chai.should()
chai.use(chaiThings)

describe('PathRelSpec', () => {
  
  it('should properly query paths against objects', () => {
    new PathRel('foo').use({foo: 'win'}).get().should.contain('win')
    new PathRel('foo').use({bar: 'fail'}).get().should.be.empty
  })

  it('should ignore invalid query paths against objects', () => {
    chai.should(new PathRel('!').use({bar: 'fail'}).get()).not.throw
  })

  it('should have a short-hand alias', () => {
    path('foo').use({foo: 'win'}).get().should.contain('win')
  })


})
