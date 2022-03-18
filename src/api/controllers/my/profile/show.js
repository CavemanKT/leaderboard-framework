import nc from 'next-connect'

import session from '@/api/helpers/session'
import getCurrentUserByToken from '@/api/helpers/getCurrentUserByToken'
import authenticateUser from '@/api/helpers/authenticateUser'
import { Profile } from '@/db/models'

const myProfileShow = async (req, res) => {
    const profileId = res.currentUser.Profile.id
    console.log(profileId)

    const profile = await Profile.findOne({
        where: {
            id: profileId
        }
    })

  res.status(200).json({ profile })
}

export default nc()
  .use(session)
  .use(getCurrentUserByToken)
  .use(authenticateUser)
  .use(myProfileShow)
