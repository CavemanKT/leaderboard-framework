import nc from 'next-connect'
import { User, Profile } from '@/db/models'

import session from '@/api/helpers/session'
import getCurrentUserByToken from '@/api/helpers/getCurrentUserByToken'
import authenticateUser from '@/api/helpers/authenticateUser'

const myAccountUpdate = async (req, res) => {
  const userSerializer = function (values) {
    const { ...user } = values.dataValues
    delete user.passwordHash
    return user
  }

  const [id] = req.query.id

  const user = await User.update({
      email: req.body.email
  }, {
      where: {
        id
      }
  })

  const profile = await Profile.update({
      domain: req.body.domain
  }, {
      where: {
        UserId: id
      }
  })

    res.status(200).json({ user: userSerializer(res.currentUser) })
}

export default nc()
  .use(session)
  .use(getCurrentUserByToken)
  .use(authenticateUser)
  .use(myAccountUpdate)
