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

describe('GET /', () => {
  const request = supertest(app)

  it(
    'Should return a list of pokemon',
    async () => {
      const url =
        '/pokemon/listpokemones?limite=200';

      const res = await request
        .get(url)
        .expect('Content-Type', /json/)
        .expect(200)

      const data = res.body

      expect(Array.isArray(data)).toBe(true);
    },
    TIMEOUT
  )
})


