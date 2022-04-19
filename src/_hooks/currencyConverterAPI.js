import useSWR from 'swr'
import fetcher from '@/_services/fetcher'

export default function useCurrencyConverter () {
    const {data, error} = useSWR(`http://data.fixer.io/api/latest?access_key=${process.env.CURRENCY_CONVERTER_API_KEY}`, fetcher, {
        shouldRetryOnError: false
    })
    
    const useCurrencyConverterAPI = () => (new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: `http://data.fixer.io/api/latest?access_key=8985c9f1ccac3e04bbfdb90bc618578a`
        }).then((resp) => {
            resolve(resp)
        }).catch((err) => {
            reject(err)
        })
    }))

    return {
        useCurrencyConverterAPI
    }
}