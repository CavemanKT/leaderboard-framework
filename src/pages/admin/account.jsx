import React from 'react'
import { useRouter } from 'next/router'
import CompsLayout from '@/components/layouts/Layout'
import FormPasswordUpdate from '@/components/forms/auth/password'
import useUser from '@/_hooks/user'

export default function account () {
    const router = useRouter()
  const { user, apiPasswordUpdate, apiLogout } = useUser()

  const submitPasswordUpdate = (value, id) => {
    console.log(value, id)
    apiPasswordUpdate(value, id).then((resp) => {
      apiLogout()
      router.push('/')
    })
  }

  return (
    <CompsLayout>
        <div className='container mt-5'>
            <FormPasswordUpdate 
                onSubmit={(value) => submitPasswordUpdate(value, user?.id)}
            />

            
        </div>
    </CompsLayout>
  )
}
