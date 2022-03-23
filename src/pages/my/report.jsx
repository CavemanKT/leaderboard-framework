import React from 'react'
import { useRouter } from 'next/router'
import CompsLayout from '@/components/layouts/Layout'
import withPrivateRoute from '@/_hocs/withPrivateRoute'
import useReport from '@/_hooks/report'
import LineChart from '@/components/charts/line-chart'

function PageReport() {
    const router = useRouter()
    const { reports } = useReport()
    console.log(reports)
    const handleNavigateToCreateReportPage = () =>{
      router.push('/report/createForm')
    }

    return (
      <CompsLayout>
        <div className="container mt-5">

            {/* no report */}
            {
              !reports && (
                <div className="d-inline">
                  <button className="btn btn-info m-5" onClick={handleNavigateToCreateReportPage}>
                    Create report
                  </button>
                </div>
              )
            }

            {/* got report */}
            {
              reports && (
                <div className="d-inline">
                  <button className="btn btn-info m-5"> 
                    Update report
                  </button>
                </div>
              )
            }

          <div className="d-flex justify-content-center align-items-center">
              {/* the achievement, plan and the trend of the score or trend of MRR/ Revenue */}
          {
            reports && (
              <LineChart
                myReportData={reports}
              />
            )
          }

          {
            !reports && (
              <h4 className="m-5">
                  Create your report first.
              </h4>
            )
          }
          </div>
        </div>
      </CompsLayout>
    )
}

export default withPrivateRoute(PageReport)