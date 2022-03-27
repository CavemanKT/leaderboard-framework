import nc from 'next-connect'
import bcrypt from 'bcrypt'
import { User } from '@/db/models'

import session from '@/api/helpers/session'
import getCurrentUserByToken from '@/api/helpers/getCurrentUserByToken'
import authenticateUser from '@/api/helpers/authenticateUser'

const myPasswordUpdate = async (req, res) => {
  const userSerializer = function (values) {
    const { ...user } = values.dataValues
    delete user.passwordHash
    return user
  }

  const { id } = req.query

  const passwordHash = await bcrypt.hash(req.body.password, 10)

  await User.update({
    passwordHash
  }, {
    where: {
      id
    }
  })

    res.status(200).json({ user: userSerializer(res.currentUser) })
}

export default nc()
  .use(session)
  .use(getCurrentUserByToken)
  .use(authenticateUser)
  .use(myPasswordUpdate)
