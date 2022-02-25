import nc from 'next-connect'

import authEmailAdminLogin from '@/api/controllers/auth/email/login-admin'

export default nc()
  .post(authEmailAdminLogin)
