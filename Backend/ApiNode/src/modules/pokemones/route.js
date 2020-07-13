import Router from 'koa-router'
import Controller from './controller'

const controller = new Controller()
const route = new Router({ prefix: '/pokemon/listpokemones' })
route.get('/', controller.list)

export default route
