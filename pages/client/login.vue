<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Logo/Brand -->
      <div class="text-center mb-8">
        <div class="text-5xl mb-4">🏢</div>
        <h1 class="text-3xl font-bold text-white">Property Dashboard</h1>
        <p class="text-slate-400 mt-2">تسجيل دخول العملاء</p>
      </div>
      
      <!-- Login Card -->
      <div class="bg-white rounded-2xl shadow-2xl p-8">
        <h2 class="text-2xl font-bold text-center text-slate-800 mb-2">مرحباً بك</h2>
        <p class="text-center text-slate-500 text-sm mb-6">الرجاء إدخال البيانات المطلوبة</p>
        
        <form @submit.prevent="handleLogin">
          <!-- الرقم القومي -->
          <div class="mb-5">
            <label class="block text-sm font-bold text-slate-700 mb-2">الرقم القومي</label>
            <div class="relative">
              <span class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">🆔</span>
              <input
                v-model="form.national_id"
                type="text"
                maxlength="14"
                placeholder="أدخل 14 رقم"
                class="w-full pr-10 pl-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                required
              />
            </div>
          </div>
          
          <!-- كلمة المرور -->
          <div class="mb-6">
            <label class="block text-sm font-bold text-slate-700 mb-2">كلمة المرور</label>
            <div class="relative">
              <span class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">🔒</span>
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                class="w-full pr-10 pl-12 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                required
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {{ showPassword ? '👁️' : '👁️‍🗨️' }}
              </button>
            </div>
          </div>
          
          <!-- Error Message -->
          <div v-if="errorMessage" class="mb-4 p-3 bg-red-50 border-r-4 border-red-500 rounded-lg">
            <p class="text-red-600 text-sm">{{ errorMessage }}</p>
          </div>
          
          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl font-bold transition-all duration-200 shadow-lg shadow-blue-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="inline-flex items-center gap-2">
              <span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              جاري التحقق...
            </span>
            <span v-else>دخول</span>
          </button>
        </form>
        
        <!-- Footer -->
        <div class="mt-6 text-center">
          <p class="text-xs text-slate-400">
            للإدارة فقط | تواصل مع الدعم الفني في حالة وجود مشكلة
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ClientLogin',
  
  data() {
    return {
      form: {
        national_id: '',
        password: ''
      },
      showPassword: false,
      loading: false,
      errorMessage: ''
    }
  },
  
  mounted() {
    // التحقق من وجود token سابق
    if (process.client) {
      const token = localStorage.getItem('client_token');
      if (token) {
        this.$router.push('/client/dashboard');
      }
    }
  },
  
  methods: {
    async handleLogin() {
      this.loading = true;
      this.errorMessage = '';
      
      try {
        const response = await axios.post('https://api.mawtin.net/api/v1/client/login', this.form);
        
        if (response.data.success) {
          // حفظ token
          localStorage.setItem('client_token', response.data.token);
          localStorage.setItem('client_data', JSON.stringify(response.data.client));
          
          // توجيه إلى dashboard العميل
          this.$router.push('/client/dashboard');
        } else {
          this.errorMessage = response.data.message || 'فشل تسجيل الدخول';
        }
      } catch (error) {
        console.error('Login error:', error);
        if (error.response?.data?.message) {
          this.errorMessage = error.response.data.message;
        } else {
          this.errorMessage = 'حدث خطأ في الاتصال بالسيرفر';
        }
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
/* تحسينات إضافية */
input {
  transition: all 0.2s ease;
}

input:focus {
  transform: translateY(-1px);
}
</style>