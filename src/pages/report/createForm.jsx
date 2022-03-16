import React from 'react'
import CompsLayout from '@/components/layouts/Layout'
import CreateReportForm from '@/components/forms/report/createReportForm'

const user = {
  id: 1
}
export default function createForm () {
  // need hook to fetch user/profile id

  const submitReportCreate = (value, id) => {
    console.log(value, id)
  }

  return (
    <CompsLayout>
        <div className="container mt-5">
            <h5>create your report</h5>
        </div>

        <div className="container mt-1">
          <CreateReportForm 
            onSubmit={(value) => submitReportCreate(value, user?.id)}
          />
        </div>
    </CompsLayout>
  )
}
