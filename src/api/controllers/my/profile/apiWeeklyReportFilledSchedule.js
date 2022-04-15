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
import { Profile } from '@/db/models'

const schedule = require('node-schedule');

const apiWeeklyReportFilledSchedule = async (req, res) => {
    const profileId = res.currentUser.Profile.id
    let rule = null

    const weeklyReportFilled = await Profile.update({
        weeklyReportFilled: true,
    }, {
        where: {
            id: profileId,
        },
    })

      // notification timer
    rule = new schedule.RecurrenceRule()
    rule.dayOfWeek = 5
    rule.hour = 6
    rule.minute = 30
    rule.tz = 'Etc/UTC'

    const stopJob = () => {
        console.log(`${profileId} stop the job.`)
        schedule.gracefulShutdown()
    }

    const job = schedule.scheduleJob(rule, async () => {
        console.log(`${profileId} notified.`);
        const weeklyReportFilledToFalse = await Profile.update({
            weeklyReportFilled: false,
        }, {
            where: {
                id: profileId,
            },
        })
        console.log(weeklyReportFilledToFalse)
        stopJob()
    })

    console.log('job is initiated, user will be reminded to update the report weekly.')

    res.status(200).json({ weeklyReportFilled })
}

export default nc()
    .use(session)
    .use(getCurrentUserByToken)
    .use(authenticateUser)
    .use(apiWeeklyReportFilledSchedule)
