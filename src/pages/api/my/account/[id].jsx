import nc from 'next-connect'

import myAccountUpdate from '@/api/controllers/my/account/update'

export default nc()
  .put(myAccountUpdate)
