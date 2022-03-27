
import nc from 'next-connect'
import session from '@/api/helpers/session'
import getCurrentUserByToken from '@/api/helpers/getCurrentUserByToken'
import authenticateUser from '@/api/helpers/authenticateUser'
import { Profile } from '@/db/models'

const myProfileUpdate1 = async (req, res) => {
    const profileId = res.currentUser.Profile.id
    
    const profile = await Profile.update({
        domain: req.body.domain,
        founded: req.body.founded
    }, {
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
  .use(myProfileUpdate1)
