import Repository from './repository'
import Common from '../../common/base.repository'
import yenv from 'yenv'

const env = yenv()
const repository = new Repository()
export default class {

 
  async findAll(query ) {
  
    return await repository.list( {
      alias: false
    },query)
  }
 
}
