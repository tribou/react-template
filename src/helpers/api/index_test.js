// @flow
import Nock from 'nock'
import _get from 'lodash/get'
import { get, post, patch, put, del, mock } from './'


it('get fetches via GET', async () => {

  const payload = { test: 'success' }

  Nock('http://www.example.com', {
    reqheaders: {
      'Content-Type': 'application/json',
    },
  })
    .get('/users')
    .reply(200, payload)

  const res = await get('http://www.example.com/users')

  expect(res.data).toEqual({ test: 'success' })
  expect(res.statusCode).toEqual(200)

})


it('get supports non-JSON responses', async () => {

  Nock('http://www.example.com')
    .get('/users')
    .reply(200, '<test>Success!</test>')

  const res = await get('http://www.example.com/users')

  expect(_get(res, 'data.text')).toEqual('<test>Success!</test>')
  expect(res.statusCode).toEqual(200)

})


it('post fetches via POST and passes payload', async () => {

  const payload = { test: 'success' }

  Nock('http://www.example.com', {
    reqheaders: {
      'Content-Type': 'application/json',
    },
  })
    .post('/users', payload)
    .reply(201, { ok: true })

  const res = await post('http://www.example.com/users', payload)

  expect(res.data).toEqual({ ok: true })
  expect(res.statusCode).toEqual(201)

})


it('patch fetches via PATCH and passes payload', async () => {

  const payload = { test: 'success' }

  Nock('http://www.example.com', {
    reqheaders: {
      'Content-Type': 'application/json',
    },
  })
    .patch('/users', payload)
    .reply(201, { ok: true })

  const res = await patch('http://www.example.com/users', payload)

  expect(res.data).toEqual({ ok: true })
  expect(res.statusCode).toEqual(201)

})


it('put fetches via PUT and passes payload', async () => {

  const payload = { test: 'success' }

  Nock('http://www.example.com', {
    reqheaders: {
      'Content-Type': 'application/json',
    },
  })
    .put('/users', payload)
    .reply(201, { ok: true })

  const res = await put('http://www.example.com/users', payload)

  expect(res.data).toEqual({ ok: true })
  expect(res.statusCode).toEqual(201)

})


it('del fetches via DELETE', async () => {

  Nock('http://www.example.com', {
    reqheaders: {
      'Content-Type': 'application/json',
    },
  })
    .delete('/users')
    .reply(201, { ok: true })

  const res = await del('http://www.example.com/users')

  expect(res.data).toEqual({ ok: true })
  expect(res.statusCode).toEqual(201)

})


it('mock returns mocked data on a delay', async () => {

  const res = await mock({ ok: true }, 10)

  expect(res.data).toEqual({ ok: true })
  expect(res.statusCode).toEqual(200)

})
