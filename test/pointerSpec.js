import 'blanket'

import {pointer, PointerRef, PointerRefSpec} from '../src/pointer'

import chai from 'chai'
import chaiThings from 'chai-things'

const should = chai.should()
chai.use(chaiThings)

describe('PointerRefSpec', () => {
  
  it('should properly query paths against objects', () => {
    should.equal(new PointerRef('/foo').use({foo: 'win'}).get(), 'win')
    should.equal(new PointerRef('/foo').use({bar: 'fail'}).get(), null)
  })

  it('should ignore invalid query paths against objects', () => {
    chai.should(new PointerRef('!').use({bar: 'fail'}).get()).not.throw
  })

})
