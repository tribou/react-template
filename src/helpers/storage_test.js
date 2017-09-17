// @flow
import { serialize, deserialize } from './storage'


describe('serialize', () => {

  it('encodes the string as base64', () => {

    const data = 'testdata'
    const expected = 'dGVzdGRhdGE='
    const actual = serialize(data)
    expect(actual).toBe(expected)

  })

})


describe('deserialize', () => {

  it('decodes the string from base64', () => {

    const data = 'testdata'
    const serialized = 'dGVzdGRhdGE='
    const actual = deserialize(serialized)
    expect(actual).toBe(data)

  })

})
