import nc from 'next-connect'

import myProfileEdit2 from '@/api/controllers/my/profile/update2'

export default nc()
  .put(myProfileEdit2)