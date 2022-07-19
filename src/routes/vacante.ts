import { Router } from 'express'
import { check } from 'express-validator'
import validarCampos from '../middlewares/validar-campos'
import { verVacanteFiltrado, crearVacante, actualizarVacante, cambiarEstadoVacante } from '../controllers/vacanteController'

const router = Router()

router.get('/', [
], verVacanteFiltrado)

router.post('/', [
  check('area', 'El area es obligatrio').notEmpty(),
  check('sueldo', 'El sueldo es obligatorio').notEmpty(),
  check('sueldo', 'El sueldo debe ser dato numerico').isNumeric(),
  validarCampos
], crearVacante)

router.put('/:id', [
  check('id', 'El id es obligatorio').notEmpty(),
  check('id', 'El id debe ser numerico').isNumeric(),
  check('area', 'El area es obligatrio').notEmpty(),
  check('sueldo', 'El sueldo es obligatorio').notEmpty(),
  check('sueldo', 'El sueldo debe ser numerico').isNumeric(),
  validarCampos
], actualizarVacante)

router.delete('/:id', [
  check('id', 'El id es obligatorio').notEmpty(),
  check('id', 'El id debe ser numerico').isNumeric()
], cambiarEstadoVacante)

export default router
