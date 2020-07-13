import { Schema } from 'mongoose'

const name = 'pokemones'

const schemaWithAlias = new Schema(
  {
   
    name:String,
    url:String,
  },
  { _id: false }
)
const schema = new Schema(
  {
    name:String,
    url:String,
  },
  { _id: false }
)

const model = { name, schema }
const modelWithAlias = { name, schema: schemaWithAlias }
export { model, modelWithAlias }
