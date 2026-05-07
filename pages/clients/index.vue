<template>
  <div class="min-h-screen bg-slate-50/50 p-4 md:p-8 rtl" dir="rtl">
    <!-- Main Content - Full Width (No max-w-7xl) -->
    <div class="w-full">
      
      <!-- Header Section -->
      <header class="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div class="space-y-1">
          <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">قائمة العملاء</h1>
          <p class="text-slate-500 font-medium">إدارة ومتابعة كافة بيانات العملاء والوحدات الخاصة بهم</p>
        </div>
        
        <NuxtLink 
          to="/clients/add" 
          class="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-blue-300 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          إضافة عميل جديد
        </NuxtLink>
      </header>

      <!-- Stats Grid - Full Width -->
      <div class="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        <div class="group relative overflow-hidden rounded-2xl border border-white bg-white p-6 shadow-sm transition-all hover:shadow-md">
          <div class="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-50 transition-transform group-hover:scale-110"></div>
          <p class="relative text-sm font-bold text-slate-500">إجمالي العملاء</p>
          <div class="relative mt-3 flex items-baseline gap-2">
            <span class="text-3xl font-black text-slate-900">{{ clients.length }}</span>
            <span class="text-sm font-medium text-slate-400">عميل</span>
          </div>
        </div>

        <div class="group relative overflow-hidden rounded-2xl border border-white bg-white p-6 shadow-sm transition-all hover:shadow-md">
          <div class="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-emerald-50 transition-transform group-hover:scale-110"></div>
          <p class="relative text-sm font-bold text-slate-500">العملاء النشطون</p>
          <div class="relative mt-3 flex items-baseline gap-2">
            <span class="text-3xl font-black text-emerald-600">{{ activeClients }}</span>
            <span class="text-sm font-medium text-slate-400">عميل</span>
          </div>
        </div>

        <div class="group relative overflow-hidden rounded-2xl border border-white bg-white p-6 shadow-sm transition-all hover:shadow-md">
          <div class="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-orange-50 transition-transform group-hover:scale-110"></div>
          <p class="relative text-sm font-bold text-slate-500">إجمالي الوحدات</p>
          <div class="relative mt-3 flex items-baseline gap-2">
            <span class="text-3xl font-black text-orange-600">{{ totalUnits }}</span>
            <span class="text-sm font-medium text-slate-400">وحدة</span>
          </div>
        </div>

        <div class="group relative overflow-hidden rounded-2xl border border-white bg-white p-6 shadow-sm transition-all hover:shadow-md">
          <div class="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-purple-50 transition-transform group-hover:scale-110"></div>
          <p class="relative text-sm font-bold text-slate-500">إجمالي الأقساط</p>
          <div class="relative mt-3 flex items-baseline gap-2">
            <span class="text-3xl font-black text-purple-600">{{ totalInstallments }}</span>
            <span class="text-sm font-medium text-slate-400">قسط</span>
          </div>
        </div>

        <div class="group relative overflow-hidden rounded-2xl border border-white bg-white p-6 shadow-sm transition-all hover:shadow-md">
          <div class="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-rose-50 transition-transform group-hover:scale-110"></div>
          <p class="relative text-sm font-bold text-slate-500">المبلغ الإجمالي</p>
          <div class="relative mt-3 flex items-baseline gap-2">
            <span class="text-2xl font-black text-rose-600">{{ totalAmount }}</span>
            <span class="text-sm font-medium text-slate-400">ج.م</span>
          </div>
        </div>
      </div>

      <!-- Data Section - Full Width without max-width -->
      <div class="rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 overflow-hidden">
        
        <!-- Search & Filter Bar -->
        <div class="border-b border-slate-100 bg-slate-50/30 p-5">
          <div class="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div class="relative w-full md:w-96">
              <span class="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="ابحث باسم العميل، الهاتف، البريد الإلكتروني، أو الرقم القومي..."
                class="w-full rounded-xl border-slate-200 bg-white py-3 pl-4 pr-12 text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              >
            </div>
            <div class="flex gap-2">
              <button class="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 text-sm font-medium hover:bg-slate-200 transition-colors">
                تصفية
              </button>
              <button class="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 text-sm font-medium hover:bg-slate-200 transition-colors">
                تصدير Excel
              </button>
            </div>
          </div>
        </div>

        <!-- Table Content - Full Width -->
        <div class="p-0 overflow-x-auto">
          <!-- Loading State -->
          <div v-if="loading" class="flex flex-col items-center justify-center py-32">
            <div class="relative h-16 w-16">
              <div class="absolute inset-0 animate-ping rounded-full bg-blue-400 opacity-20"></div>
              <div class="relative h-16 w-16 animate-spin rounded-full border-4 border-slate-100 border-t-blue-600"></div>
            </div>
            <p class="mt-6 text-slate-500 font-bold tracking-wide">جاري تحميل البيانات...</p>
          </div>

          <!-- Empty State -->
          <div v-else-if="filteredClients.length === 0" class="flex flex-col items-center justify-center py-32 px-6 text-center">
            <div class="rounded-full bg-slate-50 p-8 text-slate-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 class="mt-6 text-xl font-black text-slate-900">لا توجد نتائج</h3>
            <p class="mt-2 text-slate-500 font-medium">لم يتم العثور على عملاء مطابقين لبحثك</p>
          </div>

          <!-- Data Table - Full Width with good spacing -->
          <div v-else class="overflow-x-auto">
            <table class="w-full border-collapse min-w-[1000px]">
              <thead>
                <tr class="bg-slate-50 border-b-2 border-slate-200">
                  <th class="px-5 py-4 text-right text-sm font-bold text-slate-700">#</th>
                  <th class="px-5 py-4 text-right text-sm font-bold text-slate-700">اسم العميل</th>
                  <th class="px-5 py-4 text-right text-sm font-bold text-slate-700">البريد الإلكتروني</th>
                  <th class="px-5 py-4 text-right text-sm font-bold text-slate-700">رقم الهاتف</th>
                  <th class="px-5 py-4 text-right text-sm font-bold text-slate-700">الرقم القومي</th>
                  <th class="px-5 py-4 text-center text-sm font-bold text-slate-700">عدد الوحدات</th>
                  <th class="px-5 py-4 text-right text-sm font-bold text-slate-700">إجمالي الأقساط</th>
                  <th class="px-5 py-4 text-center text-sm font-bold text-slate-700">الحالة</th>
                  <th class="px-5 py-4 text-center text-sm font-bold text-slate-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(client, index) in paginatedClients" :key="client.id" class="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
                  <td class="px-5 py-4 text-slate-500 font-medium">{{ index + 1 + (currentPage - 1) * pageSize }}</td>
                  <td class="px-5 py-4">
                    <div>
                      <div class="font-bold text-slate-800">{{ client.full_name }}</div>
                      <div v-if="client.address" class="text-xs text-slate-400 mt-0.5">{{ client.address.substring(0, 30) }}...</div>
                    </div>
                  </td>
                  <td class="px-5 py-4 text-slate-600 text-sm">{{ client.email || '—' }}</td>
                  <td class="px-5 py-4 text-slate-600 font-mono text-sm">{{ client.phone || '—' }}</td>
                  <td class="px-5 py-4 text-slate-600 font-mono text-sm">{{ client.national_id || '—' }}</td>
                  <td class="px-5 py-4 text-center">
                    <span class="inline-flex items-center justify-center min-w-[40px] px-2 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-bold">
                      {{ client.units_count || 0 }}
                    </span>
                  </td>
                  <td class="px-5 py-4 text-emerald-600 font-bold text-sm">{{ formatCurrency(client.installments_total || 0) }}</td>
                  <td class="px-5 py-4 text-center">
                    <span :class="[
                      'inline-flex items-center px-2 py-1 rounded-full text-xs font-bold',
                      client.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                    ]">
                      {{ client.is_active ? 'نشط' : 'غير نشط' }}
                    </span>
                  </td>
                  <td class="px-5 py-4 text-center">
                    <div class="flex items-center justify-center gap-2">
                      <button 
                        @click="editClient(client)" 
                        class="bg-amber-50 hover:bg-amber-100 text-amber-700 px-4 py-2 rounded-xl font-bold text-sm transition-all"
                      >
                        تعديل
                      </button>
                      <button 
                        @click="confirmDelete(client.id)" 
                        class="bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2 rounded-xl font-bold text-sm transition-all"
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
          <div v-if="filteredClients.length > 0" class="border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/30">
            <div class="text-sm text-slate-500">
              عرض {{ (currentPage - 1) * pageSize + 1 }} - {{ Math.min(currentPage * pageSize, filteredClients.length) }} من {{ filteredClients.length }} عميل
            </div>
            <div class="flex gap-2">
              <button 
                @click="currentPage--" 
                :disabled="currentPage === 1"
                class="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
              >
                السابق
              </button>
              <div class="flex gap-1">
                <button 
                  v-for="page in displayedPages" 
                  :key="page"
                  @click="currentPage = page"
                  :class="[
                    'w-10 h-10 rounded-lg text-sm font-medium transition-all',
                    currentPage === page 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  ]"
                >
                  {{ page }}
                </button>
              </div>
              <button 
                @click="currentPage++" 
                :disabled="currentPage === totalPages"
                class="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
              >
                التالي
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ClientsIndex',
  
  data() {
    return {
      loading: true,
      clients: [],
      searchQuery: '',
      currentPage: 1,
      pageSize: 15,
      apiUrl: 'http://127.0.0.1:8000/api/v1/clients'
    }
  },

  computed: {
    filteredClients() {
      if (!this.searchQuery) return this.clients;
      const query = this.searchQuery.toLowerCase();
      return this.clients.filter(client => 
        client.full_name?.toLowerCase().includes(query) ||
        client.phone?.includes(query) ||
        client.national_id?.includes(query) ||
        client.email?.toLowerCase().includes(query)
      );
    },
    
    totalPages() {
      return Math.ceil(this.filteredClients.length / this.pageSize);
    },
    
    paginatedClients() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredClients.slice(start, end);
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
    
    totalUnits() {
      return this.clients.reduce((acc, client) => acc + (parseInt(client.units_count) || 0), 0);
    },
    
    activeClients() {
      return this.clients.filter(client => client.is_active === true || client.is_active === 1).length;
    },
    
    totalInstallments() {
      return this.clients.reduce((acc, client) => acc + (parseInt(client.installments_count) || 0), 0);
    },
    
    totalAmount() {
      const total = this.clients.reduce((acc, client) => acc + (parseFloat(client.installments_total) || 0), 0);
      return new Intl.NumberFormat('ar-EG').format(Math.round(total));
    }
  },
  
  watch: {
    searchQuery() {
      this.currentPage = 1;
    }
  },
  
  mounted() {
    this.fetchClients();
  },
  
  methods: {
    formatCurrency(value) {
      if (!value || value === 0) return '0 ج.م';
      return new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' }).format(value);
    },
    
    async fetchClients() {
      this.loading = true;
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(this.apiUrl, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.data?.success) {
          this.clients = response.data.data.map(client => ({
            ...client,
            installments_total: client.installments_total || 0,
            units_count: client.units_count || 0,
            installments_count: client.installments_count || 0
          }));
        }
      } catch (error) {
        console.error('Fetch Error:', error);
      } finally {
        setTimeout(() => { this.loading = false; }, 300);
      }
    },
    
editClient(client) {
  console.log('Editing client:', client.id);
  this.$router.push(`/clients/${client.id}`);
},

    confirmDelete(id) {
      if (confirm('هل أنت متأكد من حذف هذا العميل نهائياً؟ لا يمكن التراجع عن هذا الإجراء.')) {
        this.deleteClient(id);
      }
    },
    
    async deleteClient(id) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${this.apiUrl}/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        this.clients = this.clients.filter(c => c.id !== id);
      } catch (error) {
        console.error('Delete Error:', error);
        alert('فشل حذف العميل');
      }
    }
  }
}
</script>

<style scoped>
.rtl {
  direction: rtl;
}

/* تخصيص شريط التمرير */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* تحسين hover للصفوف */
tbody tr {
  transition: background-color 0.2s ease;
}

/* تنسيق الجدول في الشاشات الصغيرة */
@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  th, td {
    padding: 12px 8px;
  }
}
</style>