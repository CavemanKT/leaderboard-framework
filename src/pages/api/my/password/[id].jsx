import nc from 'next-connect'

import myPasswordUpdate from '@/api/controllers/my/password/update'

export default nc()
  .put(myPasswordUpdate)
