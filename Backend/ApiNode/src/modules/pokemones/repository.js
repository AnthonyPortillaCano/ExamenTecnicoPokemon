import Db from '../../common/db'
import { model, modelTransaccion, modelWithAlias } from './model'
import { isEmpty } from '../../utils/util'
const db = new Db().getInstance()
export default class  {

  async list( query,query2) {
    const {  alias } = query
    const {  limite } = query2
    const variables = db.model( alias ? modelWithAlias : model)
    const data = await this.getListAll(variables,Number(limite))
    return data
  }
  async getListAll(model,limite) {
   
    console.log(limite);
    const listGeneral = model.find({}, { _id: 0 }).limit(limite).exec();

    return listGeneral
  }
 
 
}
