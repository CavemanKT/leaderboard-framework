import useSWR from 'swr'
import axios from 'axios'

import fetcher from '@/_services/fetcher'

export default function useReport() {
    const {data, error, mutate} = useSWR('/api/my/report', fetcher, {
        shouldRetryOnError: false
    })

    const apiCreateReport = (values, profileId) => (new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            url: `/api/my/report/${profileId}`,
            data: values,
            withCredentials: true
        }).then((resp) => {
            resolve(resp)
        }).catch((err) => {
            reject(err)
            window.location.reload(false);
        })
    }))
    

    return {
        reports: data?.reports || null,
        chartData: data?.chartData || null,
        isLoading: !error && !data,
        isError: error,
        apiCreateReport,
    }
}

