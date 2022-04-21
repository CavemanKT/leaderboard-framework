import axios from 'axios'

export default function useCurrencyConverter () {
    const apiCurrencyConverter = () => (new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: `http://data.fixer.io/api/latest?access_key=8985c9f1ccac3e04bbfdb90bc618578a`
        }).then((resp) => {
            resolve(resp.data)
        }).catch((err) => {
            reject(err)
        })
    }))

    return {
        apiCurrencyConverter
    }
}