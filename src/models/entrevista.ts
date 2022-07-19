import { DataTypes, Model } from 'sequelize'
import db from '../config/db/connection'
import { Prospecto } from './prospecto'
import { Vacante } from './vacante'

export interface EntrevistaI extends Model {
  id?: number
  vacante: number
  prospecto: number
  fechaEntrevista: Date
  notas: string
  reclutado: number | boolean
}

export const Entrevista = db.define<EntrevistaI>('Entrevista', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  vacante: {
    type: DataTypes.INTEGER,
    references: {
      model: Vacante,
      key: 'id'
    },
    allowNull: false
  },
  prospecto: {
    type: DataTypes.INTEGER,
    references: {
      model: Prospecto,
      key: 'id'
    },
    allowNull: false
  },
  fechaEntrevista: {
    type: DataTypes.DATE,
    allowNull: false
  },
  notas: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  reclutado: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  tableName: 'entrevista',
  createdAt: true,
  updatedAt: true
})

Vacante.hasMany(Entrevista, {
  foreignKey: 'vacante'
})
Entrevista.belongsTo(Vacante, {
  foreignKey: 'id'
})
Prospecto.hasMany(Entrevista, {
  foreignKey: 'prospecto'
})
Entrevista.belongsTo(Prospecto, {
  foreignKey: 'id'
})
