import useSWR from 'swr'

import fetcher from '@/_services/fetcher'

export default function useProfiles() {
    const {data, error, mutate} = useSWR('/api/allProfiles', fetcher, {
        shouldRetryOnError: false
    })

    return {
        allProfiles: data?.profiles || null,
        isLoading: !error && !data,
        isError: error,
    }
}

