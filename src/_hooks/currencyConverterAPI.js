export default function useCurrencyConverter () {

    const useCurrencyConverterAPI = () => (new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: ``
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