import Service from '../service'

const service = new Service()

export default {
  async conversion(_, { input }) {
    return await service.findAll()
  },
}
