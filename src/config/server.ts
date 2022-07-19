import express, { Application } from 'express'
import db from './db/connection'
import cors from 'cors'
import vacanteRouter from '../routes/vacante'
import prospectoRouter from '../routes/prospecto'
import entrevistaRouter from '../routes/entrevista'
class Server {
  private readonly app: Application

  private readonly port: string

  private readonly apiPaths = {
    vacante: '/api/vacantes',
    prospecto: '/api/prospectos',
    entrevista: '/api/entrevistas'
  }

  constructor () {
    this.app = express()
    void Server.dbConnection()
    this.port = process.env.PORT ?? '3000'
    this.middlewares()
    // Definir mis rutas
    this.routes()
  }

  // TODO: conectar base de datos
  static async dbConnection (): Promise<void> {
    try {
      await db.sync({ alter: true })
    } catch (error: any) {
      throw new Error(error)
    }
  }

  middlewares (): void {
    // Cors
    this.app.use(cors())
    // Lectura del Body
    this.app.use(express.json())
    // carpeta publica
    this.app.use(express.static('public'))
  }

  routes (): void {
    this.app.use(this.apiPaths.vacante, vacanteRouter)
    this.app.use(this.apiPaths.prospecto, prospectoRouter)
    this.app.use(this.apiPaths.entrevista, entrevistaRouter)
  }

  listen (): void {
    this.app.listen(this.port, () => {
      console.log(`servidor corriendo en puerto ${this.port}`)
    })
  }
}

export default Server
