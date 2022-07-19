import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const connObj = {
  db: process.env.MSSQL_DB ?? 'entrevista',
  username: process.env.MSSQL_USER ?? 'sa',
  password: process.env.MSSQL_PASSWORD ?? '123456',
  host: process.env.MSSQL_HOST ?? 'localhost',
  dialect: (process.env.MSSQL_DRIVER ?? 'mssql') as 'mysql' | 'mssql',
  port: (process.env.MSSQL_PORT ?? 1433),
  dialectOptions: {
    instanceName: 'SQLEXPRESS'
  }
}
const db = new Sequelize(connObj.db, connObj.username, connObj.password, {
  host: connObj.host,
  port: (connObj.port) as number,
  dialect: connObj.dialect
})

export default db
