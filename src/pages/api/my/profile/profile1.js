import nc from 'next-connect'

import myProfileShow from '@/api/controllers/my/profile/show'
import myProfileEdit1 from '@/api/controllers/my/profile/update1'

export default nc()
  .get(myProfileShow)
  .put(myProfileEdit1)