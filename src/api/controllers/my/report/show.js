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
        order: [['updatedAt', 'DESC'] ]
    })

    // console.log('updatedAt11111111111111111111111111111', reports, reports[0].updatedAt, reports[0].updatedAt.getDay())


  res.status(200).json({ reports })
}

export default nc()
  .use(session)
  .use(getCurrentUserByToken)
  .use(authenticateUser)
  .use(myReport1Show)
