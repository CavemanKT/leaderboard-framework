import React from 'react'
import CompsLayout from '@/components/layouts/Layout'
import CreateReportForm from '@/components/forms/report/createReportForm'
import useProfile from '@/_hooks/profile'
import useReport from '@/_hooks/report'
import { useRouter } from 'next/router'

export default function PageCreateForm () {
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
            <h5>create your report</h5>
        </div>

        <div className="container mt-1">
          <CreateReportForm 
            onSubmit={(value) => submitReportCreate(value, profile?.id)}
          />
        </div>
    </CompsLayout>
  )
}
