import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import useUser from '@/_hooks/user' // this is where the use is from

import CompsLoading from '@/components/Loading'

export default function withAdminRoute(WrappedComponent) {
  return function AdminRoute(props) {
    const router = useRouter()
    const { user, isLoading } = useUser()

    useEffect(() => {
      if (!isLoading && !user && user?.type !== 'admin') {
        console.log(user?.type)
        router.push('/admin-page/page/page-login')
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
    }, [isLoading, user?.type])

    if (isLoading || !user) return <CompsLoading />

    return <WrappedComponent {...props} />
  }
}
