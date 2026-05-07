<template>
  <div class="min-h-screen bg-slate-50/50 p-4 md:p-6 rtl" dir="rtl">
    <div class="w-full">
      <!-- Header -->
      <header class="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">الوحدات السكنية</h1>
          <p class="text-slate-500 text-sm">إدارة ومتابعة كافة الوحدات السكنية وحالاتها</p>
        </div>
        <NuxtLink 
          to="/units/add"
          class="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          إضافة وحدة جديدة
        </NuxtLink>
      </header>

      <!-- Stats Grid -->
      <div class="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <div class="group relative overflow-hidden rounded-xl border border-white bg-white p-4 shadow-sm">
          <div class="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-blue-50 transition-transform group-hover:scale-110"></div>
          <p class="relative text-xs font-bold text-slate-400">إجمالي الوحدات</p>
          <div class="relative mt-2">
            <span class="text-2xl font-black text-slate-900">{{ units.length }}</span>
          </div>
        </div>

        <div class="group relative overflow-hidden rounded-xl border border-white bg-white p-4 shadow-sm">
          <div class="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-emerald-50 transition-transform group-hover:scale-110"></div>
          <p class="relative text-xs font-bold text-slate-400">وحدات متاحة</p>
          <div class="relative mt-2">
            <span class="text-2xl font-black text-emerald-600">{{ availableUnits }}</span>
          </div>
        </div>

        <div class="group relative overflow-hidden rounded-xl border border-white bg-white p-4 shadow-sm">
          <div class="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-amber-50 transition-transform group-hover:scale-110"></div>
          <p class="relative text-xs font-bold text-slate-400">وحدات مباعة</p>
          <div class="relative mt-2">
            <span class="text-2xl font-black text-amber-600">{{ soldUnits }}</span>
          </div>
        </div>

        <div class="group relative overflow-hidden rounded-xl border border-white bg-white p-4 shadow-sm">
          <div class="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-purple-50 transition-transform group-hover:scale-110"></div>
          <p class="relative text-xs font-bold text-slate-400">وحدات محجوزة</p>
          <div class="relative mt-2">
            <span class="text-2xl font-black text-purple-600">{{ reservedUnits }}</span>
          </div>
        </div>

        <div class="group relative overflow-hidden rounded-xl border border-white bg-white p-4 shadow-sm">
          <div class="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-rose-50 transition-transform group-hover:scale-110"></div>
          <p class="relative text-xs font-bold text-slate-400">إجمالي السعر</p>
          <div class="relative mt-2">
            <span class="text-lg font-black text-rose-600">{{ formatCurrency(totalPrice) }}</span>
          </div>
        </div>
      </div>

      <!-- Data Section -->
      <div class="rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden">
        
        <!-- Search Bar -->
        <div class="border-b border-slate-100 bg-slate-50/30 p-3">
          <div class="flex flex-col md:flex-row gap-3 justify-between items-center">
            <div class="relative w-full md:w-80">
              <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="ابحث برقم الوحدة أو المالك..."
                class="w-full rounded-lg border-slate-200 bg-white py-2 pl-3 pr-9 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              >
            </div>
            <div class="flex gap-2">
              <select v-model="statusFilter" class="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-sm">
                <option value="">جميع الحالات</option>
                <option value="available">متاحة</option>
                <option value="sold">مباعة</option>
                <option value="reserved">محجوزة</option>
              </select>
              <button class="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium hover:bg-slate-200 transition-colors">
                تصفية
              </button>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-20">
          <div class="relative h-12 w-12">
            <div class="relative h-12 w-12 animate-spin rounded-full border-3 border-slate-100 border-t-blue-600"></div>
          </div>
          <p class="mt-4 text-slate-500 text-sm">جاري التحميل...</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="filteredUnits.length === 0" class="flex flex-col items-center justify-center py-20 px-6 text-center">
          <div class="rounded-full bg-slate-50 p-6 text-slate-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <h3 class="mt-4 text-lg font-black text-slate-900">لا توجد وحدات</h3>
          <p class="mt-1 text-slate-500 text-sm">يمكنك إضافة وحدة جديدة بالضغط على الزر أعلاه</p>
        </div>

        <!-- Data Table -->
        <div v-else class="overflow-x-auto">
          <table class="w-full border-collapse min-w-[900px] text-sm">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200">
                <th class="px-3 py-3 text-right text-xs font-bold text-slate-600">#</th>
                <th class="px-3 py-3 text-right text-xs font-bold text-slate-600">رقم الوحدة</th>
                <th class="px-3 py-3 text-right text-xs font-bold text-slate-600">الدور</th>
                <th class="px-3 py-3 text-center text-xs font-bold text-slate-600">المساحة</th>
                <th class="px-3 py-3 text-right text-xs font-bold text-slate-600">السعر</th>
                <th class="px-3 py-3 text-center text-xs font-bold text-slate-600">الحالة</th>
                <th class="px-3 py-3 text-right text-xs font-bold text-slate-600">المالك</th>
                <th class="px-3 py-3 text-center text-xs font-bold text-slate-600">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(unit, index) in paginatedUnits" :key="unit.id" class="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
                <td class="px-3 py-3 text-slate-500 text-xs">{{ index + 1 + (currentPage - 1) * pageSize }}</td>
                <td class="px-3 py-3">
                  <div class="font-bold text-slate-800 text-sm">{{ unit.unit_number }}</div>
                  <div v-if="unit.description" class="text-xs text-slate-400 mt-0.5 max-w-[150px] truncate">{{ unit.description }}</div>
                </td>
                <td class="px-3 py-3 text-slate-600 text-xs">{{ unit.floor || '—' }}</td>
                <td class="px-3 py-3 text-center text-slate-600 text-xs">{{ unit.area || '—' }} م²</td>
                <td class="px-3 py-3 text-emerald-600 font-bold text-xs">{{ formatCurrency(unit.price) }}</td>
                <td class="px-3 py-3 text-center">
                  <span :class="[
                    'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold',
                    unit.status === 'available' ? 'bg-emerald-50 text-emerald-700' :
                    unit.status === 'sold' ? 'bg-amber-50 text-amber-700' :
                    'bg-purple-50 text-purple-700'
                  ]">
                    {{ getStatusText(unit.status) }}
                  </span>
                </td>
                <td class="px-3 py-3 text-slate-600 text-xs max-w-[120px] truncate">{{ unit.client_name || '—' }}</td>
                <td class="px-3 py-3 text-center">
                  <div class="flex items-center justify-center gap-1.5">
                    <button 
                      @click="editUnit(unit)" 
                      class="bg-amber-50 hover:bg-amber-100 text-amber-700 px-3 py-1.5 rounded-lg font-bold text-xs transition-all"
                    >
                      تعديل
                    </button>
                    <button 
                      @click="confirmDelete(unit.id)" 
                      class="bg-red-50 hover:bg-red-100 text-red-700 px-3 py-1.5 rounded-lg font-bold text-xs transition-all"
                    >
                      حذف
                    </button>
                  </div>
                </td>
               </tr>
            </tbody>
           </table>
        </div>

        <!-- Pagination -->
        <div v-if="filteredUnits.length > 0" class="border-t border-slate-200 px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-3 bg-slate-50/30">
          <div class="text-xs text-slate-500">
            عرض {{ (currentPage - 1) * pageSize + 1 }} - {{ Math.min(currentPage * pageSize, filteredUnits.length) }} من {{ filteredUnits.length }} وحدات
          </div>
          <div class="flex gap-1.5">
            <button 
              @click="currentPage--" 
              :disabled="currentPage === 1"
              class="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              السابق
            </button>
            <button 
              v-for="page in displayedPages" 
              :key="page"
              @click="currentPage = page"
              :class="[
                'w-8 h-8 rounded-lg text-xs font-medium transition-all',
                currentPage === page 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              ]"
            >
              {{ page }}
            </button>
            <button 
              @click="currentPage++" 
              :disabled="currentPage === totalPages"
              class="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              التالي
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Success/Error Toast -->
    <div v-if="showToast" :class="[
      'fixed bottom-6 left-6 z-50 px-5 py-3 rounded-xl text-white text-sm font-medium animate-slideIn',
      toastType === 'success' ? 'bg-emerald-500' : 'bg-red-500'
    ]">
      {{ toastMessage }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UnitsIndex',
  
  data() {
    return {
      units: [],
      loading: true,
      searchQuery: '',
      statusFilter: '',
      currentPage: 1,
      pageSize: 12,
      showToast: false,
      toastMessage: '',
      toastType: 'success'
    }
  },
  
  computed: {
    filteredUnits() {
      let result = this.units;
      
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(unit => 
          unit.unit_number?.toLowerCase().includes(query) ||
          unit.client_name?.toLowerCase().includes(query)
        );
      }
      
      if (this.statusFilter) {
        result = result.filter(unit => unit.status === this.statusFilter);
      }
      
      return result;
    },
    
    totalPages() {
      return Math.ceil(this.filteredUnits.length / this.pageSize);
    },
    
    paginatedUnits() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredUnits.slice(start, end);
    },
    
    displayedPages() {
      const total = this.totalPages;
      const current = this.currentPage;
      const delta = 2;
      const range = [];
      
      for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
        range.push(i);
      }
      
      if (current - delta > 2) {
        range.unshift('...');
      }
      if (current + delta < total - 1) {
        range.push('...');
      }
      
      range.unshift(1);
      if (total !== 1) range.push(total);
      
      return range;
    },
    
    availableUnits() {
      return this.units.filter(u => u.status === 'available').length;
    },
    
    soldUnits() {
      return this.units.filter(u => u.status === 'sold').length;
    },
    
    reservedUnits() {
      return this.units.filter(u => u.status === 'reserved').length;
    },
    
    totalPrice() {
      const total = this.units.reduce((acc, unit) => acc + (parseFloat(unit.price) || 0), 0);
      return total;
    }
  },
  
  watch: {
    searchQuery() {
      this.currentPage = 1;
    },
    statusFilter() {
      this.currentPage = 1;
    }
  },
  
  mounted() {
    this.fetchUnits();
  },
  
  methods: {
    formatCurrency(value) {
      if (!value || value === 0) return '0 ج.م';
      return new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' }).format(value);
    },
    
    getStatusText(status) {
      const texts = {
        available: 'متاحة',
        sold: 'مباعة',
        reserved: 'محجوزة'
      };
      return texts[status] || status;
    },
    
    async fetchUnits() {
      this.loading = true;
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/v1/units', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.data.success) {
          this.units = response.data.data;
        }
      } catch (error) {
        console.error('Error fetching units:', error);
        this.showMessage('فشل في تحميل الوحدات', 'error');
      } finally {
        setTimeout(() => { this.loading = false; }, 300);
      }
    },
    
    // ✅ التعديل هنا - الانتقال إلى صفحة التعديل
    editUnit(unit) {
      this.$router.push(`/units/${unit.id}`);
    },
    
    confirmDelete(id) {
      if (confirm('هل أنت متأكد من حذف هذه الوحدة؟ لا يمكن التراجع عن هذا الإجراء.')) {
        this.deleteUnit(id);
      }
    },
    
    async deleteUnit(id) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://127.0.0.1:8000/api/v1/units/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        await this.fetchUnits();
        this.showMessage('تم حذف الوحدة بنجاح', 'success');
      } catch (error) {
        console.error('Error:', error);
        this.showMessage('فشل حذف الوحدة', 'error');
      }
    },
    
    showMessage(message, type) {
      this.toastMessage = message;
      this.toastType = type;
      this.showToast = true;
      
      setTimeout(() => {
        this.showToast = false;
      }, 3000);
    }
  }
}
</script>

<style scoped>
.rtl {
  direction: rtl;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slideIn {
  animation: slideIn 0.3s ease-out;
}

.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
</style>