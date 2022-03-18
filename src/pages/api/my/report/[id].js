import nc from 'next-connect'

import apiCreateReport from '@/api/controllers/report/create'

export default nc()
  .post(apiCreateReport)
