import nc from 'next-connect'

import session from '@/api/helpers/session'
import getCurrentUserByToken from '@/api/helpers/getCurrentUserByToken'
import authenticateUser from '@/api/helpers/authenticateUser'
import { Report1 } from '@/db/models'

const myReport1Show = async (req, res) => {
    const profileId = res.currentUser.Profile.id

    const reports = await Report1.findAll({
        where: {
            ProfileId: profileId
        },
        order: [['updatedAt', 'DESC'] ]
    })

    // let arrScore = []
    // for(var i = 0; i < reports.length; i++){
    //   arrScore.push(reports[i].score)
    // }
    // let arrWeek = []
    // for(var j = 0; j < reports.length; j++){
    //   arrWeek.push(reports[i].updatedAt)
    // }

    // console.log('updatedAt11111111111111111111111111111', reports, reports[0].updatedAt, reports[0].updatedAt.getDay())

    var interValId = setInterval(() => {
      console.log(profileId)
       // [ERR_HTTP_HEADERS_SENT]
    }, 3000);

    setTimeout(() => {
      console.log('closed')
      clearInterval(interValId)
    }, 7000);

// after converting timestamp to day of the week

  res.status(200).json({ reports })
}

export default nc()
  .use(session)
  .use(getCurrentUserByToken)
  .use(authenticateUser)
  .use(myReport1Show)
