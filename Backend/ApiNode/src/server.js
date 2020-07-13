import Koa from 'koa'
import helmet from 'koa-helmet'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import { ApolloServer } from 'apollo-server-koa'
import yenv from 'yenv'
import log from 'fancy-log'
import {
  access as accessLogger,
  error as errorLogger,
} from './utils/api-logger'
import csp from './utils/csp'
import compress from './utils/compress'
import notFavicon from './utils/api-not-favicon'
import apiError from './utils/api-error'
import routes from './routes'
import AppGraphqlModule from './graphql'
import docs from './utils/api-docs'
import Db from './common/db'
const env = yenv()
const { schema, context } = AppGraphqlModule
const server = new Koa()
const serverGraphql = new ApolloServer({ schema, context, introspection: true })
const PORT = env.PORT
const db = new Db().getInstance()

server.keys = [env.KEY]

server
  .use(accessLogger)
  .use(errorLogger)
  .use(helmet.contentSecurityPolicy(csp))
  .use(cors())
  .use(compress)
  .use(bodyParser())
  .use(notFavicon)
  .use(apiError)
  .use(docs)

routes.map(r => {
  server.use(r.routes())
  server.use(r.allowedMethods())
})
serverGraphql.applyMiddleware({
  app: server,
  path: '/pokemones/graphql',
})
/* istanbul ignore if  */
if (env.NODE_ENV !== 'test') {
  db.connectAll()
  server
    .listen(PORT, '0.0.0.0', () =>
      log.info(`Server listening on PORT: ${PORT}`)
    )
    .on('error', log.error)
}

export { server, db }
