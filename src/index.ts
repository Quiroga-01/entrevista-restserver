import dotenv from 'dotenv'
import Server from './config/server'

// configurar ENV
if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}
const server = new Server()

server.listen()
