import nc from 'next-connect'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

import { User, Profile } from '@/db/models'

import session from '@/api/helpers/session'
import passport from '@/api/helpers/passport'


const userSerializer = function (values) {
  const { ...user } = values.dataValues
  delete user.passwordHash
  return user
}

const authEmailSignup = async (req, res) => {
  console.log(req.body)
  const user = await User.build({
    ...req.body, registrationType: 'email', role: 'user'
  }, {
    attributes: ['email', 'passwordHash', 'registrationType', 'role']
  })

  console.log('user sign up');

  user.passwordHash = await bcrypt.hash(req.body.password, 10)
  await user.save()

  const token = crypto.randomBytes(64).toString('hex')
  await user.createAuthenticityToken({ token })

  req.session.set('token', token)
  await req.session.save()

  if (!user) {
    res.status(403).json('need to fill in the necessary information')
  }

  const profile = await Profile.create({
    ...req.body, UserId: user.id
  }, {
    attributes: ['domain', 'founded', 'country', 'category', 'revenueModelType']
  })
  
  console.log(profile)
  console.log(userSerializer(user))

  res.status(200).json(userSerializer(user))
}

export default nc()
  .use(session)
  .use(passport.initialize())
  .use(passport.session())
  .use(authEmailSignup)
