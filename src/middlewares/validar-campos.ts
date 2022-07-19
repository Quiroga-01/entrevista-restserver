import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const validarCampos = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!errors.isEmpty()) {
    return res.status(422).json(errors)
  }
  next()
}

export default validarCampos
