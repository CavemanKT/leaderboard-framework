/* eslint-disable indent */
import nc from 'next-connect'

import { Op } from 'sequelize'
import session from '@/api/helpers/session'
import getCurrentUserByToken from '@/api/helpers/getCurrentUserByToken'
import authenticateUser from '@/api/helpers/authenticateUser'
import { User } from '@/db/models'

const allUnverifiedUsersShow = async (req, res) => {
    const q = req?.query?.q || ''

    const users = await User.findAndCountAll({
        where: {
            verified: false,
            email: {
                [Op.iLike]: `%${q}`
            }
        },
        order: [['id', 'ASC']],
    })
    
    res.status(200).json({
        users: users.rows, 
        filter: {q}
    })
}

export default nc()
  .use(session)
  .use(getCurrentUserByToken)
  .use(authenticateUser)
  .use(allUnverifiedUsersShow)
