<template>
  <div class="min-h-screen bg-slate-50/50 p-4 md:p-6 rtl" dir="rtl">
    <div class="w-full">
      <!-- Header -->
      <header class="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">إضافة قسط جديد</h1>
          <p class="text-slate-500 text-sm">إضافة قسط جديد للعميل</p>
        </div>
        <NuxtLink 
          to="/installments" 
          class="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-slate-700"
        >
          ← العودة للقائمة
        </NuxtLink>
      </header>

      <!-- Form Content -->
      <div class="rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden">
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
                  {{ unit.unit_number }} - ({{ unit.total_price ? formatCurrency(unit.total_price) : formatCurrency(unit.price) }})
                </option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">
                رقم القسط <span class="text-red-500">*</span>
              </label>
              <input v-model.number="form.installment_number" type="number" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all" placeholder="1" required />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">
                المبلغ <span class="text-red-500">*</span>
              </label>
              <input v-model.number="form.amount" type="number" step="0.01" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all" placeholder="50000" required />
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
              <input v-model.number="form.paid_amount" type="number" step="0.01" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all" placeholder="0" />
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
            <button type="submit" class="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-md shadow-blue-200" :disabled="submitting">
              <span v-if="submitting">⏳ جاري الحفظ...</span>
              <span v-else>💾 حفظ القسط</span>
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
  name: 'AddInstallment',
  
  data() {
    return {
      clients: [],
      units: [],
      submitting: false,
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
    this.fetchClients();
    this.fetchUnits();
  },
  
  methods: {
    formatCurrency(value) {
      if (!value || value === 0) return '0 ج.م';
      return new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' }).format(value);
    },
    
    // ✅ جلب العملاء بمرونة (بدون الاعتماد على success)
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
        else if (data.success && Array.isArray(data.data)) clientsArray = data.data;
        
        this.clients = clientsArray;
      } catch (error) {
        console.error('Error fetching clients:', error);
        this.clients = [];
      }
    },
    
    // ✅ جلب الوحدات بمرونة (مع دعم السعر سواء total_price أو price)
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
        else if (data.success && Array.isArray(data.data)) unitsArray = data.data;
        
        this.units = unitsArray;
      } catch (error) {
        console.error('Error fetching units:', error);
        this.units = [];
      }
    },
    
    // ✅ إضافة قسط جديد (التحقق من المدخلات وإرسالها)
    async submitForm() {
      // تحقق من صحة الحقول
      if (!this.form.client_id) {
        this.showMessage('الرجاء اختيار العميل', 'error');
        return;
      }
      if (!this.form.unit_id) {
        this.showMessage('الرجاء اختيار الوحدة', 'error');
        return;
      }
      if (!this.form.installment_number || this.form.installment_number <= 0) {
        this.showMessage('الرجاء إدخال رقم قسط صحيح', 'error');
        return;
      }
      if (!this.form.amount || this.form.amount <= 0) {
        this.showMessage('الرجاء إدخال مبلغ صحيح', 'error');
        return;
      }
      if (!this.form.due_date) {
        this.showMessage('الرجاء اختيار تاريخ الاستحقاق', 'error');
        return;
      }
      
      this.submitting = true;
      
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
        
        const response = await axios.post('https://api.mawtin.net/api/v1/installments', payload, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        // نجاح العملية يعتمد على status code (2xx)
        if (response.status === 200 || response.status === 201) {
          this.showMessage('تم إضافة القسط بنجاح', 'success');
          setTimeout(() => {
            this.$router.push('/installments');
          }, 1500);
        } else {
          throw new Error('Unexpected response');
        }
      } catch (error) {
        console.error('Error adding installment:', error);
        let message = 'حدث خطأ في حفظ البيانات';
        if (error.response?.data?.message) {
          message = error.response.data.message;
        } else if (error.response?.data?.errors) {
          const errors = error.response.data.errors;
          message = Object.values(errors).flat().join(', ');
        }
        this.showMessage(message, 'error');
      } finally {
        this.submitting = false;
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