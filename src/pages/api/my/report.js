import nc from 'next-connect'

import myReportShow from '@/api/controllers/my/report/show'

export default nc()
  .get(myReportShow)
