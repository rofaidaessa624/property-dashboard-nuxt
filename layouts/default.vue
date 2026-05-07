<template>
  <div dir="rtl" class="app-layout">
    <!-- Sidebar تظهر فقط عند تسجيل الدخول -->
    <Sidebar v-if="isAuthenticated" />
    
    <!-- المحتوى الرئيسي -->
    <div :class="['main-content', { 'with-sidebar': isAuthenticated }]">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const isAuthenticated = ref(false)
const router = useRouter()

const checkAuth = () => {
  if (process.client) {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    isAuthenticated.value = !!token
  }
}

onMounted(() => {
  checkAuth()
  
  // مراقبة تغيير المسار
  watch(() => router.currentRoute.value.path, () => {
    checkAuth()
  })
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f5f7fa;
}

.app-layout {
  min-height: 100vh;
}

.main-content {
  min-height: 100vh;
  transition: margin-right 0.3s ease;
}

.main-content.with-sidebar {
  margin-right: 260px;
}

/* تحسين ظهور النماذج */
input, select, textarea {
  font-family: inherit;
}

/* راحة للعرض على الشاشات الصغيرة */
@media (max-width: 768px) {
  .main-content.with-sidebar {
    margin-right: 0;
  }
}
</style>