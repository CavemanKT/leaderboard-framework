import nc from 'next-connect'

import apiWeeklyReportFilledSchedule from '@/api/controllers/my/profile/apiWeeklyReportFilledSchedule'

export default nc()
  .put(apiWeeklyReportFilledSchedule)
