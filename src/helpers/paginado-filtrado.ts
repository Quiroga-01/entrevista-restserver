import { Op } from 'sequelize'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const paginarFiltrado = (reqBody: any) => {
  const { filtros, limite } = reqBody
  let pagina = 0
  pagina = reqBody.pagina
  pagina -= 1
  const offset = (pagina >= 0) ? pagina * limite : 0
  const filtrosLike: any[] = []
  const filtrosNumber: any[] = []
  // Dentro del forEach se puede ir agregando mas if para tener distinto tipos de wheres
  // Ver documentacion de Sequelize para ver mas operadores de decision en querys usando [Op.*]
  filtros.forEach((e: any) => {
    const { col } = e
    if (e.value === '' || e.value === null) {
      e.value = (e.value === null) ? '' : e.value
      filtrosLike.push({ [col]: { [Op.substring]: e.value } })
    } else if (e.tipo === 'string') {
      filtrosLike.push({ [col]: { [Op.substring]: e.value } })
    } else if (e.tipo === 'number') {
      filtrosNumber.push({ [col]: { [Op.eq]: e.value } })
    }
  })

  return {
    filtrosLike,
    filtrosNumber,
    offset,
    limite,
    currentPageNumber: pagina + 1
  }
}

export default paginarFiltrado
