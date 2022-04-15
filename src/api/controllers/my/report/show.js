/* eslint-disable space-before-blocks */
/* eslint-disable indent */
import nc from 'next-connect'

import session from '@/api/helpers/session'
import getCurrentUserByToken from '@/api/helpers/getCurrentUserByToken'
import authenticateUser from '@/api/helpers/authenticateUser'
import { Report1 } from '@/db/models'

const myReport1Show = async (req, res) => {
    const profileId = res.currentUser.Profile.id

    const reports = await Report1.findAll({
        where: {
            ProfileId: profileId
        },
        order: [['updatedAt', 'ASC'] ]
    })

    let categories = []
    let scores = []

    for(var i = 0; i < reports.length; i++){
      categories.push(`Week ${i + 1}`)
      scores.push(reports[i].score)
      console.log(scores)
    }

    let chartData = {
      scores,
      categories
    }

  res.status(200).json({ reports, chartData })
}

export default nc()
  .use(session)
  .use(getCurrentUserByToken)
  .use(authenticateUser)
  .use(myReport1Show)
