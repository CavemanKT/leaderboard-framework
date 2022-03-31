import useSWR from 'swr'
import axios from 'axios'
import fetcher from '@/_services/fetcher'

export default function useUsers() {
    const {data, error} = useSWR('/api/allUsers', fetcher, {
        shouldRetryOnError: false
    })

    const apiUser = (userId) => (new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: `/api/targetUser/${userId}`,
            withCredentials: true
        }).then((resp) =>{
            resolve(resp)
        }).catch((err) => {
            reject(err)
        })
    }))

    return {
        allUsers: data?.users || null,
        isAllUsersLoading: !error && !data,
        isAllUsersError: error,
        apiUser
    }
}

