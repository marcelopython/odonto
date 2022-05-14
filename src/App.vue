<template>
  <router-view />
</template>


<script>
import { gsap } from 'gsap'
import Cookie from 'js-cookie'
import Client from '@/services/Client'
const client = new Client()

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
          this.$store.state.access_token = Cookie.get('access_token')
          client.get('user/logged').then(res => {
            this.$store.state.user = res.data.user
            this.$store.state.roles = res.data.roles
            this.$store.state.isLogged = true
          }).catch(e=>{
            if(e.response.status === 401){
            this.$router.push('/login')
            }
          })
      } else {
        this.$store.state.isLogged = false
      }
  }
}
</script>

