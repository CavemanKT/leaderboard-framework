/* eslint-disable linebreak-style */
/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable semi */
/* eslint-disable no-use-before-define */
/* eslint-disable space-before-blocks */
/* eslint-disable indent */
import nc from 'next-connect'

import session from '@/api/helpers/session'
import getCurrentUserByToken from '@/api/helpers/getCurrentUserByToken'
import authenticateUser from '@/api/helpers/authenticateUser'
import { Report1, Profile } from '@/db/models'

const schedule = require('node-schedule');

const apiWeeklyReportFilledSchedule = async (req, res) => {
    const profileId = res.currentUser.Profile.id
    let rule = null

    console.log('profileId', profileId)

    const weeklyReportFilled = await Profile.update({
        weeklyReportFilled: true
    }, {
        where: {
            id: profileId
        }
    })

    console.log(weeklyReportFilled)

      // notification timer
    rule = new schedule.RecurrenceRule()
    // rule.dayOfWeek = 5
    rule.dayOfWeek = 6
    // rule.hour = 6
    // rule.minute = 30
    rule.second = 0
    // rule.tz = 'Etc/UTC'

    const stopJob = () => {
        console.log(`${profileId} stop the job.`)
        schedule.gracefulShutdown()
    }

    const job = schedule.scheduleJob(rule, function(){
        console.log(`${profileId} notified.`);
        stopJob()
    })

    console.log('job is initiated.')
    

    
    res.status(200).json({weeklyReportFilled})
}

export default nc()
    .use(session)
    .use(getCurrentUserByToken)
    .use(authenticateUser)
    .use(apiWeeklyReportFilledSchedule)