import { DataTypes, Model } from 'sequelize'
import db from '../config/db/connection'

export interface ProspectoI extends Model {
  id?: number
  nombre: string
  correo: string
}

export const Prospecto = db.define<ProspectoI>('Prospecto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'prospecto',
  createdAt: true,
  updatedAt: true
})
