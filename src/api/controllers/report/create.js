/* eslint-disable eqeqeq */
import nc from 'next-connect'

import { Report1, Report2PreRevenue, Report3PostRevenue } from '@/db/models'

import session from '@/api/helpers/session'
import passport from '@/api/helpers/passport'

const attributesPreRevenue = [
  'stage', 'totalWaitingList', 'Report1Id'
]

const attributesPostRevenueMrr = [
  'mrr', 'revenue', 'Report1Id'
]

const attributesPostRevenueRevenue = [
  'mrr', 'revenue', 'Report1Id'
]

const reportCreate = async (req, res) => {
  
  const createdReport = await Report1.create({
    profitability: req.body.pickedStage1,
    achievement: req.body.Q1,
    plan: req.body.Q2,
    ProfileId: req.query.profileId
  }, {
    attributes: ['profitability', 'achievement', 'plan', 'ProfileId']
  })

  if(req.body.pickedStage1 == 'preRevenue'){
    const createdReport2 = await Report2PreRevenue.create({
      stage: req.body.pickedStage2,
      totalWaitingList: req.body.totalWaitingList,
      Report1Id: createdReport.id
    }, {
      attributes: attributesPreRevenue
    })
    res.status(200).json({createdReport2})

  } else if (req.body.pickedStage1 == 'postRevenue' && req.body.revenueType == 'MRR'){
    const createdReport3 = await Report3PostRevenue.create({
      mrr: req.body.MRR,
      Report1Id: createdReport.id
    }, {
      attributes: attributesPostRevenueMrr
    })

    res.status(200).json({createdReport3})
  } else if (req.body.pickedStage1 == 'postRevenue' && (req.body.revenueType == 'one time purchase' || req.body.revenueType == 'mixed')) {
    const createdReport3 = await Report3PostRevenue.create({
      revenue: req.body.Revenue,
      Report1Id: createdReport.id
    }, {
      attributes: attributesPostRevenueRevenue
    })
    res.status(200).json({createdReport3})
  }

}

export default nc()
  .use(session)
  .use(passport.initialize())
  .use(passport.session())
  .use(reportCreate)
