import Service from '../service'
import log from 'fancy-log'

const service = new Service()
/* eslint-disable camelcase*/
export default {
  async addConversion(_, { input }) {
    const {
      numberDolares
      
    } = input
    // eslint-disable-next-line
    try {
      return await service.save(
        {
          numberDolares
          
        },
        
      )
    } catch (e) {
      log.info(`campaign plan add err => ${e}`)
    }
  },
 
}
