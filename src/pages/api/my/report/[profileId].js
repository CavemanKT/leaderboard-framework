import nc from 'next-connect'

import apiCreateReport from '@/api/controllers/report/create'
import apiModifyLatestReport from '@/api/controllers/report/modifyLatestReport'
import apiLatestReportShow from '@/api/controllers/report/showLatestReport'

export default nc()
  .get(apiLatestReportShow)
  .post(apiCreateReport)
  .put(apiModifyLatestReport)
