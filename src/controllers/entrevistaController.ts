import { Request, Response } from 'express'
import { Entrevista } from '../models/entrevista'
import { Vacante } from '../models/vacante'
import { Prospecto } from './../models/prospecto'

export const verEntrevistas = async (_req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const entrevistas = await Entrevista.findAll({
      include: [
        {
          model: Prospecto
        },
        {
          model: Vacante
        }
      ]
    })
    if (entrevistas.length > 0) {
      return res.json({
        mensaje: 'Exito',
        registros: entrevistas
      })
    }

    return res.status(404).json({
      mensaje: 'No hay registros'
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Hable con el adminsitrador',
      error
    })
  }
}

export const crearEntrevista = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  const { vacante, prospecto, fechaEntrevista, notas, reclutado } = req.body

  try {
    const entrevista = Entrevista.build({ vacante, prospecto, fechaEntrevista, notas, reclutado })

    await entrevista.save()

    return res.json({
      registro: entrevista,
      mensaje: 'Exito'
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Hable con el adminsitrador',
      error
    })
  }
}

export const actualizarEntrevista = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  const { id } = req.params
  const { vacante, prospecto, fechaEntrevista, notas, reclutado } = req.body

  try {
    const entrevista = await Entrevista.findByPk(id)
    await entrevista?.update({ vacante, prospecto, fechaEntrevista, notas, reclutado })
    return res.json({
      mensaje: 'Exito al actualizar',
      registro: entrevista
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Hable con el adminsitrador',
      error
    })
  }
}

export const borrarEntrevista = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  const { id } = req.params

  try {
    await Entrevista.destroy({ where: { id } })

    return res.json({
      msg: 'Entrevista borrada'
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Hable con el adminsitrador',
      error
    })
  }
}
