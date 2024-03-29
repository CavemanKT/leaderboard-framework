import nc from 'next-connect'
import crypto from 'crypto'
import { Profile } from '@/db/models'
import session from '@/api/helpers/session'
import passport from '@/api/helpers/passport'

const userSerializer = function (values) {
  const { ...user } = values.dataValues
  delete user.passwordHash
  return user
}

const authEmailLogin = async (req, res, next) => {
  passport.authenticate('user-local', async (err, user, info) => {
    if (err) return res.status(500).end(err.toString())
    if (!user) return res.status(401).json(info)

    const token = crypto.randomBytes(64).toString('hex')
    await user.createAuthenticityToken({ token })

    req.session.set('token', token)
    await req.session.save()

    if (!user) return res.status(401).json('error')

    const currentProfile = await Profile.findOne({
      where: {
        UserId: user.id,
        verified: true
      }
    })

    if(currentProfile) {
      user.Profile = currentProfile
    }

    return res.status(200).json(userSerializer(user))
  })(req, res, next)
}

export default nc()
  .use(session)
  .use(passport.initialize())
  .use(passport.session())
  .use(authEmailLogin)
