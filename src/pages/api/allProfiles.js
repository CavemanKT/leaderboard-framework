import nc from 'next-connect'

import allProfilesShow from '@/api/controllers/profiles/show'

export default nc()
  .get(allProfilesShow)
