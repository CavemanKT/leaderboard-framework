import nc from 'next-connect'
import bcrypt from 'bcrypt'

import { User, Profile } from '@/db/models'

import session from '@/api/helpers/session'
import passport from '@/api/helpers/passport'

const authEmailSignup = async (req, res) => {
  console.log(req.body)
  const user = await User.build({
    email: req.body.email, 
    registrationType: 'email',
    role: 'user', 
    verified: false
  }, {
    attributes: ['email', 'passwordHash', 'registrationType', 'role', 'verified']
  })


  user.passwordHash = await bcrypt.hash(req.body.password, 10)
  await user.save()


  if (!user?.id) {
    res.status(403).json('need to fill in the necessary information')
  }

  console.log(req.body.domain, req.body.founded, req.body.country, req.body.category, user.id)
  

  const profile = await Profile.create({
    domain: req.body.domain,
    founded: req.body.founded,
    country: req.body.country,
    category: req.body.category,
    weeklyReportFilled: false,
    UserId: user.id
  })
  
  console.log(profile)
  
  res.status(200).json({message: 'successful signup'})
}

export default nc()
  .use(session)
  .use(passport.initialize())
  .use(passport.session())
  .use(authEmailSignup)
