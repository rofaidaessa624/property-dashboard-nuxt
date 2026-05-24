<template>
  <div class="min-h-screen bg-slate-50/50 p-4 md:p-6 rtl" dir="rtl">
    <div class="w-full">
      <!-- Header -->
      <header class="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">تعديل قسط</h1>
          <p class="text-slate-500 text-sm">تعديل بيانات القسط رقم #{{ installmentId }}</p>
        </div>
        <NuxtLink 
          to="/installments" 
          class="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-slate-700"
        >
          ← العودة للقائمة
        </NuxtLink>
      </header>

      <!-- Loading State -->
      <div v-if="loading" class="rounded-2xl bg-white p-20 text-center">
        <div class="flex flex-col items-center justify-center">
          <div class="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <p class="text-slate-500">جاري تحميل بيانات القسط...</p>
        </div>
      </div>

      <!-- Form Content -->
      <div v-else class="rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden">
        <form @submit.prevent="submitForm" class="p-6">
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">
                العميل <span class="text-red-500">*</span>
              </label>
              <select v-model="form.client_id" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all" required>
                <option value="">-- اختر العميل --</option>
                <option v-for="client in clients" :key="client.id" :value="client.id">
                  {{ client.full_name }} - {{ client.phone }}
                </option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">
                الوحدة <span class="text-red-500">*</span>
              </label>
              <select v-model="form.unit_id" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all" required>
                <option value="">-- اختر الوحدة --</option>
                <option v-for="unit in units" :key="unit.id" :value="unit.id">
                  {{ unit.unit_number }} - ({{ unit.total_price ? formatCurrency(unit.total_price) : '' }})
                </option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">
                رقم القسط <span class="text-red-500">*</span>
              </label>
              <input v-model.number="form.installment_number" type="number" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all" required />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">
                المبلغ <span class="text-red-500">*</span>
              </label>
              <input v-model.number="form.amount" type="number" step="0.01" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all" required />
            </div> 
            
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">
                تاريخ الاستحقاق <span class="text-red-500">*</span>
              </label>
              <input v-model="form.due_date" type="date" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all" required />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">
                الحالة
              </label>
              <select v-model="form.status" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all">
                <option value="pending">⏳ قيد الانتظار</option>
                <option value="paid">✅ مدفوع</option>
                <option value="overdue">⚠️ متأخر</option>
                <option value="partially_paid">🔄 مدفوع جزئياً</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">
                المبلغ المدفوع
              </label>
              <input v-model.number="form.paid_amount" type="number" step="0.01" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all" />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">
                تاريخ الدفع
              </label>
              <input v-model="form.paid_date" type="date" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all" />
            </div>
            
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-slate-700 mb-1.5">
                ملاحظات
              </label>
              <textarea v-model="form.notes" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none" rows="3" placeholder="ملاحظات إضافية..."></textarea>
            </div>
          </div>
          
          <div class="flex justify-end gap-3 pt-5 mt-5 border-t border-slate-200">
            <NuxtLink to="/installments" class="px-6 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 transition-colors">
              إلغاء
            </NuxtLink>
            <button type="submit" class="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-md shadow-blue-200" :disabled="updating">
              <span v-if="updating">⏳ جاري التحديث...</span>
              <span v-else>💾 تحديث القسط</span>
            </button>
          </div>
        </form>
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
  name: 'EditInstallment',
  
  data() {
    return {
      installmentId: null,
      clients: [],
      units: [],
      loading: true,
      updating: false,
      showToast: false,
      toastMessage: '',
      toastType: 'success',
      form: {
        client_id: '',
        unit_id: '',
        installment_number: '',
        amount: '',
        due_date: '',
        status: 'pending',
        paid_amount: 0,
        paid_date: '',
        notes: ''
      }
    }
  },
  
  mounted() {
    this.installmentId = this.$route.params.id;
    if (this.installmentId) {
      this.fetchInstallment();
      this.fetchClients();
      this.fetchUnits();
    } else {
      this.showMessage('معرف القسط غير صالح', 'error');
      setTimeout(() => {
        this.$router.push('/installments');
      }, 1500);
    }
  },
  
  methods: {
    formatCurrency(value) {
      if (!value || value === 0) return '0 ج.م';
      return new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' }).format(value);
    },
    
    // ✅ جلب بيانات القسط مع مرونة للـ API
    async fetchInstallment() {
      this.loading = true;
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://api.mawtin.net/api/v1/installments/${this.installmentId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        // استخراج البيانات بغض النظر عن المفتاح success أو غيرها
        let data = response.data;
        if (data.success && data.data) {
          data = data.data;
        } else if (data.data && !data.success) {
          data = data.data;
        }
        
        this.form = {
          client_id: data.client_id || '',
          unit_id: data.unit_id || '',
          installment_number: data.installment_number || '',
          amount: data.amount || '',
          due_date: data.due_date ? data.due_date.split('T')[0] : '',
          status: data.status || 'pending',
          paid_amount: data.paid_amount || 0,
          paid_date: data.paid_date ? data.paid_date.split('T')[0] : '',
          notes: data.notes || ''
        };
      } catch (error) {
        console.error('Error:', error);
        this.showMessage('فشل في تحميل بيانات القسط', 'error');
        setTimeout(() => {
          this.$router.push('/installments');
        }, 1500);
      } finally {
        this.loading = false;
      }
    },
    
    // ✅ جلب العملاء مع مرونة للـ API
    async fetchClients() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://api.mawtin.net/api/v1/clients', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        let clientsArray = [];
        const data = response.data;
        if (Array.isArray(data)) clientsArray = data;
        else if (data.data && Array.isArray(data.data)) clientsArray = data.data;
        else if (data.data && data.data.data && Array.isArray(data.data.data)) clientsArray = data.data.data;
        
        this.clients = clientsArray;
      } catch (error) {
        console.error('Error fetching clients:', error);
        this.clients = [];
      }
    },
    
    // ✅ جلب الوحدات مع مرونة للـ API
    async fetchUnits() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://api.mawtin.net/api/v1/units', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        let unitsArray = [];
        const data = response.data;
        if (Array.isArray(data)) unitsArray = data;
        else if (data.data && Array.isArray(data.data)) unitsArray = data.data;
        else if (data.data && data.data.data && Array.isArray(data.data.data)) unitsArray = data.data.data;
        
        this.units = unitsArray;
      } catch (error) {
        console.error('Error fetching units:', error);
        this.units = [];
      }
    },
    
    // ✅ تحديث القسط مع التأكد من تحويل البيانات
    async submitForm() {
      // التحقق من صحة المدخلات
      if (!this.form.client_id) {
        this.showMessage('الرجاء اختيار العميل', 'error');
        return;
      }
      if (!this.form.unit_id) {
        this.showMessage('الرجاء اختيار الوحدة', 'error');
        return;
      }
      if (!this.form.installment_number) {
        this.showMessage('الرجاء إدخال رقم القسط', 'error');
        return;
      }
      if (!this.form.amount || this.form.amount <= 0) {
        this.showMessage('الرجاء إدخال مبلغ صحيح', 'error');
        return;
      }
      
      this.updating = true;
      try {
        const token = localStorage.getItem('token');
        const payload = {
          client_id: this.form.client_id,
          unit_id: this.form.unit_id,
          installment_number: this.form.installment_number,
          amount: this.form.amount,
          due_date: this.form.due_date,
          status: this.form.status,
          paid_amount: this.form.paid_amount || 0,
          paid_date: this.form.paid_date || null,
          notes: this.form.notes || null
        };
        
        const response = await axios.put(`https://api.mawtin.net/api/v1/installments/${this.installmentId}`, payload, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        // أي رد ناجح (status 2xx) يعني نجاح
        if (response.status === 200 || response.status === 201) {
          this.showMessage('تم تحديث القسط بنجاح', 'success');
          setTimeout(() => {
            this.$router.push('/installments');
          }, 1500);
        } else {
          throw new Error('Unexpected response');
        }
      } catch (error) {
        console.error('Error updating:', error);
        const message = error.response?.data?.message || error.response?.data?.errors || 'حدث خطأ في تحديث البيانات';
        this.showMessage(message, 'error');
      } finally {
        this.updating = false;
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
.rtl { direction: rtl; }
@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
.animate-slideIn { animation: slideIn 0.3s ease-out; }
</style>