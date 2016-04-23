import 'blanket'

import {pointer, PointerRel, PointerRelSpec} from '../src/pointer'

import chai from 'chai'
import chaiThings from 'chai-things'

chai.should()
chai.use(chaiThings)

describe('PointerRelSpec', () => {
  
  it('should properly query paths against objects', () => {
    new PointerRel('/foo').use({foo: 'win'}).get().should.equal('win')
    new PointerRel('/foo').use({bar: 'fail'}).get().should.be.empty
  })

  it('should ignore invalid query paths against objects', () => {
    chai.should(new PointerRel('!').use({bar: 'fail'}).get()).not.throw
  })

})
