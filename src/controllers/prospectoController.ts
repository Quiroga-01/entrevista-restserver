import { Request, Response } from 'express'
import { Prospecto } from './../models/prospecto'

export const verProspectos = async (_req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const prospectos = await Prospecto.findAll()
    if (prospectos.length > 0) {
      return res.json({
        mensaje: 'Exito',
        registros: prospectos
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

export const crearProspecto = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  const { nombre, correo } = req.body

  try {
    const prospecto = Prospecto.build({
      nombre,
      correo
    })
    await prospecto.save()
    return res.json({
      registro: prospecto,
      message: 'Exito'
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Hable con el adminsitrador',
      error
    })
  }
}

export const actualizarProspecto = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  const { id } = req.params
  const { nombre, correo } = req.body

  try {
    const prospecto = await Prospecto.findByPk(id)
    await prospecto?.update({
      nombre,
      correo
    })
    return res.json({
      registro: prospecto
    })
  } catch (error: any) {
    console.log(error)
    return res.status(500).json({
      message: 'Hable con el adminsitrador'
    })
  }
}
