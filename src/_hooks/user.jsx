import useSWR from 'swr'
import axios from 'axios'

import fetcher from '@/_services/fetcher'
import getFormData from '@/_services/getFormData'

export default function useUser() {
  const { data, error, mutate } = useSWR('/api/my/user', fetcher, {
    shouldRetryOnError: false
  })
console.log(data)
  const apiSignup = (values) => (new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: '/api/auth/email/signup',
      data: values,
      withCredentials: true
    }).then((resp) => {
      resolve(resp)
      mutate(resp.data)
    }).catch((err) => {
      reject(err)
      console.log(err)
    })
  }))

  const apiLogin = (values) => (new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: '/api/auth/email/login',
      data: values,
      withCredentials: true
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
    console.log(values)
    axios({
      method: 'PUT',
      url: `/api/my/account/${id}`,
      data: values,
      withCredentials: true
    }).then((resp) => {
      console.log(resp.data)
      resolve(resp)
      mutate(resp.data)
    }).catch((err) => {
      reject(err)
      console.log(err)
    })
  }))

  const apiPasswordUpdate = (values, id) => (new Promise((resolve, reject) => {
    console.log(values)
    axios({
      method: 'PUT',
      url: `/api/my/password/${id}`,
      data: values,
      withCredentials: true
    }).then((resp) => {
      console.log(resp.data)
      resolve(resp)
      mutate(resp.data)
    }).catch((err) => {
      reject(err)
      console.log(err)
    })
  }))

  return {
    user: data?.user || null,
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message,
    apiSignup,
    apiLogin,
    apiLogout,
    apiAccountUpdate,
    apiPasswordUpdate
  }
}
