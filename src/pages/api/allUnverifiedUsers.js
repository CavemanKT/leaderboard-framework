import nc from 'next-connect'

import allUnverifiedUsersShow from '@/api/controllers/users/unverifiedShow'

export default nc()
  .get(allUnverifiedUsersShow)
