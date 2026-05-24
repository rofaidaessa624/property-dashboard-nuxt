<template>
  <div class="min-h-screen bg-slate-50/50 p-4 md:p-6 rtl" dir="rtl">
    <div class="w-full">
      <!-- Header -->
      <header class="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">قائمة العملاء</h1>
          <p class="text-slate-500 text-sm">جميع العملاء مع وحداتهم وأقساطهم</p>
        </div>
        <NuxtLink 
          to="/clients/add" 
          class="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-blue-700"
        >
          + إضافة عميل جديد
        </NuxtLink>
      <div class="flex gap-2">
  <button @click="exportToCSV" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-medium">
    تصدير CSV
  </button>
  <label class="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-xl text-sm font-medium cursor-pointer">
     استيراد CSV
    <input type="file" @change="importFromCSV" accept=".csv" class="hidden" />
  </label>
</div>
      </header>

      <!-- Table -->
      <div class="rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-slate-100 border-b border-slate-200">
              <tr>
                <th class="p-4 text-right font-bold text-slate-700">#</th>
                <th class="p-4 text-right font-bold text-slate-700">الاسم الكامل</th>
                <th class="p-4 text-right font-bold text-slate-700">الهاتف</th>
                <th class="p-4 text-right font-bold text-slate-700">الرقم القومي</th>
                <th class="p-4 text-right font-bold text-slate-700">اسم السمسار</th>
                <th class="p-4 text-right font-bold text-slate-700">رقم السمسار</th>
                <th class="p-4 text-right font-bold text-slate-700">عدد الوحدات</th>
                <th class="p-4 text-right font-bold text-slate-700">عدد الأقساط</th>
                <th class="p-4 text-right font-bold text-slate-700">الحالة</th>
                <th class="p-4 text-center font-bold text-slate-700">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading">
                <td colspan="10" class="p-8 text-center text-slate-500">
                  <div class="inline-block w-6 h-6 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin"></div>
                  <span class="mr-2">جاري التحميل...</span>
                </td>
              </tr>
              <tr v-else-if="clients.length === 0">
                <td colspan="10" class="p-8 text-center text-slate-500">لا يوجد عملاء حتى الآن</td>
              </tr>
              <tr v-else v-for="(client, index) in clients" :key="client.id" class="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td class="p-4 text-slate-600">{{ index + 1 }}</td>
                <td class="p-4 font-medium text-slate-800">{{ client.full_name }}</td>
                <td class="p-4 text-slate-600">{{ client.phone }} <span v-if="client.phone2" class="text-xs text-slate-400 block">ثانوي: {{ client.phone2 }}</span></td>
                <td class="p-4 text-slate-600">{{ client.national_id || '—' }}</td>
                <td class="p-4 text-slate-600">{{ client.broker_name || '—' }}</td>
                <td class="p-4 text-slate-600">{{ client.broker_phone || '—' }}</td>
                <td class="p-4">
                  <span class="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-xs font-semibold">
                    <span>🏢</span> {{ client.units?.length || 0 }}
                  </span>
                </td>
                <td class="p-4">
                  <span class="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2 py-1 rounded-lg text-xs font-semibold">
                    <span>📅</span> {{ client.installments?.length || 0 }}
                  </span>
                </td>
                <td class="p-4">
                  <span :class="client.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'" class="px-2 py-1 rounded-lg text-xs font-semibold">
                    {{ client.is_active ? 'نشط' : 'غير نشط' }}
                  </span>
                </td>
                <td class="p-4 text-center">
                  <div class="flex justify-center gap-2">
                    <NuxtLink :to="`/clients/${client.id}`" class="text-blue-600 hover:text-blue-800 transition-colors" title="عرض التفاصيل">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                    </NuxtLink>
                    <button @click="confirmDelete(client)" class="text-red-600 hover:text-red-800 transition-colors" title="حذف">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl max-w-md w-full p-6">
        <h3 class="text-lg font-bold text-slate-800 mb-4">تأكيد الحذف</h3>
        <p class="text-slate-600 mb-6">هل أنت متأكد من حذف العميل "{{ clientToDelete?.full_name }}"؟ لا يمكن التراجع عن هذا الإجراء.</p>
        <div class="flex justify-end gap-3">
          <button @click="showDeleteModal = false" class="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition">إلغاء</button>
          <button @click="deleteClient" class="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition">حذف</button>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <div v-if="toast.show" :class="[
      'fixed bottom-6 left-6 z-50 px-5 py-3 rounded-xl text-white text-sm font-medium animate-slideIn',
      toast.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
    ]">
      {{ toast.message }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ClientsList',
  data() {
    return {
      clients: [],
      loading: false,
      showDeleteModal: false,
      clientToDelete: null,
      toast: { show: false, message: '', type: 'success' }
    };
  },
  mounted() {
    this.fetchClients();
  },
  methods: {
    async fetchClients() {
      this.loading = true;
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://api.mawtin.net/api/v1/clients', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.data.success) {
          this.clients = response.data.data;
        } else {
          this.clients = [];
        }
      } catch (error) {
        console.error(error);
        this.showToast('فشل في تحميل العملاء', 'error');
      } finally {
        this.loading = false;
      }
    },
    confirmDelete(client) {
      this.clientToDelete = client;
      this.showDeleteModal = true;
    },
    async deleteClient() {
      if (!this.clientToDelete) return;
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`https://api.mawtin.net/api/v1/clients/${this.clientToDelete.id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        this.showToast('تم حذف العميل بنجاح', 'success');
        this.fetchClients();
      } catch (error) {
        this.showToast('حدث خطأ أثناء الحذف', 'error');
      } finally {
        this.showDeleteModal = false;
        this.clientToDelete = null;
      }
    },
    showToast(message, type) {
      this.toast = { show: true, message, type };
      setTimeout(() => { this.toast.show = false; }, 3000);
    },
   exportToCSV() {
  const token = localStorage.getItem('token');
  window.open(`https://api.mawtin.net/api/v1/clients/export-csv?token=${token}`, '_blank');
},

async importFromCSV(event) {
  const file = event.target.files[0];
  if (!file) return;
  const formData = new FormData();
  formData.append('file', file);
  const token = localStorage.getItem('token');
  try {
    const res = await axios.post('https://api.mawtin.net/api/v1/clients/import-csv', formData, {
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
    });
    this.showToast(res.data.message, 'success');
    this.fetchClients();
  } catch (error) {
    this.showToast('فشل الاستيراد', 'error');
  }
}
  }
};
</script>

<style scoped>
.rtl { direction: rtl; }
@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
.animate-slideIn { animation: slideIn 0.3s ease-out; }
</style>