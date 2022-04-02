import useSWR from 'swr'
import axios from 'axios'
import fetcher from '@/_services/fetcher'

export default function useUnverifiedUsers() {
    const {data, error} = useSWR('/api/allUnverifiedUsers', fetcher, {
        shouldRetryOnError: false
    })


    return {
        allUsers: data?.users || null,
        isAllUsersLoading: !error && !data,
        isAllUsersError: error,
    }
}

