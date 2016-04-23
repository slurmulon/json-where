import 'blanket'

import {_, PointerRel, PointerRelSpec} from '../src/pointer'

import chai from 'chai'
import chaiThings from 'chai-things'

chai.should()
chai.use(chaiThings)

describe('PointerRelSpec', () => {
  
  it('should properly query paths against objects', () => {
    new PointerRel('/foo').from({foo: 'win'}).get().should.equal('win')
    new PointerRel('/foo').from({bar: 'fail'}).get().should.be.empty
  })

  it('should ignore invalid query paths against objects', () => {
    chai.should(new PointerRel('!').from({bar: 'fail'}).get()).not.throw
  })

})
