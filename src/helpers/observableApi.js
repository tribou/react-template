// @flow
// Contains API-specific logic for the API service we're using
// import Debug from 'debug'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/fromPromise'
import 'rxjs/add/observable/of'
import env from 'config/env'
import { get } from 'src/helpers/api'
import type { APIResponse } from 'src/helpers/api'

// const log = Debug('my-app:helpers:api')

const mockProfileData = [
  { results: [{ gender: 'female', name: { title: 'miss', first: 'آیلین', last: 'زارعی' }, location: { street: '6717 کمیل', city: 'قائم‌شهر', state: 'چهارمحال و بختیاری', postcode: 21796 }, email: 'آیلین.زارعی@example.com', login: { username: 'smallgoose346', password: 'eating', salt: 'etu4TdkK', md5: 'c33ba12927777774d144277d29fb7244', sha1: 'af9a7a342167287e4d0dcab36feadf5aa8582b15', sha256: '4b4c27699e8121b54c8fe00bccc0294cb4eb59ba84748f897595ed401f10a101' }, dob: '1987-10-30 12:45:55', registered: '2003-04-11 20:51:23', phone: '044-41805528', cell: '0914-183-5953', id: { name: '', value: null }, picture: { large: 'https://randomuser.me/api/portraits/women/25.jpg', medium: 'https://randomuser.me/api/portraits/med/women/25.jpg', thumbnail: 'https://randomuser.me/api/portraits/thumb/women/25.jpg' }, nat: 'IR' }], info: { seed: '08c71049254e80b4', results: 1, page: 1, version: '1.1' } },
  { results: [{ gender: 'female', name: { title: 'mrs', first: 'bonne', last: 'verwaal' }, location: { street: '6599 keistraat', city: 'nijkerk', state: 'zuid-holland', postcode: 49463 }, email: 'bonne.verwaal@example.com', login: { username: 'redswan417', password: 'scoobydo', salt: 'iMow3T0X', md5: '4065030fe6967248b71917bbc073bdbd', sha1: '6d597c4743fae91dc9a9112b103d621cbec089ca', sha256: '2154426f776433139752dcfb9d5ab0ea82b265bdcc15cb4369295be4cf904bea' }, dob: '1953-02-24 11:28:28', registered: '2007-09-09 12:31:51', phone: '(145)-683-1441', cell: '(223)-824-8785', id: { name: 'BSN', value: '59994382' }, picture: { large: 'https://randomuser.me/api/portraits/women/10.jpg', medium: 'https://randomuser.me/api/portraits/med/women/10.jpg', thumbnail: 'https://randomuser.me/api/portraits/thumb/women/10.jpg' }, nat: 'NL' }], info: { seed: '2d00cec8b35e918b', results: 1, page: 1, version: '1.1' } },
  { results: [{ gender: 'female', name: { title: 'madame', first: 'eden', last: 'dupuis' }, location: { street: "6191 rue de l'abbé-carton", city: 'renens vd', state: 'ticino', postcode: 3726 }, email: 'eden.dupuis@example.com', login: { username: 'purplebird224', password: 'dirty1', salt: 'sKgQsfqE', md5: 'd4e68800ec1de955da79c96d9337fac5', sha1: '80f1d650427b018dae98f994d9cf96526efa4dce', sha256: '862ce33fde4ff1fa11007c311c245c2cc2e6920b8105e85631a0435ba8b82936' }, dob: '1992-10-30 14:49:04', registered: '2009-01-27 18:28:28', phone: '(921)-956-0416', cell: '(846)-359-4262', id: { name: 'AVS', value: '756.LAUE.EPAC.68' }, picture: { large: 'https://randomuser.me/api/portraits/women/59.jpg', medium: 'https://randomuser.me/api/portraits/med/women/59.jpg', thumbnail: 'https://randomuser.me/api/portraits/thumb/women/59.jpg' }, nat: 'CH' }], info: { seed: 'f912d6bd2f25fa84', results: 1, page: 1, version: '1.1' } },
]


class API {


  mock = (
    data: Object,
    delay: number = 500,
  ): Observable<APIResponse> => Observable.of({
    statusCode: 200,
    data,
  })
    .delay(delay)


  // Get current user's profile
  getProfile = (): Observable<*> => {

    const url = '/' // api.randomuser.me
    return env.USE_MOCK_API
      ? this.getProfileMock()
      : Observable.fromPromise(get(url))

  }


  getProfileMock = (): Observable<*> => {

    // Return random profile each time
    const data
      = mockProfileData[Math.floor(Math.random() * mockProfileData.length)]
    return this.mock(data)

  }

}


export default API
