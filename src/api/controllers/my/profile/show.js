import nc from 'next-connect'

import session from '@/api/helpers/session'
import getCurrentUserByToken from '@/api/helpers/getCurrentUserByToken'
import authenticateUser from '@/api/helpers/authenticateUser'

const myProfileShow = async (req, res) => {
  console.log(res.currentUser.Profile)

  res.status(200).json({ profile: res.currentUser.Profile })
}

export default nc()
  .use(session)
  .use(getCurrentUserByToken)
  .use(authenticateUser)
  .use(myProfileShow)
