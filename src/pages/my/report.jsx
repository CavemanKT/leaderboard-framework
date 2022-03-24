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

    const handleNavigateToWeeklyUpdatePage = () => {
      router.push('/report/weeklyUpdateForm')
    }

    return (
      <CompsLayout>
        <div className="container mt-5">

            {/* no report */}
            {
              reports.length == 0 && (
                <div className="d-inline">
                  <button className="btn btn-info m-5" onClick={handleNavigateToCreateReportPage}>
                    Create report
                  </button>
                </div>
              )
            }

            {/* got report */}
            {
              reports.length >= 1 && (
                <div className="d-inline">
                  <button className="btn btn-info m-5" onClick={handleNavigateToWeeklyUpdatePage}> 
                    Weekly update
                  </button>
                </div>
              )
            }

          <div className="d-flex justify-content-center align-items-center">
              {/* the achievement, plan and the trend of the score or trend of MRR/ Revenue */}
          {
            reports.length >=1 && (
              <LineChart
                myReportData={reports}
              />
            )
          }

          {
            reports.length ==0 && (
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