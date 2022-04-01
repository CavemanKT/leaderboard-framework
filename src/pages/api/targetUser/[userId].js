import nc from 'next-connect'

import targetUserShow from '@/api/controllers/users/targetUserShow'
import setVerifiedToTrue from '@/api/controllers/users/setVerifiedToTrue'

export default nc()
    .get(targetUserShow)
    .put(setVerifiedToTrue)

