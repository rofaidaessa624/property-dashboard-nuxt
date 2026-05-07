<template>
  <div class="loading-page"></div>
</template>

<script setup>
if (process.client) {
  const token = localStorage.getItem('token')
  if (token) {
    window.location.href = '/dashboard'
  } else {
    window.location.href = '/login'
  }
}
</script>

<style>
.loading-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea, #764ba2);
}
</style>