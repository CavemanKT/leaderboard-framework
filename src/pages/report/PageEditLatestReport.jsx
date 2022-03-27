import React from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';
import withPrivateRoute from '@/_hocs/withPrivateRoute'
import CompsLayout from '@/components/layouts/Layout'
import PageEditLatestReport from '@/components/forms/report/EditReportForm'
import useLatestReport from '@/_hooks/latestReport'
import useUser from '@/_hooks/user'


const EditLatestReport = () => {
  const router = useRouter()
  const { apiModifyLatestReport } = useLatestReport()
  const { user } = useUser()
  
  if (!user) return null

  const handleSubmit = (value, profileId) => {
    apiModifyLatestReport(value, profileId).then(() =>{
      router.push('/my/report')
      toast.success('modified successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }).catch(() => {
      toast.error('fail to modify the latest report, please contact admin for further details.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
  }

  return (
    <CompsLayout>
      <div className="container mt-5 mb-5">
        <PageEditLatestReport 
          onSubmit={(value) => handleSubmit(value, user?.Profile?.id)}
        />

      </div>
    </CompsLayout>
  )
}




export default withPrivateRoute(EditLatestReport)
