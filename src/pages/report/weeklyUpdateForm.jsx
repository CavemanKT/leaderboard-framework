import React from 'react'
import { useRouter } from 'next/router'
import CompsLayout from '@/components/layouts/Layout'
import CreateReportForm from '@/components/forms/report/createReportForm'
import useProfile from '@/_hooks/profile'
import useReport from '@/_hooks/report'
import withPrivateRoute from '@/_hocs/withPrivateRoute'

function PageReportCreateForm () {
  const { profile } = useProfile()
  const { apiCreateReport } = useReport()
  const router = useRouter()

  const submitReportCreate = (value, profileId) => {
    console.log(value, profileId)
    apiCreateReport(value, profileId).then(() => {
      router.push('/my/report')
    })
  }

  return (
    <CompsLayout>
        <div className="container mt-5">
            <h5>update your recent status</h5>
        </div>

        <div className="container mt-1">
          <CreateReportForm 
            onSubmit={(value) => submitReportCreate(value, profile?.id)}
          />
        </div>
    </CompsLayout>
  )
}

export default withPrivateRoute(PageReportCreateForm)