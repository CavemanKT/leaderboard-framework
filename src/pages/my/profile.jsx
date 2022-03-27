import React, {useState} from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import CompsLayout from '@/components/layouts/Layout'
import FormEditProfile from '@/components/forms/profile/editProfile'
import FormEditProfile2 from '@/components/forms/profile/editProfile2'
import useProfile from '@/_hooks/profile'
import withPrivateRoute from '@/_hocs/withPrivateRoute'

function PageProfileEdit () {
    const { profile, apiProfileUpdate1, apiProfileUpdate2 } = useProfile()
    const [switchEditProfile2, setSwitchEditProfile2] = useState(false)
    const [switchEditProfile1, setSwitchEditProfile1] = useState(true)
    const router = useRouter()

    if(!profile) return null

    const handleSubmitEditProfile1 = (values) => {
        apiProfileUpdate1(values).then(() => {
            router.push('/')
            toast.success('Profile is updated successfully', {
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

    const handleSubmitEditProfile2 = (value) => {
        apiProfileUpdate2(value).then(() => {
            router.push('/')
            toast.success('Profile is updated successfully', {
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

    const switchToProfile1 = () => {
        setSwitchEditProfile1(true)
        setSwitchEditProfile2(false)
    }

    const switchToProfile2 = () => {
        setSwitchEditProfile2(true)
        setSwitchEditProfile1(false)
    }



  return (
    <CompsLayout>
        <div className="container my-5">
            <div className='mb-4'>
                {
                    switchEditProfile1 && (
                        <button className="btn btn-dark" onClick={switchToProfile2}>Switch to profile2</button>
                    )
                }
                {
                    switchEditProfile2 && (
                        <button className="btn btn-dark" onClick={switchToProfile1}>Switch to profile1</button>
                    )
                }
            </div>
            <div>
                {
                    switchEditProfile1 && (
                        <FormEditProfile 
                            onSubmit={handleSubmitEditProfile1}
                            profile={profile}
                        />
                    )
                }
                {
                    switchEditProfile2 && (
                        <FormEditProfile2 
                            onSubmit={handleSubmitEditProfile2}
                        />
                    )
                }
            </div>
        </div>
    </CompsLayout>
  )
}

export default withPrivateRoute(PageProfileEdit)