<template>
  <div style="padding: 30px;">
    <h1>لوحة التحكم</h1>
    <p>مرحباً بك في نظام إدارة العقارات</p>
    
    <div style="margin-top: 30px;">
      <h3>إحصائيات سريعة</h3>
      <div style="display: flex; gap: 20px; margin-top: 15px;">
        <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
          <h2>{{ stats.clients }}</h2>
          <p>العملاء</p>
        </div>
        <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
          <h2>{{ stats.units }}</h2>
          <p>الوحدات</p>
        </div>
        <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
          <h2>{{ stats.installments }}</h2>
          <p>الأقساط</p>
        </div>
      </div>
    </div>
    
    <button @click="logout" style="margin-top: 30px; padding: 10px 20px; background: red; color: white; border: none; border-radius: 5px; cursor: pointer;">
      تسجيل خروج
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const stats = ref({ clients: 0, units: 0, installments: 0 })

onMounted(async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    window.location.href = '/login'
    return
  }
  
  try {
    const res = await axios.get('http://127.0.0.1:8000/api/v1/dashboard/stats', {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (res.data.success) {
      stats.value = res.data.data.stats
    }
  } catch (err) {
    console.error(err)
  }
})

const logout = () => {
  localStorage.removeItem('token')
  window.location.href = '/login'
}
</script>