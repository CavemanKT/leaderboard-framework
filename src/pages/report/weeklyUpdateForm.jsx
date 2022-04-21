import React from 'react'
import { useRouter } from 'next/router'
import CompsLayout from '@/components/layouts/Layout'
import CreateReportForm from '@/components/forms/report/createReportForm'
import useProfile from '@/_hooks/profile'
import useReport from '@/_hooks/report'
import withPrivateRoute from '@/_hocs/withPrivateRoute'

function PageWeeklyReportForm () {
  const { profile, apiWeeklyReportFilledSchedule } = useProfile()
  const { apiCreateReport } = useReport()
  const router = useRouter()

  const submitWeeklyReport = (value, profileId) => {
    apiCreateReport(value, profileId).then(() => {
      apiWeeklyReportFilledSchedule().then(()=> {
        router.push('/my/report')
      })
    })
  }

  return (
    <CompsLayout>
        <div className="container mt-5">
        {
          !profile?.weeklyReportFilled && (
            <h5>Weekly update | Let us know your needs.</h5>
          )
        }
        </div>

        <div className="container mt-1">
          <CreateReportForm 
            onSubmit={(value) => submitWeeklyReport(value, profile?.id)}
          />
        </div>
    </CompsLayout>
  )
}

export default withPrivateRoute(PageWeeklyReportForm)