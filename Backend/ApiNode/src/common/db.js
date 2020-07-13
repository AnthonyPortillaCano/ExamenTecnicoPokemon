import mongoose from 'mongoose'
import log from 'fancy-log'
import yenv from 'yenv'

const env = yenv()
const {
  DB:{stringConexion},
  // eslint-disable-next-line camelcase
  SERVER: { database, KEEP_ALIVE },
} = env

class Db {
  constructor() {
    this.connections = new Map()
  }

  async connect(uri) {
    const con = await mongoose.createConnection(uri, {
      keepAlive: KEEP_ALIVE,
      useUnifiedTopology: true,
      autoReconnect: true,
      useNewUrlParser: true,
      autoIndex: false, // Don't build indexes
      reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
      poolSize: 10, // Maintain up to 10 socket connections
      // If not connected, return errors immediately rather than waiting for reconnect
      bufferMaxEntries: 0,
      connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    })
    this.connections.set("co", con)

    log.info(`Connection Established`)

    return con
  }

  async connectAll() {
  
    const p = []
     
      let uri=`${stringConexion}${database}`

      p.push(this.connect( uri))
  

    await Promise.all(p)

    log.info('Connections Established Conexion String'+' '+uri);
  }

  model({ name, schema }) {
    if (this.connections.has("co")) {
      const con = this.connections.get("co")
      return con.model(name, schema, name)
    }

    throw Error('Database not exists')
  }

  async closeAll() {
    const p = []

    // eslint-disable-next-line guard-for-in
    for (const key in this.connections.keys()) {
      const db = this.connections.get(key)

      p.push(db.close())
    }

    await Promise.all(p)
    await mongoose.disconnect()
  }

  async close(name) {
    if (this.connections.has(name)) {
      const con = this.connections.get(name)

      con.close()

      this.connections.delete(name)
    }
  }
}

class Singleton {
  constructor() {
    if (!Singleton.instance) {
      log.info('Single instance DB')
      Singleton.instance = new Db()
    }
  }

  getInstance() {
    return Singleton.instance
  }
}

export default Singleton
