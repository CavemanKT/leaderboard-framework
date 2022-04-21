import useSWR from 'swr'
import axios from 'axios'

import fetcher from '@/_services/fetcher'

export default function useUser() {
  const { data, error, mutate } = useSWR('/api/my/user', fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: true
  })

  const apiTurmail = (email) => (new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: `https://api.trumail.io/v2/lookups/json?email=${email}`,
    }).then((resp) => {
      resolve(resp.data)
    }).catch((err) => {
      reject(err)
    })
  }))

  

  const apiSignup = (values) => (new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: '/api/auth/email/signup',
      data: values
    }).then((resp) => {
      resolve(resp)
      mutate(resp.data)
    }).catch((err) => {
      reject(err)
    })
  }))

  const apiLogin = (values) => (new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: '/api/auth/email/login',
      data: values
    }).then((resp) => {
      resolve(resp)
      mutate(resp.data)
    }).catch((err) => {
      reject(err)
    })
  }))

  const apiLogout = () => (new Promise((resolve, reject) => {
    axios({
      method: 'DELETE',
      url: '/api/auth/logout',
      withCredentials: true
    }).then((resp) => {
      resolve(resp)
      mutate(null)
    }).catch((err) => {
      reject(err)
    })
  }))

  const apiAccountUpdate = (values, id) => (new Promise((resolve, reject) => {
    axios({
      method: 'PUT',
      url: `/api/my/account/${id}`,
      data: values,
      withCredentials: true
    }).then((resp) => {
      resolve(resp)
      mutate(resp.data)
    }).catch((err) => {
      reject(err)
    })
  }))

  const apiPasswordUpdate = (values, id) => (new Promise((resolve, reject) => {
    axios({
      method: 'PUT',
      url: `/api/my/password/${id}`,
      data: values,
      withCredentials: true
    }).then((resp) => {
      resolve(resp)
      mutate(resp.data)
    }).catch((err) => {
      reject(err)
    })
  }))

  return {
    user: data?.user || null,
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message,
    apiTurmail,
    apiSignup,
    apiLogin,
    apiLogout,
    apiAccountUpdate,
    apiPasswordUpdate
  }
}
