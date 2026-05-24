<template>
  <div class="min-h-screen bg-slate-50 p-4 md:p-6 rtl" dir="rtl">
    <NuxtLink to="/client/dashboard" class="inline-flex items-center gap-2 text-blue-600 mb-4">
      ← العودة للوحة التحكم
    </NuxtLink>
    
    <h1 class="text-2xl font-extrabold text-slate-900 mb-4">وحداتي</h1>
    
    <div v-if="loading" class="flex justify-center py-20">
      <div class="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
    
    <div v-else-if="units.length === 0" class="bg-white rounded-xl p-8 text-center">
      <p class="text-slate-500">لا توجد وحدات مرتبطة بحسابك</p>
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="unit in units" :key="unit.id" class="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div class="p-4">
          <div class="flex justify-between items-start mb-3">
            <span class="text-lg font-bold text-slate-800">{{ unit.unit_number }}</span>
            <span :class="[
              'px-2 py-1 rounded-full text-xs font-bold',
              unit.status === 'sold' ? 'bg-emerald-100 text-emerald-700' :
              unit.status === 'available' ? 'bg-blue-100 text-blue-700' :
              'bg-amber-100 text-amber-700'
            ]">
              {{ unit.status === 'sold' ? 'مباعة' : unit.status === 'available' ? 'متاحة' : 'محجوزة' }}
            </span>
          </div>
          <div class="space-y-2 text-sm">
            <p><span class="text-slate-500">السعر:</span> {{ formatCurrency(unit.price) }}</p>
            <p><span class="text-slate-500">المساحة:</span> {{ unit.area }} م²</p>
            <p><span class="text-slate-500">الموقع:</span> {{ unit.location || 'غير محدد' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ClientUnits',
  
  data() {
    return {
      units: [],
      loading: true
    }
  },
  
  mounted() {
    this.fetchUnits();
  },
  
  methods: {
    formatCurrency(value) {
      if (!value) return '0 ج.م';
      return new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' }).format(value);
    },
    
    async fetchUnits() {
      this.loading = true;
      try {
        const token = localStorage.getItem('client_token');
        const response = await axios.get('https://api.mawtin.net/api/v1/client/units', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.data.success) {
          this.units = response.data.data;
        }
      } catch (error) {
        console.error('Error:', error);
        if (error.response?.status === 401) {
          this.$router.push('/client/login');
        }
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>