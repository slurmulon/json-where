import 'blanket'

import {$, PathRel, PathRelSpec} from '../src/path'

import chai from 'chai'
import chaiThings from 'chai-things'

chai.should()
chai.use(chaiThings)

describe('PathRelSpec', () => {
  
  it('should properly query paths against objects', () => {
    new PathRel('foo').from({foo: 'win'}).get().should.contain('win')
    new PathRel('foo').from({bar: 'fail'}).get().should.be.empty
  })

  it('should ignore invalid query paths against objects', () => {
    chai.should(new PathRel('!').from({bar: 'fail'}).get()).not.throw
  })

})
