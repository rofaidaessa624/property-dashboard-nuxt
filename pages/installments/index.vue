<template>
  <div class="min-h-screen bg-slate-50/50 p-4 md:p-6 rtl" dir="rtl">
    <div class="w-full">
      <!-- Header -->
      <header class="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">الأقساط</h1>
          <p class="text-slate-500 text-sm">إدارة ومتابعة الأقساط والمدفوعات</p>
        </div>
        <NuxtLink 
          to="/installments/add" 
          class="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          إضافة قسط جديد
        </NuxtLink>
      </header>

      <!-- Stats Cards -->
      <div class="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <div class="group relative overflow-hidden rounded-xl border border-white bg-white p-4 shadow-sm">
          <div class="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-blue-50 transition-transform group-hover:scale-110"></div>
          <p class="relative text-xs font-bold text-slate-400">إجمالي الأقساط</p>
          <div class="relative mt-2">
            <span class="text-xl font-black text-slate-900">{{ formatCurrency(stats.total_amount) }}</span>
          </div>
        </div>

        <div class="group relative overflow-hidden rounded-xl border border-white bg-white p-4 shadow-sm">
          <div class="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-emerald-50 transition-transform group-hover:scale-110"></div>
          <p class="relative text-xs font-bold text-slate-400">المدفوع</p>
          <div class="relative mt-2">
            <span class="text-xl font-black text-emerald-600">{{ formatCurrency(stats.total_paid) }}</span>
          </div>
        </div>

        <div class="group relative overflow-hidden rounded-xl border border-white bg-white p-4 shadow-sm">
          <div class="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-rose-50 transition-transform group-hover:scale-110"></div>
          <p class="relative text-xs font-bold text-slate-400">المتبقي</p>
          <div class="relative mt-2">
            <span class="text-xl font-black text-rose-600">{{ formatCurrency(stats.total_amount - stats.total_paid) }}</span>
          </div>
        </div>

        <div class="group relative overflow-hidden rounded-xl border border-white bg-white p-4 shadow-sm">
          <div class="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-purple-50 transition-transform group-hover:scale-110"></div>
          <p class="relative text-xs font-bold text-slate-400">نسبة التحصيل</p>
          <div class="relative mt-2">
            <span class="text-xl font-black text-purple-600">{{ stats.collection_percentage }}%</span>
          </div>
        </div>
      </div>

      <!-- Data Section -->
      <div class="rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden">
        
        <!-- Search & Filter Bar -->
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
                placeholder="بحث باسم العميل أو رقم الوحدة..."
                class="w-full rounded-lg border-slate-200 bg-white py-2 pl-3 pr-9 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              />
            </div>
            <div class="flex gap-2">
              <select v-model="filters.status" class="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-sm">
                <option value="">جميع الحالات</option>
                <option value="pending">⏳ قيد الانتظار</option>
                <option value="paid">✅ مدفوع</option>
                <option value="overdue">⚠️ متأخر</option>
                <option value="partially_paid">🔄 مدفوع جزئياً</option>
              </select>
              <button @click="resetFilters" class="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium hover:bg-slate-200 transition-colors">
                إعادة تعيين
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
        <div v-else-if="filteredInstallments.length === 0" class="flex flex-col items-center justify-center py-20 px-6 text-center">
          <div class="rounded-full bg-slate-50 p-6 text-slate-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="mt-4 text-lg font-black text-slate-900">لا توجد أقساط</h3>
          <p class="mt-1 text-slate-500 text-sm">يمكنك إضافة قسط جديد بالضغط على الزر أعلاه</p>
        </div>

        <!-- Data Table -->
        <div v-else class="overflow-x-auto">
          <table class="w-full border-collapse min-w-[900px] text-sm">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200">
                <th class="px-3 py-3 text-right text-xs font-bold text-slate-600">#</th>
                <th class="px-3 py-3 text-right text-xs font-bold text-slate-600">العميل</th>
                <th class="px-3 py-3 text-right text-xs font-bold text-slate-600">الوحدة</th>
                <th class="px-3 py-3 text-center text-xs font-bold text-slate-600">رقم القسط</th>
                <th class="px-3 py-3 text-right text-xs font-bold text-slate-600">المبلغ</th>
                <th class="px-3 py-3 text-right text-xs font-bold text-slate-600">المدفوع</th>
                <th class="px-3 py-3 text-right text-xs font-bold text-slate-600">المتبقي</th>
                <th class="px-3 py-3 text-right text-xs font-bold text-slate-600">تاريخ الاستحقاق</th>
                <th class="px-3 py-3 text-center text-xs font-bold text-slate-600">الحالة</th>
                <th class="px-3 py-3 text-center text-xs font-bold text-slate-600">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(installment, index) in paginatedInstallments" :key="installment.id" class="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
                <td class="px-3 py-3 text-slate-500 text-xs">{{ index + 1 + (currentPage - 1) * pageSize }}</td>
                <td class="px-3 py-3">
                  <div class="font-bold text-slate-800 text-sm">{{ installment.client_name }}</div>
                  <div class="text-xs text-slate-400">{{ installment.client_phone }}</div>
                </td>
                <td class="px-3 py-3 text-slate-600 text-sm">{{ installment.unit_number }}</td>
                <td class="px-3 py-3 text-center text-slate-600 font-mono">{{ installment.installment_number }}</td>
                <td class="px-3 py-3 text-emerald-600 font-bold text-sm">{{ formatCurrency(installment.amount) }}</td>
                <td class="px-3 py-3 text-blue-600 font-bold text-sm">{{ formatCurrency(installment.paid_amount || 0) }}</td>
                <td class="px-3 py-3 text-rose-600 font-bold text-sm">{{ formatCurrency((installment.amount || 0) - (installment.paid_amount || 0)) }}</td>
                <td class="px-3 py-3 text-slate-600 text-xs">{{ formatDate(installment.due_date) }}</td>
                <td class="px-3 py-3 text-center">
                  <span :class="[
                    'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold',
                    installment.status === 'paid' ? 'bg-emerald-50 text-emerald-700' :
                    installment.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                    installment.status === 'overdue' ? 'bg-red-50 text-red-700' :
                    'bg-blue-50 text-blue-700'
                  ]">
                    {{ getStatusText(installment.status) }}
                  </span>
                </td>
                <td class="px-3 py-3 text-center">
                  <div class="flex items-center justify-center gap-1.5">
                    <NuxtLink :to="`/installments/${installment.id}`" class="bg-amber-50 hover:bg-amber-100 text-amber-700 px-3 py-1.5 rounded-lg font-bold text-xs transition-all">
                      تعديل
                    </NuxtLink>
                    <button @click="deleteInstallment(installment.id)" class="bg-red-50 hover:bg-red-100 text-red-700 px-3 py-1.5 rounded-lg font-bold text-xs transition-all">
                      حذف
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="filteredInstallments.length > 0" class="border-t border-slate-200 px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-3 bg-slate-50/30">
          <div class="text-xs text-slate-500">
            عرض {{ (currentPage - 1) * pageSize + 1 }} - {{ Math.min(currentPage * pageSize, filteredInstallments.length) }} من {{ filteredInstallments.length }} قسط
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
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'InstallmentsIndex',
  
  data() {
    return {
      installments: [],
      loading: true,
      searchQuery: '',
      currentPage: 1,
      pageSize: 10,
      filters: { status: '' },
      stats: { total_amount: 0, total_paid: 0, collection_percentage: 0 }
    }
  },
  
  computed: {
    filteredInstallments() {
      let result = [...this.installments];
      
      if (this.filters.status) {
        result = result.filter(i => i.status === this.filters.status);
      }
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(i => 
          i.client_name?.toLowerCase().includes(query) ||
          i.unit_number?.toLowerCase().includes(query)
        );
      }
      
      return result;
    },
    
    totalPages() {
      return Math.ceil(this.filteredInstallments.length / this.pageSize);
    },
    
    paginatedInstallments() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredInstallments.slice(start, end);
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
    }
  },
  
  watch: {
    searchQuery() {
      this.currentPage = 1;
    },
    'filters.status'() {
      this.currentPage = 1;
    }
  },
  
  mounted() {
    this.fetchInstallments();
  },
  
  methods: {
    formatCurrency(value) {
      if (!value || value === 0) return '0 ج.م';
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
    
    async fetchInstallments() {
      this.loading = true;
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/v1/installments', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.data.success) {
          this.installments = response.data.data;
          this.calculateStats();
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setTimeout(() => { this.loading = false; }, 300);
      }
    },
    
    calculateStats() {
      this.stats.total_amount = this.installments.reduce((sum, i) => sum + (i.amount || 0), 0);
      this.stats.total_paid = this.installments.reduce((sum, i) => sum + (i.paid_amount || 0), 0);
      this.stats.collection_percentage = this.stats.total_amount > 0 
        ? Math.round((this.stats.total_paid / this.stats.total_amount) * 100) 
        : 0;
    },
    
    resetFilters() {
      this.filters = { status: '' };
      this.searchQuery = '';
    },
    
    async deleteInstallment(id) {
      if (!confirm('هل أنت متأكد من حذف هذا القسط؟ لا يمكن التراجع عن هذا الإجراء.')) return;
      
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://127.0.0.1:8000/api/v1/installments/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        await this.fetchInstallments();
      } catch (error) {
        console.error('Error:', error);
        alert('فشل حذف القسط');
      }
    }
  }
}
</script>

<style scoped>
.rtl {
  direction: rtl;
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