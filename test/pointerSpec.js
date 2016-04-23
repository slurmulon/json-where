import 'blanket'

import {pointer, PointerRel, PointerRelSpec} from '../src/pointer'

import chai from 'chai'
import chaiThings from 'chai-things'

const should = chai.should()
chai.use(chaiThings)

describe('PointerRelSpec', () => {
  
  it('should properly query paths against objects', () => {
    should.equal(new PointerRel('/foo').use({foo: 'win'}).get(), 'win')
    should.equal(new PointerRel('/foo').use({bar: 'fail'}).get(), null)
  })

  it('should ignore invalid query paths against objects', () => {
    chai.should(new PointerRel('!').use({bar: 'fail'}).get()).not.throw
  })

})
