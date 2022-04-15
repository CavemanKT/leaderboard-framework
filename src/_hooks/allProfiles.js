import useSWR from 'swr'
import fetcher from '@/_services/fetcher'
import {useRouter} from 'next/router'

export default function useProfiles() {
    const { query: { page, q, subject, order }, isReady } = useRouter()
    console.log(page, isReady, q, subject, order)
    const {data, error, mutate} = useSWR(isReady ? `/api/allProfiles?page=${page}&q=${q}&subject=${subject}&order=${order}` : null, fetcher, {
        shouldRetryOnError: false
    })

    return {
        allProfiles: data?.profiles || null,
        allMeta: data?.filter,
        isLoading: !error && !data,
        isError: error,
    }
}

