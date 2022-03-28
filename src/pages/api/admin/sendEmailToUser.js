import nc from 'next-connect'

import sendEmailToUser from '@/api/controllers/admin/sendEmailToUser'

export default nc()
  .post(sendEmailToUser)
