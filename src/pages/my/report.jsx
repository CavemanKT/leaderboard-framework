import React from 'react'
import { useRouter } from 'next/router'
import CompsLayout from '@/components/layouts/Layout'
import withPrivateRoute from '@/_hocs/withPrivateRoute'
import useReport from '@/_hooks/report'
import LineChart from '@/components/charts/line-chart'
import useProfile from '@/_hooks/profile'

function PageReport() {
    const router = useRouter()
    const { reports, chartData } = useReport()
    const { profile } = useProfile()

    if(reports?.length === 0 && profile.weeklyReportFilled === true) return (
      <CompsLayout>
        <div className="container d-flex justify-content-center align-items-center">
          <h3>Please wait until Friday and create Your First Report</h3>
        </div>
      </CompsLayout>
    )

    const handleNavigateToCreateReportPage = () =>{
      router.push('/report/createForm')
    }

    const handleNavigateToWeeklyUpdatePage = () => {
      router.push('/report/weeklyUpdateForm')
    }

    const handleNavigateToEditReportPage = () =>{
      router.push('/report/PageEditLatestReport')   // reportlist or directly to edit page to update the most recent report ?
    }

    return (
      <CompsLayout>
        <div className="container mt-5">

            {/* no report */}
            {
              reports?.length == 0 && (
                <div className="d-inline">
                  <button className="btn btn-info m-5" onClick={handleNavigateToCreateReportPage}>
                    Create report
                  </button>
                </div>
              )
            }

            {/* got report */}
            {
              reports?.length >= 1 && (
                <div className="d-inline">
                  <button className="btn btn-info m-5" onClick={handleNavigateToWeeklyUpdatePage}> 
                    Weekly update
                  </button>
                </div>
              )
            }

            {/* got report & modify report data */}
            {
              reports?.length >= 1 && (
                <div className="d-inline">
                  <button className="btn btn-info m-5" onClick={handleNavigateToEditReportPage}>
                  {/* modify the latest report */}
                    Modify report
                  </button>
                </div>
              )
            }

          <div className="d-flex justify-content-center align-items-center">
            {/* the achievement, plan and the trend of the score or trend of MRR/ Revenue */}
          {
            reports?.length >=1 && chartData?.scores.length >= 1 && (
              <LineChart
                chartData={chartData}
              />
            )
          }

          {
            reports?.length == 0 && (
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