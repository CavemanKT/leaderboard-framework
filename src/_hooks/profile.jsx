import useSWR from 'swr'
import axios from 'axios'

import fetcher from '@/_services/fetcher'

export default function useProfile() {
    const {data, error, mutate} = useSWR('/api/my/profile', fetcher, {
        shouldRetryOnError: false
    })


    return {
        profile: data?.profile || null,
        isLoading: !error && !data,
        isError: error,
    }
}

