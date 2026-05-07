import { defineStore } from 'pinia'

export const useClientsStore = defineStore('clients', {
  state: () => ({
    clients: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchClients() {
      this.loading = true

      try {
        const res = await $fetch('http://127.0.0.1:9000/api/v1/clients')
        this.clients = res.data
      } catch (e) {
        this.error = e.message
      } finally {
        this.loading = false
      }
    }
  }
})