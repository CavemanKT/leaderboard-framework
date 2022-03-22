import useSWR from 'swr'
import axios from 'axios'

import fetcher from '@/_services/fetcher'

export default function useReport() {

    const apiCreateReport = (values, profileId) => (new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            url: `/api/my/report/${profileId}`,
            data: values,
            withCredentials: true
        }).then((resp) => {
            resolve(resp)
            console.log(resp)
        }).catch((err) => {
            reject(err)
            console.log(err);
            window.location.reload(false);
        })
    }))
    

    // const apiUpdateReport = () => {

    // }

    return {
        apiCreateReport,
        // apiUpdateReport
    }
}

