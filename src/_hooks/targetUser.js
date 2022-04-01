import useSWR from 'swr'
import axios from 'axios'

import fetcher from '@/_services/fetcher'

export default function useTargetUser(userId) {
    const url = userId ? `/api/targetUser/${userId}` : null
    const {data, error, mutate} = useSWR(url, fetcher, {
        shouldRetryOnError: false,
        refreshInterval: 1000
    })

    const apiSetVerifiedToTrue = (targetUserId) => (new Promise((resolve, reject) => {
        axios({
            method: 'PUT',
            url: `/api/targetUser/${targetUserId}`,
            withCredentials: true,
        }).then((resp) => {
            resolve(resp)
            console.log(resp.data)
            mutate(resp.data)
        }).catch((err) => {
            reject(err)
        })
    }))

    return {
        targetUser: data || null,
        isAllUsersLoading: !error && !data,
        isAllUsersError: error,
        apiSetVerifiedToTrue
    }
}