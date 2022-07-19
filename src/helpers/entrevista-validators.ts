import { Prospecto, Vacante } from '../models'

export const existeVacantePorId = async (vacanteId: number): Promise<void> => {
  const existe = await Vacante.findByPk(vacanteId)
  if (existe == null) {
    throw new Error('El id del vacante no existe')
  }
}

export const existeProspectoPorId = async (prospectoId: number): Promise<void> => {
  const existe = await Prospecto.findByPk(prospectoId)
  if (existe == null) {
    throw new Error('El id del prospecto no existe')
  }
}
