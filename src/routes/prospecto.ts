import { Router } from 'express'
import { check } from 'express-validator'
import validarCampos from '../middlewares/validar-campos'
import { verProspectos, crearProspecto, actualizarProspecto } from '../controllers/prospectoController'

const router = Router()

router.get('/', [
], verProspectos)

router.post('/', [
  check('nombre', 'El nombre es obligatrio').notEmpty(),
  check('correo', 'El correo es obligatorio').notEmpty(),
  check('correo', 'El correo no es valido').isEmail(),
  validarCampos
], crearProspecto)
router.put('/', [
  check('nombre', 'El nombre es obligatrio').notEmpty(),
  check('correo', 'El correo es obligatorio').notEmpty(),
  check('correo', 'El correo no es valido').isEmail(),
  validarCampos
], actualizarProspecto)

export default router
