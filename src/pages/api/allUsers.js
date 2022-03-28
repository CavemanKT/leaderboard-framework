import nc from 'next-connect'

import allUsersShow from '@/api/controllers/users/show'

export default nc()
  .get(allUsersShow)
