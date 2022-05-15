
import { createApp } from 'vue'
import router from '@/router'
import App from '@/App.vue'
import Toast from 'vue-toastification'
import 'flowbite';
import '@/index.css'
import store from './store/index'

const app = createApp(App)

app.use(store)

app.use(router)
app.use(Toast, {
  hideProgressBar: true,
  closeOnClick: false,
  closeButton: false,
  icon: false,
  timeout: false,
  transition: 'Vue-Toastification__fade',
})
app.mount('#app')
