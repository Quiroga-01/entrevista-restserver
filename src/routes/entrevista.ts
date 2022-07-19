import { Router } from 'express'
import { check } from 'express-validator'
import validarCampos from '../middlewares/validar-campos'
import { verEntrevistas, crearEntrevista, actualizarEntrevista, borrarEntrevista } from '../controllers/entrevistaController'
import { existeProspectoPorId, existeVacantePorId } from '../helpers/entrevista-validators'
const router = Router()

router.get('/', [
], verEntrevistas)

router.post('/', [
  check('vacante', 'El vacante es obligatrio').notEmpty(),
  check('vacante', 'El vacante es invalido').isNumeric(),
  check('vacante').custom(existeVacantePorId),
  check('prospecto', 'El prospecto es obligatorio').notEmpty(),
  check('prospecto', 'El prospecto es invalido').isNumeric(),
  check('prospecto').custom(existeProspectoPorId),
  check('fechaEntrevista', 'La fecha de entrevista es obligatorio').notEmpty(),
  check('reclutado', 'El dato reclutado es obligatorio').notEmpty(),
  validarCampos
], crearEntrevista)

router.put('/:id', [
  check('id', 'El id no es valido').notEmpty().isNumeric(),
  check('vacante', 'El vacante es obligatrio').notEmpty(),
  check('vacante', 'El vacante es invalido').isNumeric(),
  check('vacante').custom(existeVacantePorId),
  check('prospecto', 'El prospecto es obligatorio').notEmpty(),
  check('prospecto', 'El prospecto es invalido').isNumeric(),
  check('prospecto').custom(existeProspectoPorId),
  check('fechaEntrevista', 'La fecha de entrevista es obligatorio').notEmpty(),
  check('reclutado', 'El dato reclutado es obligatorio').notEmpty(),
  validarCampos
], actualizarEntrevista)

router.delete('/:id', [
  check('id', 'El id no es valido').notEmpty().isNumeric(),
  validarCampos
], borrarEntrevista)

export default router
