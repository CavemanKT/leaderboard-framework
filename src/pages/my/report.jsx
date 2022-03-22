import React from 'react'
import { useRouter } from 'next/router'
import CompsLayout from '@/components/layouts/Layout'
import withPrivateRoute from '@/_hocs/withPrivateRoute'
import useReport from '@/_hooks/report'

function PageReport() {
    const router = useRouter()
    const { report } = useReport()
    console.log(report)
    const handleNavigateToCreateReportPage = () =>{
      router.push('/report/createForm')
    }

    return (
      <CompsLayout>
        <div className="container mt-5">

            {/* no report */}
            {
              !report && (
                <div className="d-inline">
                  <button className="btn btn-info m-5" onClick={handleNavigateToCreateReportPage}>
                    Create report
                  </button>
                </div>
              )
            }

            {/* got report */}
            {
              report && (
                <div className="d-inline">
                  <button className="btn btn-info m-5"> 
                    Update report
                  </button>
                </div>
              )
            }

          <div className="d-flex justify-content-center align-items-center">
            <h4 className="m-5">
                Create your report first.
            </h4>
          </div>
        </div>
      </CompsLayout>
    )
}

export default withPrivateRoute(PageReport)