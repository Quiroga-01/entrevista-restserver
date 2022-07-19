import { DataTypes, Model } from 'sequelize'
import db from '../config/db/connection'

export interface VacanteI extends Model {
  id?: number
  area: string
  sueldo: number
  activo: boolean | number
}

export const Vacante = db.define<VacanteI>('Vacante', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  area: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sueldo: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: () => true
  }
}, {
  tableName: 'vacante',
  createdAt: true,
  updatedAt: true
})
