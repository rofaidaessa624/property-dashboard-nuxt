<template>
  <div class="sidebar">
    <div class="sidebar-logo">
      <h3>🏢 Property Dashboard</h3>
    </div>
    
    <nav class="sidebar-nav">
      <NuxtLink to="/dashboard" class="nav-link">📊 لوحة التحكم</NuxtLink>
      <NuxtLink to="/clients" class="nav-link">👥 العملاء</NuxtLink>
      <NuxtLink to="/units" class="nav-link">🏢 الوحدات</NuxtLink>
      <NuxtLink to="/installments" class="nav-link">💰 الأقساط</NuxtLink>
    </nav>
    
    <div class="sidebar-footer">
      <button @click="logout" class="logout-btn">🚪 تسجيل خروج</button>
    </div>
  </div>
</template>

<script setup>
const logout = () => {
  localStorage.removeItem('token')
  sessionStorage.removeItem('token')
  window.location.href = '/login'
}
</script>

<style scoped>
.sidebar {
  width: 260px;
  background: #1a1a2e;
  color: white;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  z-index: 100;
}

.sidebar-logo {
  padding: 24px;
  text-align: center;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.sidebar-nav {
  flex: 1;
  padding: 20px 0;
}

.nav-link {
  display: block;
  padding: 12px 24px;
  color: rgba(255,255,255,0.7);
  text-decoration: none;
  transition: all 0.3s;
}

.nav-link:hover {
  background: rgba(255,255,255,0.1);
  color: white;
}

.sidebar-footer {
  padding: 20px;
  border-top: 1px solid rgba(255,255,255,0.1);
}

.logout-btn {
  width: 100%;
  padding: 10px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>