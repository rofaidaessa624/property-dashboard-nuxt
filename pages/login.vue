<template>
  <div class="login-container">
    <div class="login-card">
      <h2>تسجيل الدخول</h2>
      
      <div v-if="errorMsg" class="error-msg">
        {{ errorMsg }}
      </div>
      
      <input
        v-model="email"
        type="email"
        placeholder="البريد الإلكتروني"
        class="login-input"
      />
      
      <input
        v-model="password"
        type="password"
        placeholder="كلمة المرور"
        class="login-input"
      />
      
      <button @click="login" :disabled="loading" class="login-btn">
        {{ loading ? 'جاري الدخول...' : 'دخول' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

definePageMeta({
    middleware: []
});

const email = ref<string>('')
const password = ref<string>('')
const loading = ref<boolean>(false)
const errorMsg = ref<string>('')

const login = async (): Promise<void> => {
  loading.value = true
  errorMsg.value = ''
  
  try {
    const res = await axios.post('https://api.mawtin.net/api/v1/login', {
      email: email.value,
      password: password.value
    })
    
    const token = res.data.token
    if (token) {
      localStorage.setItem('token', token)
      // إعادة التوجيه للصفحة الرئيسية
      window.location.href = '/'
    } else {
      errorMsg.value = 'فشل تسجيل الدخول'
    }
  } catch (err) {
    errorMsg.value = 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.login-card {
  background: white;
  padding: 40px;
  border-radius: 16px;
  width: 350px;
  text-align: center;
}

.login-card h2 {
  margin-bottom: 30px;
}

.login-input {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.login-btn:disabled {
  opacity: 0.7;
}

.error-msg {
  background: #fee;
  color: red;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 15px;
}
</style>