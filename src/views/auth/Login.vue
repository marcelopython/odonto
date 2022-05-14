<template>
  <form @submit.prevent="login">
    <div class="grid gap-6">
      <!-- Email input -->
      <div class="space-y-2">
        <Label for="email" value="Email" />
        <InputIconWrapper>
          <template #icon>
            <MailIcon aria-hidden="true" class="w-5 h-5" />
          </template>
          <Input
            withIcon
            id="email"
            type="email"
            class="block w-full"
            placeholder="Email"
            v-model="loginForm.email"
            required
            autofocus
            autocomplete="username"
          />
        </InputIconWrapper>
      </div>

      <!-- Password input -->
      <div class="space-y-2">
        <Label for="password" value="Password" />
        <InputIconWrapper>
          <template #icon>
            <LockClosedIcon aria-hidden="true" class="w-5 h-5" />
          </template>
          <Input
            withIcon
            id="password"
            type="password"
            class="block w-full"
            placeholder="Password"
            v-model="loginForm.password"
            required
            autocomplete="current-password"
          />
        </InputIconWrapper>
      </div>

      <!-- Remember me -->
      <div class="flex items-center justify-between">
        <!-- <label class="flex items-center">
          <Checkbox name="remember" v-model:checked="loginForm.remember" />
          <span class="ml-2 text-sm text-gray-600">Remember me</span>
        </label> -->

        <!-- <router-link :to="{ name: 'ForgotPassword' }" class="text-sm text-blue-500 hover:underline"
          >Forgot your password?</router-link
        > -->
      </div>

      <!-- Login button -->
      <div>
        <Button
          type="submit"
          class="justify-center w-full gap-2"
          :disabled="loginForm.processing"
          v-slot="{ iconSizeClasses }"
        >
          <LoginIcon aria-hidden="true" :class="iconSizeClasses" />
          <span>Entrar</span>
        </Button>
      </div>

      <!-- Register link -->
      <!-- <p class="text-sm text-gray-600 dark:text-gray-400"> -->
        <!-- Don't have an account? -->
        <!-- <router-link :to="{ name: 'Register' }" class="text-blue-500 hover:underline">Register</router-link> -->
      <!-- </p> -->
    </div>
  </form>
</template>

<script>
import Client from '@/services/Client'
const client = new Client()
import Cookie from 'js-cookie'

export default {
  inheritAttrs: false,
  data() {
    return {
      loginForm: {
        email: 'msr88ss9sssss57@gmail.com',
        password: '98653274',
        remember: false,
        processing: false,
      },
    }
  },
  methods: {
    login() {
      client
        .postLogin('/login', { username: this.loginForm.email, password: this.loginForm.password })
        .then((response) => {
          console.log(response)
          if (!response.error) {
            Cookie.set('access_token', response.access_token)
            Cookie.set('isLogged', true)
            Cookie.set('roles', JSON.stringify(response.roles))
            this.$store.state.user = response.user
            this.$store.state.roles = response.roles
            this.$store.state.isLogged = true
            this.$store.state.access_token = response.access_token
            this.$router.push('/dashboard')
            return true
          }
          // window.notify({ text: response.error, theme: 'red' })
        })
        .catch((e) => {
          console.log(e)
          // window.notify({ text: 'Falha inesperada.', theme: 'red' })
        })
    },
  },
  mounted() {
    if(this.$store.state.isLogged){
        this.$router.push('/dashboard')
    }
  }
}
</script>

<script setup>
import { reactive, ref } from 'vue'
import InputIconWrapper from '@/components/InputIconWrapper.vue'
import Label from '@/components/Label.vue'
import Input from '@/components/Input.vue'
import Checkbox from '@/components/Checkbox.vue'
import Button from '@/components/Button.vue'
import { MailIcon, LockClosedIcon, LoginIcon } from '@heroicons/vue/outline'
</script>