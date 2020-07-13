import { GraphQLModule } from '@graphql-modules/core'

import pokemones from './modules/pokemones/graphql'

export default new GraphQLModule({
  imports: [
    pokemones,
   
  ],
})
