import nc from 'next-connect'
import crypto from 'crypto'

import session from '@/api/helpers/session'
import passportAdmin from '@/api/helpers/passport_admin'

const userSerializer = function (values) {
  const { ...user } = values.dataValues
  delete user.passwordHash
  return user
}

const authEmailAdminLogin = async (req, res, next) => {
  passportAdmin.authenticate('admin-local', async (err, user, info) => {
    if (err) return res.status(500).end(err.toString())
    if (!user) return res.status(401).json(info)

    const token = crypto.randomBytes(64).toString('hex')
    await user.createAuthenticityToken({ token })

    req.session.set('token', token)
    await req.session.save()

    return res.status(200).json(userSerializer(user))
  })(req, res, next)
}

export default nc()
  .use(session)
  .use(passportAdmin.initialize())
  .use(passportAdmin.session())
  .use(authEmailAdminLogin)
