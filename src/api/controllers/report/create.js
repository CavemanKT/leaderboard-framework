/* eslint-disable eqeqeq */
import nc from 'next-connect'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

import { Report1, Report2PreRevenue, Report3PostRevenue } from '@/db/models'

import session from '@/api/helpers/session'
import passport from '@/api/helpers/passport'

const attributesPreRevenue = [
  'stage', 'totalWaitingList', 'Report1Id'
]
const attributesPostRevenue = [
  ''
]

let attributesOption = null
const reportCreate = async (req, res) => {
  if(req.body.pickedStage1 == 'preRevenue') {
    attributesOption = attributesPreRevenue
  } else if (req.body.pickedStage1 == 'postRevenue'){
    attributesOption = attributesPostRevenue
  }
  
  console.log(req.body);

  const createdReport = await Report1.create({
    ...req.body
  }, {
    attributes: ['profitability', 'achievement', 'plan', 'ProfileId']
  })


    res.status(200).json()
}

export default nc()
  .use(session)
  .use(passport.initialize())
  .use(passport.session())
  .use(reportCreate)
