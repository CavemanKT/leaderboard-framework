import nc from 'next-connect'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

import { Report1, Report2PreRevenue, Report3PostRevenue } from '@/db/models'

import session from '@/api/helpers/session'
import passport from '@/api/helpers/passport'


const reportCreate = async (req, res) => {


    res.status(200).json()
}

export default nc()
  .use(session)
  .use(passport.initialize())
  .use(passport.session())
  .use(reportCreate)
