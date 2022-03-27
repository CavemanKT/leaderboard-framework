import useSWR from 'swr'
import axios from 'axios'

import fetcher from '@/_services/fetcher'

export default function useLatestReport(id) {
    const {data, error, mutate} = useSWR(`/api/my/report/${id}`, fetcher, {
        shouldRetryOnError: false
    })

    const apiModifyLatestReport = (values, profileId) => (new Promise((resolve, reject) => {
        axios({
            method: 'PUT',
            url: `/api/my/report/${profileId}`,
            data: values,
            withCredentials: true
        }).then((resp) => {
            resolve(resp)
            console.log(resp.data)
        }).catch((err) => {
            reject(err)
            console.log(err)
        })
    }))    
    

    return {
        report: data?.report || null,
        isLoading: !error && !data,
        isError: error,
        apiModifyLatestReport
    }
}

