/* eslint-disable indent */
import nc from 'next-connect'

import session from '@/api/helpers/session'
import authenticateUser from '@/api/helpers/authenticateUser'
import getCurrentUserByToken from '@/api/helpers/getCurrentUserByToken'
import { User } from '@/db/models'

const userSerializer = function (values) {
  const { ...user } = values.dataValues
  delete user.passwordHash
  return user
}
const targetUserShow = async (req, res) => {
    const {userId} = req.query

    const user = await User.findOne({
        where: {
            id: userId
        },
        include: {
            association: User.Profile
        }
    })

    res.status(200).json(userSerializer(user))
}

export default nc()
    .use(session)
    .use(getCurrentUserByToken)
    .use(authenticateUser)
    .use(targetUserShow)
