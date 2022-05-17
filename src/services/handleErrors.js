import axios from 'axios'
import { warnToast, successToast, errorToast } from '@/toast'


axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  console.log('meu error aqui', error)

  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  const response = error.response
  
  if (response.status === 422) {
    for (const error in response.data) {
      errorToast({
        text: response.data[error].join(', '),
        title: 'Erro',
      })
    }
  } else if (response.status === 401) {
    errorToast({
      text: 'Não autorizado.',
      title: 'Permissão',
    })
  } else if (response.status === 500) {
    errorToast({
      text: 'Erro interno.',
      title: 'Erro',
    })
  }
  return Promise.reject(error)
})

// Vue.config.errorHandler = function (err, vm, info) {
//   console.log('[Global Error Handler]: Error in ' + info + ': ' + err)
// }
