import axios from 'axios'

export default function useMailbox () {

    const apiSendEmailToUser = (values) => (new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            url: '/api/admin/sendEmailToUser',
            data: values,
            withCredentials: true
        }).then((resp) => {
            resolve(resp)
        }).catch((err) => {
            reject(err)
        })
    }))

    return {
        apiSendEmailToUser
    }

}