<template>
  <router-view />
</template>


<script>
import { gsap } from 'gsap'
import Cookie from 'js-cookie'
import Client from '@/services/Client'
const client = new Client()
import 'flowbite';
import '@/assets/css/main.css'

export default {
  mounted() {
    gsap.to('#loading .logo', { y: -50, opacity: 0, duration: 0.5 })
      gsap.to('#loading .left', { rotateY: 45, x: '-130%', duration: 1, delay: 0.6 })
      gsap.to('#loading .right', {
        rotateY: -45,
        x: '130%',
        duration: 1,
        delay: 0.6,
        onComplete: () => {
          document.getElementById('loading')?.remove()
        },
      })
      if (Cookie.get('access_token')) {
        // console.log(this.$store.state)
          this.$store.state.access_token = Cookie.get('access_token')
          client.get('user/logged').then(res => {
            Cookie.set('isLogged', true)
            Cookie.set('roles', JSON.stringify(res.data.roles))
            this.$store.state.user = res.data.user
            this.$store.state.roles = res.data.roles
            this.$store.state.isLogged = true
          }).catch(e=>{
            if(e.response.status === 401){
              Cookie.set('isLogged', false)
              this.$router.push('/login')
            }
          })
      } else {
        this.$store.state.isLogged = false
      }
  }
}
</script>

