import apiClient from '@/services/api'
import { defineStore } from 'pinia'

export let useAuthStore = defineStore('auth', {
  state() {
    return {
      user: [],
      access_token: '',
      processing: false,
    }
  },

  actions: {
    async login(credential) {
      this.processing = true

      try {
        const response = await apiClient.post('/auth/login', credential)

        localStorage.setItem('auth', JSON.stringify(response.data.data))

        this.$state.user = response.data.data.user
        this.$state.access_token = response.data.data.access_token
      } catch (error) {
        console.error('Login error:', error)
        throw error
      } finally {
        this.processing = false
      }
    },

    getUser() {
      if (!this.$state.user || this.$state.user.length === 0) {
        const authData = localStorage.getItem('auth')
        if (authData) {
          const parsedData = JSON.parse(authData)
          this.$state.user = parsedData.user
          this.$state.access_token = parsedData.access_token
        }
      }
      return this.$state.user
    },

    async logout() {
      try {
        await apiClient.get('/auth/logout')

        localStorage.removeItem('auth')
        this.$state.user = []
        this.$state.access_token = ''
      } catch (error) {
        console.error('Logout error:', error)
        throw error
      }
    },
  },
})
