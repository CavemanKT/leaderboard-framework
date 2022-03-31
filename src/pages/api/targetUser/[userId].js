import nc from 'next-connect'

import targetUserShow from '@/api/controllers/users/targetUserShow'

export default nc()
    .get(targetUserShow)

