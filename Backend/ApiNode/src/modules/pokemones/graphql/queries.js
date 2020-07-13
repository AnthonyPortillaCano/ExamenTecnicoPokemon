import Service from '../service'

const service = new Service()

export default {
  async listpokemones(_, { input }) {
    const { limite } = input;
    return await service.findAll(  { limite,alias:true })
  },
}
