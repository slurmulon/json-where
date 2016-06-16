import 'blanket'

import {pointer, PointerRef, PointerRefSpec} from '../src/pointer'

import chai from 'chai'
import chaiThings from 'chai-things'

const should = chai.should()
chai.use(chaiThings)

describe('PointerRefSpec', () => {
  
  it('should properly query paths against objects', () => {
    should.equal(new PointerRef('/foo').use({foo: 'win'}).get(), 'win')
    should.equal(new PointerRef('/foo').use({bar: 'fail'}).get(), undefined)
  })

  it('should ignore invalid query paths against objects', () => {
    chai.should(new PointerRef('!').use({bar: 'fail'}).get()).not.throw
  })

  it('should allow updating objects that match against query paths', () => {
    const ref    = new PointerRef('/foo')
    const test   = ref.use({foo: 'win'}).set('woo')
    const result = ref.get()

    should.equal(result, 'woo')
  })

})
