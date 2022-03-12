import React from 'react'
import CompsLayout from '@/components/layouts/Layout'
import { useRouter } from 'next/router'
// import useReport from '@/_hooks/report'

export default function report() {
    const router = useRouter()
    // const { data } = useReport()
    const handleNavigateToCreateReportPage = () =>{
      router.push('/report/createForm')
    }

    return (
      <CompsLayout>
        <div className="container mt-5">

            {/* no report */}
            <div className="d-inline">
                <button className="btn btn-info m-5" onClick={handleNavigateToCreateReportPage}>Create report</button>
            </div>
            {/* got report */}
            <div className="d-inline">
                <button className="btn btn-info m-5"> 
                    Update report
                </button>
            </div>

          <div className="d-flex justify-content-center align-items-center">
            <h4 className="m-5">
                Create your report first.
            </h4>
          </div>
        </div>
      </CompsLayout>
    )
}
