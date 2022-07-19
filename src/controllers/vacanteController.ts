import { Op } from 'sequelize'
import { Request, Response } from 'express'
import { Vacante } from '../models/vacante'
import paginarFiltrado from '../helpers/paginado-filtrado'

export const verVacanteFiltrado = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  const { filtrosLike, filtrosNumber, offset, limite: limit, currentPageNumber } = paginarFiltrado(req.body)

  try {
    const { count, rows } = await Vacante.findAndCountAll({
      where: {
        [Op.and]: [
          filtrosLike,
          filtrosNumber
        ]
      },
      limit,
      offset,
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })

    const totalPages = Math.ceil(count / limit)
    return res.json({
      message: 'Exito',
      registros: rows,
      totalPages,
      totalItems: count,
      currentPageNumber,
      currentPageSize: rows.length
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Hable con el adminsitrador',
      error
    })
  }
}

export const verVacantes = async (_req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const vacanteDB = await Vacante.findAll()
    if (vacanteDB.length > 0) {
      return res.json({
        mensaje: 'Exito',
        registros: vacanteDB
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

export const crearVacante = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  const { area, sueldo } = req.body

  try {
    const vacante = Vacante.build({
      area,
      sueldo
    })

    await vacante.save()

    return res.status(201).json({
      registro: vacante,
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

export const actualizarVacante = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  const { id } = req.params
  const { area, sueldo } = req.body

  try {
    const vacante = await Vacante.findByPk(id)
    await vacante?.update({
      area,
      sueldo
    })
    return res.json({
      registro: vacante
    })
  } catch (error: any) {
    console.log(error)
    return res.status(500).json({
      message: 'Hable con el adminsitrador'
    })
  }
}

export const cambiarEstadoVacante = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  const { id } = req.params
  try {
    const vacante = await Vacante.findByPk(id)
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    await vacante?.update({ activo: !vacante.activo })
    return res.json({
      mensaje: 'Exito',
      registro: vacante
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Hable con el adminsitrador'
    })
  }
}
