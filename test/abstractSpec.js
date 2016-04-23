import 'blanket'

import {AbstractRel, AbstractRelSpec} from '../src/abstract'

import chai from 'chai'
import chaiThings from 'chai-things'

chai.should()
chai.use(chaiThings)

describe('AbstractRelSpec', () => {
  
  it('should be able to identify arbitrary relations', () => {
    AbstractRelSpec.identify('/').should.equal('json-pointer')
    AbstractRelSpec.identify('#').should.equal('json-query')
    AbstractRelSpec.identify('$').should.equal('json-path')
  })


})
