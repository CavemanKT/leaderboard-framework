import useSWR from 'swr'
import axios from 'axios'

import fetcher from '@/_services/fetcher'

export default function useProfile() {
    const {data, error, mutate} = useSWR('/api/my/profile', fetcher, {
        shouldRetryOnError: false
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
            console.log(err)
        })
    }))

    return {
        profile: data?.profile || null,
        isLoading: !error && !data,
        isError: error,
        apiWeeklyReportFilledSchedule
    }
}
