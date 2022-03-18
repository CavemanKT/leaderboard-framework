import useSWR from 'swr'
import axios from 'axios'

import fetcher from '@/_services/fetcher'

export default function useReport() {

    const apiCreateReport = (values, profileId) => (new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            url: `/api/my/profile/${profileId}`,
            data: values,
            withCredentials: true
        }).then((resp) => {
            resolve(resp)
        }).catch((err) => {
            reject(err)
            console.log(err);
        })
    }))
    

    // const apiUpdateReport = () => {

    // }

    return {
        apiCreateReport,
        // apiUpdateReport
    }
}

