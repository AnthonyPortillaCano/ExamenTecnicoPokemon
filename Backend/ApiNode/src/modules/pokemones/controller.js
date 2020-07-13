import Service from './service'
const service = new Service()

export default class {


  async list(ctx) {
    const query=ctx.query;
    const result = await service.findAll(query)
    ctx.body = result
  }
  
}
