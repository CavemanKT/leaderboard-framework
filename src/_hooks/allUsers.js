import useSWR from 'swr'

import fetcher from '@/_services/fetcher'

export default function useUsers() {
    const {data, error} = useSWR('/api/allUsers', fetcher, {
        shouldRetryOnError: false
    })

    return {
        allUsers: data?.users || null,
        isAllUsersLoading: !error && !data,
        isAllUsersError: error,
    }
}

