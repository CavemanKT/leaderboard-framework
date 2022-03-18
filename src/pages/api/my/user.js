import nc from 'next-connect'

import myUserShow from '@/api/controllers/my/user/show'

export default nc()
  .get(myUserShow)
