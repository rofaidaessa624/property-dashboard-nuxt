<template>
  <div class="min-h-screen bg-slate-50 p-4 md:p-6 rtl" dir="rtl">
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-extrabold text-slate-900">مرحباً، {{ clientData?.full_name }}</h1>
      <p class="text-slate-500">هذه هي لوحة التحكم الخاصة بك</p>
    </div>
    
    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-20">
      <div class="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
    
    <div v-else>
      <!-- Stats Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
          <div class="text-2xl mb-2">🏢</div>
          <div class="text-2xl font-bold text-slate-800">{{ stats.units_count }}</div>
          <div class="text-xs text-slate-500">عدد الوحدات</div>
        </div>
        
        <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
          <div class="text-2xl mb-2">💰</div>
          <div class="text-xl font-bold text-emerald-600">{{ formatCurrency(stats.total_installments) }}</div>
          <div class="text-xs text-slate-500">إجمالي الأقساط</div>
        </div>
        
        <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
          <div class="text-2xl mb-2">💵</div>
          <div class="text-xl font-bold text-blue-600">{{ formatCurrency(stats.total_paid) }}</div>
          <div class="text-xs text-slate-500">المدفوع</div>
        </div>
        
        <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
          <div class="text-2xl mb-2">📊</div>
          <div class="text-xl font-bold text-rose-600">{{ formatCurrency(stats.remaining) }}</div>
          <div class="text-xs text-slate-500">المتبقي</div>
        </div>
      </div>
      
      <!-- Recent Installments -->
      <div class="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div class="p-4 border-b border-slate-100">
          <h3 class="font-bold text-slate-800">أحدث الأقساط</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-slate-50">
              <tr>
                <th class="px-4 py-3 text-right">رقم القسط</th>
                <th class="px-4 py-3 text-right">الوحدة</th>
                <th class="px-4 py-3 text-right">المبلغ</th>
                <th class="px-4 py-3 text-right">تاريخ الاستحقاق</th>
                <th class="px-4 py-3 text-center">الحالة</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="inst in recentInstallments" :key="inst.id" class="border-b border-slate-100">
                <td class="px-4 py-3">{{ inst.installment_number }}</td>
                <td class="px-4 py-3">{{ inst.unit?.unit_number || '-' }}</td>
                <td class="px-4 py-3">{{ formatCurrency(inst.amount) }}</td>
                <td class="px-4 py-3">{{ formatDate(inst.due_date) }}</td>
                <td class="px-4 py-3 text-center">
                  <span :class="[
                    'px-2 py-1 rounded-full text-xs font-bold',
                    inst.status === 'paid' ? 'bg-emerald-100 text-emerald-700' :
                    inst.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  ]">
                    {{ getStatusText(inst.status) }}
                  </span>
                </td>
              </tr>
              <tr v-if="recentInstallments.length === 0">
                <td colspan="5" class="text-center py-8 text-slate-400">لا توجد أقساط مسجلة</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Quick Links -->
      <div class="mt-6 grid grid-cols-2 gap-4">
        <NuxtLink to="/client/units" class="bg-white rounded-xl p-4 text-center shadow-sm border border-slate-100 hover:shadow-md transition">
          <div class="text-3xl mb-2">🏢</div>
          <div class="font-bold text-slate-800">وحداتي</div>
          <div class="text-xs text-slate-500">عرض جميع وحداتك</div>
        </NuxtLink>
        <NuxtLink to="/client/installments" class="bg-white rounded-xl p-4 text-center shadow-sm border border-slate-100 hover:shadow-md transition">
          <div class="text-3xl mb-2">💰</div>
          <div class="font-bold text-slate-800">أقساطي</div>
          <div class="text-xs text-slate-500">عرض جميع أقساطك</div>
        </NuxtLink>
      </div>
      
      <!-- Logout Button -->
      <div class="mt-6 text-center">
        <button @click="logout" class="px-6 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-bold hover:bg-red-100 transition">
          تسجيل خروج
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ClientDashboard',
  
  data() {
    return {
      loading: true,
      clientData: null,
      stats: {
        units_count: 0,
        total_installments: 0,
        total_paid: 0,
        remaining: 0,
        overdue_count: 0,
        paid_count: 0,
        collection_percentage: 0
      },
      recentInstallments: []
    }
  },
  
  mounted() {
    this.checkAuth();
    this.fetchDashboard();
  },
  
  methods: {
    formatCurrency(value) {
      if (!value) return '0 ج.م';
      return new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' }).format(value);
    },
    
    formatDate(date) {
      if (!date) return '-';
      return new Date(date).toLocaleDateString('ar-EG');
    },
    
    getStatusText(status) {
      const texts = {
        paid: 'مدفوع',
        pending: 'قيد الانتظار',
        overdue: 'متأخر',
        partially_paid: 'مدفوع جزئياً'
      };
      return texts[status] || status;
    },
    
    checkAuth() {
      if (process.client) {
        const token = localStorage.getItem('client_token');
        if (!token) {
          this.$router.push('/client/login');
          return;
        }
        const clientDataStr = localStorage.getItem('client_data');
        if (clientDataStr) {
          this.clientData = JSON.parse(clientDataStr);
        }
      }
    },
    
    async fetchDashboard() {
      this.loading = true;
      try {
        const token = localStorage.getItem('client_token');
        const response = await axios.get('http://127.0.0.1:8000/api/v1/client/dashboard', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.data.success) {
          this.stats = response.data.data.stats;
          this.recentInstallments = response.data.data.recent_installments;
          if (response.data.data.client) {
            this.clientData = response.data.data.client;
          }
        }
      } catch (error) {
        console.error('Error:', error);
        if (error.response?.status === 401) {
          localStorage.removeItem('client_token');
          localStorage.removeItem('client_data');
          this.$router.push('/client/login');
        }
      } finally {
        this.loading = false;
      }
    },
    
    async logout() {
      try {
        const token = localStorage.getItem('client_token');
        if (token) {
          await axios.post('http://127.0.0.1:8000/api/v1/client/logout', {}, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
        }
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        localStorage.removeItem('client_token');
        localStorage.removeItem('client_data');
        this.$router.push('/client/login');
      }
    }
  }
}
</script>