import supertest from 'supertest'
import { server, db } from '../../../src/server'

const app = server.listen()
const TIMEOUT = 1000 * 60 * 30

afterAll(() => {
  app.close()
})

beforeAll(async () => {
  await db.connectAll()
}, TIMEOUT)

// describe('GET /', () => {
//   const request = supertest(app)

//   it(
//     'Should return a list of conversion',
//     async () => {
//       const url =
//         '/change_money/conversion/'

//       const res = await request
//         .get(url)
//         .expect('Content-Type', /json/)
//         .expect(200)

//       const data = res.body

//       expect(Array.isArray(data)).toBe(true)
//       expect(Object.keys(data[0])).toEqual(
//         expect.arrayContaining([
//           'numberDolares',
//           'numberEuros',
         
//         ])
//       )
//     },
//     TIMEOUT
//   )
// })


describe('POST /', () => {
  const request = supertest(app)
  let data = JSON.parse(JSON.stringify({
    'numberDolares':2.3
   
  
  }))
  it(
    'Should return a object of conversion',
    async () => {
      const url =
        '/change_money/conversion/'
     
      const res = await request
        .post(url)
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          console.log(res);
          if (err) return done(err);
          done();
        });
        

     
    },
    TIMEOUT
  )
})
