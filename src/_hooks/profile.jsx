import useSWR from 'swr'
import axios from 'axios'

import fetcher from '@/_services/fetcher'

export default function useProfile() {
    const {data, error, mutate} = useSWR('/api/my/profile/profile1', fetcher, {
        shouldRetryOnError: false,
        revalidateOnFocus: true,
    })

    const apiWeeklyReportFilledSchedule = () => (new Promise((resolve, reject) => {
        axios({
            method: 'PUT',
            url: '/api/apiWeeklyReportFilledSchedule',
            withCredentials: true
        }).then((resp) => {
            resolve(resp)
            mutate(resp.data)
        }).catch((err) => {
            reject(err)
        })
    }))

    const apiProfileUpdate1 = (value) => (new Promise((resolve, reject) => {
        axios({
            method: 'PUT',
            url: '/api/my/profile/profile1',
            data: value,
            withCredentials: true
        }).then((resp) => {
            resolve(resp)
        }).catch((err) => {
            reject(err)
            window.location.reload(false)
        })
    }))

    const apiProfileUpdate2 = (value) => (new Promise((resolve, reject) => {
        axios({
            method: 'PUT',
            url: '/api/my/profile/profile2',
            data: value,
            withCredentials: true
        }).then((resp) => {
            resolve(resp)
        }).catch((err) => {
            reject(err)
            window.location.reload(false)
        })
    }))

    return {
        profile: data?.profile || null,
        isLoading: !error && !data,
        isError: error,
        apiWeeklyReportFilledSchedule,
        apiProfileUpdate1,
        apiProfileUpdate2
    }
}
