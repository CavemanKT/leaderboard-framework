/* eslint-disable indent */
import nc from 'next-connect'

import { Op } from 'sequelize'
import session from '@/api/helpers/session'
import getCurrentUserByToken from '@/api/helpers/getCurrentUserByToken'
import authenticateUser from '@/api/helpers/authenticateUser'
import { Profile, Report1 } from '@/db/models'

const allProfilesShow = async (req, res) => {
    // const {query} = req.
    const q = req?.query?.q || ''
    const page = Number(req?.query?.page) || 1
    const limit = 6
    const offset = (page - 1) * limit


    const profiles = await Profile.findAndCountAll({
        where: {
            domain: {
                [Op.iLike]: `%${q}`
            }
        },
        order: [['createdAt', 'DESC']],
        limit,
        offset
    })
    console.log(profiles.rows[0])
    res.status(200).json({profiles: profiles.rows, 
        filter: {q, page, limit, offset, totalPage: Math.ceil(profiles.count / limit)}
    })
}

export default nc()
  .use(session)
  .use(getCurrentUserByToken)
  .use(authenticateUser)
  .use(allProfilesShow)
