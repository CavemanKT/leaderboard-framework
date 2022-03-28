import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import useUser from '@/_hooks/user' // this is where the use is from

import CompsLoading from '@/components/Loading'

export default function withAdminRoute(WrappedComponent) {
  return function AdminRoute(props) {
    const router = useRouter()
    const { user, isLoading, apiLogout } = useUser()

    // detect when log in 
    useEffect(() => { 
      // it won't detect the user role and won't compare the user role 
      // if user role doesn't change
      if (!isLoading && !user && user?.role !== 'admin') {
        router.push('/')
        toast.warning('Please Login as Admin First!', {
          position: 'bottom-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
      }
    }, [isLoading, user?.role])

    if (isLoading || !user) return <CompsLoading />

    // detect when navigating to there
    if ( user?.role !== 'admin') {
      apiLogout().then(() => {
        router.push('/')
        toast.warning('Please Login as Admin First!', {
          position: 'bottom-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
      })
    }

    return <WrappedComponent {...props} />
  }
}
