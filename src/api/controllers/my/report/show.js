import nc from 'next-connect'

import session from '@/api/helpers/session'
import getCurrentUserByToken from '@/api/helpers/getCurrentUserByToken'
import authenticateUser from '@/api/helpers/authenticateUser'
import { Report1 } from '@/db/models'

const myReport1Show = async (req, res) => {
    const profileId = res.currentUser.Profile.id

    const report = await Report1.findOne({
        where: {
            ProfileId: profileId
        }
    })

  res.status(200).json({ report })
}

export default nc()
  .use(session)
  .use(getCurrentUserByToken)
  .use(authenticateUser)
  .use(myReport1Show)
