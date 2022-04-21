/* eslint-disable space-before-blocks */
/* eslint-disable linebreak-style */
/* eslint-disable eqeqeq */
import nc from 'next-connect'

import {Profile, Report1, Report2PreRevenue, Report3PostRevenue } from '@/db/models'

import session from '@/api/helpers/session'
import passport from '@/api/helpers/passport'


const attributesPreRevenue = [
  'pickedStage2', 'totalWaitingList', 'Report1Id'
]

const attributesPostRevenueMrr = [
  'MRR', 'Report1Id'
]

const attributesPostRevenueRevenue = [
  'Revenue', 'Report1Id'
]

const reportCreate = async (req, res) => {
  const {pickedStage1, pickedStage2, weeklyAchievement, weeklyPlan, totalWaitingList, MRR, Revenue, revenueType } = req.body
  const { profileId} = req.query

  let [factor1, factor2, factor3, factor4] = [0, 0, 0, 0, 0]

  if (pickedStage1 == 'preRevenue'){
    factor1 = 1
    if (pickedStage2 == 'idea validation'){
      factor2 = 2
    } else if (pickedStage2 == 'product development'){
      factor2 = 3
    } else if (pickedStage2 == 'product live'){
      factor2 = 4
    }
    if (totalWaitingList >= 0 && totalWaitingList < 100){
      factor3 = 4
    } else if (totalWaitingList >= 100 && totalWaitingList < 500){
      factor3 = 5
    } else if (totalWaitingList >= 500 && totalWaitingList > 1500){
      factor3 = 6
    }
  } else if (pickedStage1 == 'postRevenue') {
    factor1 = 2
    if (revenueType == 'MRR'){
      if (MRR >= 0 && MRR < 500){
        factor4 = 1
      } else if (MRR >= 500 && MRR < 1000){
        factor4 = 2
      } else if (MRR >= 1000){
        factor4 = 3
      }
    }
    if (revenueType == 'Revenue' || revenueType == 'fixed'){
      if (Revenue >= 0 && Revenue < 500){
        factor4 = 1
      } else if (Revenue >= 500 && Revenue < 1000){
        factor4 = 2
      } else if (Revenue >= 1000){
        factor4 = 3
      }
    }
  }


  const sum1 = (factor1 * 10 + factor2 * 20 + factor3 * 30) / (factor1 + factor2 + factor3)
  const sum2 = (factor1 * 15 + factor4 * 40) / (factor1 + factor4)
  
  let sum

  if (pickedStage1 == 'preRevenue'){
    sum = Math.floor(sum1)
  } else if (pickedStage1 == 'postRevenue'){
    sum = Math.floor(sum2)
  }

  await Profile.update({
    score: sum
  }, {
    where: {
      id: profileId
    }
  })

  const createdReport = await Report1.create({
    pickedStage1,
    weeklyAchievement,
    weeklyPlan,
    score: sum,
    ProfileId: profileId
  }, {
    attributes: ['revenueType', 'weeklyAchievement', 'weeklyPlan', 'score', 'ProfileId']
  })

  const report = await Report1.findOne({
    where: {
      ProfileId: profileId
    },
    order: [['updatedAt', 'DESC']]
  })

  
  if (req.body.pickedStage1 == 'preRevenue'){
    const createdReport2 = await Report2PreRevenue.create({
      pickedStage2,
      totalWaitingList,
      Report1Id: createdReport.id
    }, {
      attributes: attributesPreRevenue
    })
    res.status(200).json({createdReport2})
  } else if (req.body.pickedStage1 == 'postRevenue' && req.body.revenueType == 'MRR'){
    const createdReport3 = await Report3PostRevenue.create({
      revenueType,
      MRR,
      Report1Id: createdReport.id
    }, {
      attributes: attributesPostRevenueMrr
    })
    res.status(200).json({createdReport3})
  } else if (req.body.pickedStage1 == 'postRevenue' && (req.body.revenueType == 'one time purchase' || req.body.revenueType == 'mixed')) {
    const createdReport3 = await Report3PostRevenue.create({
      revenueType,
      Revenue,
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
