<template>
  <div class="min-h-screen bg-slate-50/50 p-4 md:p-6 rtl" dir="rtl">
    <div class="w-full">
      <!-- Header -->
      <header class="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">تعديل عميل</h1>
          <p class="text-slate-500 text-sm">تعديل بيانات العميل والوحدة والأقساط</p>
        </div>
        <NuxtLink 
          to="/clients" 
          class="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-slate-700"
        >
          ← العودة للقائمة
        </NuxtLink>
      </header>

      <!-- Loading State -->
      <div v-if="loading" class="rounded-2xl bg-white p-20 text-center">
        <div class="flex flex-col items-center justify-center">
          <div class="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <p class="text-slate-500">جاري تحميل بيانات العميل...</p>
        </div>
      </div>

      <!-- Form Content -->
      <div v-else class="rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden">
        <form @submit.prevent="submitForm" class="p-6">
          
          <!-- ========== 1. المعلومات الأساسية ========== -->
          <div class="mb-8">
            <h3 class="text-base font-bold text-slate-800 pb-3 border-b-2 border-emerald-500 flex items-center gap-2">
              <span>📋</span> المعلومات الأساسية
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">
                  الاسم الكامل <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="form.full_name" 
                  type="text" 
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
                  required
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">
                  رقم الهاتف <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="form.phone" 
                  type="tel" 
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
                  required
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">
                  الرقم القومي
                </label>
                <input 
                  v-model="form.national_id" 
                  type="text" 
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
                  readonly
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">
                  النوع
                </label>
                <select v-model="form.gender" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition-all">
                  <option value="">اختر النوع</option>
                  <option value="male">ذكر</option>
                  <option value="female">أنثى</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">
                  كلمة المرور (اتركها فارغة إذا لم ترد تغييرها)
                </label>
                <input 
                  v-model="form.password" 
                  type="password" 
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
                  placeholder="********"
                />
              </div>
            </div>
          </div>
          
          <!-- ========== 2. العنوان ========== -->
          <div class="mb-8">
            <h3 class="text-base font-bold text-slate-800 pb-3 border-b-2 border-emerald-500 flex items-center gap-2">
              <span>📍</span> معلومات العنوان
            </h3>
            
            <div class="mt-5">
              <label class="block text-sm font-medium text-slate-700 mb-1.5">
                العنوان
              </label>
              <textarea 
                v-model="form.address" 
                class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition-all resize-none"
                rows="3"
              ></textarea>
            </div>
          </div>

          <!-- ========== 3. معلومات الوسيط (السمسار) ========== -->
          <div class="mb-8">
            <h3 class="text-base font-bold text-slate-800 pb-3 border-b-2 border-emerald-500 flex items-center gap-2">
              <span>🤝</span> معلومات الوسيط (السمسار)
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">
                  رقم هاتف إضافي (اختياري)
                </label>
                <input 
                  v-model="form.phone2" 
                  type="tel" 
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
                  placeholder="رقم هاتف آخر"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">
                  اسم السمسار
                </label>
                <input 
                  v-model="form.broker_name" 
                  type="text" 
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
                  placeholder="مثال: محمد علي"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">
                  رقم هاتف السمسار
                </label>
                <input 
                  v-model="form.broker_phone" 
                  type="tel" 
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
                  placeholder="مثال: 01234567890"
                />
              </div>
            </div>
          </div>
          
          <!-- ========== 4. الوحدة والأقساط ========== -->
          <div class="mb-8">
            <h3 class="text-base font-bold text-slate-800 pb-3 border-b-2 border-emerald-500 flex items-center gap-2">
              <span>🏢</span> معلومات الوحدة والأقساط
            </h3>

            <!-- إذا كان العميل يملك وحدة بالفعل -->
            <div v-if="currentUnit" class="mt-5">
              <div class="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 mb-5">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p><span class="font-bold">رقم الوحدة:</span> {{ currentUnit.unit_number }}</p>
                  <p><span class="font-bold">المشروع:</span> {{ currentUnit.project_name || 'غير محدد' }}</p>
                  <p><span class="font-bold">السعر:</span> {{ formatCurrency(currentUnit.total_price) }}</p>
                  <p><span class="font-bold">المساحة:</span> {{ currentUnit.area }} م²</p>
                  <p><span class="font-bold">الموقع:</span> {{ currentUnit.location }}</p>
                  <p><span class="font-bold">الحالة:</span> 
                    <span :class="currentUnit.status === 'sold' ? 'text-emerald-600' : 'text-amber-600'">
                      {{ currentUnit.status === 'sold' ? 'مبيعة' : 'متاحة' }}
                    </span>
                  </p>
                </div>
              </div>

              <!-- تعديل الأقساط -->
              <div class="border-t pt-5">
                <h4 class="font-bold text-slate-700 mb-3">تعديل الأقساط</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1.5">نسبة الدفعة المقدمة (%)</label>
                    <input v-model.number="downPayment" type="number" class="w-full md:w-64 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition-all" @input="calculateInstallments" min="0" max="100" />
                  </div>
                </div>
                <div v-if="installmentsPreview.length" class="mt-6">
                  <div class="overflow-x-auto">
                    <table class="w-full text-sm">
                      <thead class="bg-slate-50"><tr><th>#</th><th>المبلغ</th><th>التاريخ</th></tr></thead>
                      <tbody>
                        <tr v-for="inst in installmentsPreview" :key="inst.installment_number">
                          <td>{{ inst.installment_number }}</td>
                          <td><input type="number" v-model.number="inst.amount" class="w-24 px-2 py-1 border rounded" /></td>
                          <td><input type="date" v-model="inst.due_date" class="px-2 py-1 border rounded" /></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-3 p-3 border-t text-xs" :class="totalInstallmentsAmount === remainingAmount ? 'bg-blue-50' : 'bg-red-50'">
                    <div><span class="font-bold">الإجمالي:</span> {{ formatCurrency(currentUnit.total_price) }}</div>
                    <div><span class="font-bold">المقدم:</span> {{ formatCurrency(downPaymentAmount) }}</div>
                    <div><span class="font-bold">المتبقي:</span> {{ formatCurrency(remainingAmount) }}</div>
                    <div :class="totalInstallmentsAmount !== remainingAmount ? 'text-red-600 font-bold' : ''">
                      <span class="font-bold">الأقساط:</span> {{ formatCurrency(totalInstallmentsAmount) }}
                      <span v-if="Math.abs(totalInstallmentsAmount - remainingAmount) > 0.01">⚠️</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- إذا لم يكن لديه وحدة -->
            <div v-else class="mt-5">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1.5">اختيار الوحدة <span class="text-red-500">*</span></label>
                  <select v-model="selectedUnit" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition-all" @change="calculateInstallments">
                    <option value="">-- اختر الوحدة --</option>
                    <option v-for="unit in units" :key="unit.id" :value="unit">{{ unit.unit_number }} - {{ formatCurrency(unit.total_price) }}</option>
                  </select>
                  <div v-if="selectedUnit" class="mt-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                    <p class="text-sm"><span class="font-bold">سعر الوحدة:</span> {{ formatCurrency(selectedUnit.total_price) }}</p>
                    <p class="text-sm mt-1"><span class="font-bold">المساحة:</span> {{ selectedUnit.area }} م²</p>
                    <p class="text-sm mt-1"><span class="font-bold">الموقع:</span> {{ selectedUnit.location || 'غير محدد' }}</p>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1.5">عدد الأقساط <span class="text-red-500">*</span></label>
                  <input v-model.number="numberOfInstallments" type="number" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition-all" @input="calculateInstallments" min="1" max="60" />
                </div>
              </div>
              <div v-if="selectedUnit" class="mt-5">
                <label class="block text-sm font-medium text-slate-700 mb-1.5">نسبة الدفعة المقدمة (%)</label>
                <input v-model.number="downPayment" type="number" class="w-full md:w-64 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition-all" @input="calculateInstallments" min="0" max="100" />
              </div>
              <div v-if="installmentsPreview.length > 0" class="mt-6">
                <div class="overflow-x-auto">
                  <table class="w-full text-sm">
                    <thead class="bg-slate-100"><tr><th>#</th><th>المبلغ</th><th>التاريخ</th></tr></thead>
                    <tbody>
                      <tr v-for="inst in installmentsPreview" :key="inst.installment_number">
                        <td>{{ inst.installment_number }}</td>
                        <td><input type="number" v-model.number="inst.amount" class="w-32 px-2 py-1 border rounded" /></td>
                        <td><input type="date" v-model="inst.due_date" class="px-2 py-1 border rounded" /></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3 p-3 border-t text-xs" :class="totalInstallmentsAmount === remainingAmount ? 'bg-blue-50' : 'bg-red-50'">
                  <div><span class="font-bold">الإجمالي:</span> {{ formatCurrency(selectedUnit.total_price) }}</div>
                  <div><span class="font-bold">المقدم:</span> {{ formatCurrency(downPaymentAmount) }}</div>
                  <div><span class="font-bold">المتبقي:</span> {{ formatCurrency(remainingAmount) }}</div>
                  <div :class="totalInstallmentsAmount !== remainingAmount ? 'text-red-600 font-bold' : ''">
                    <span class="font-bold">الأقساط:</span> {{ formatCurrency(totalInstallmentsAmount) }}
                    <span v-if="Math.abs(totalInstallmentsAmount - remainingAmount) > 0.01">⚠️</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ========== ✅ 5. تطورات الوحدة (الجديد) ========== -->
          <div class="mb-8" v-if="currentUnit">
            <h3 class="text-base font-bold text-slate-800 pb-3 border-b-2 border-purple-500 flex items-center gap-2">
              <span>✅</span> تطورات الوحدة
            </h3>
            
            <div v-if="unitUpdates.length > 0" class="space-y-3 mt-5">
              <div v-for="update in unitUpdates" :key="update.id" class="p-4 bg-purple-50/30 rounded-xl border border-purple-100">
                <p class="text-slate-700 font-medium">{{ update.update_text }}</p>
                <p class="text-xs text-slate-400 mt-2">{{ formatDate(update.created_at) }}</p>
                <div v-if="update.images && update.images.length > 0" class="flex gap-2 mt-3 flex-wrap">
                  <img 
                    v-for="(img, idx) in update.images" 
                    :key="idx" 
                    :src="'https://api.mawtin.net/storage/' + img.path" 
                    class="w-20 h-20 object-cover rounded-lg border border-slate-200 shadow-sm" 
                  />
                </div>
              </div>
            </div>
            <div v-else class="mt-5 p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
              <p class="text-slate-400">لا توجد تطورات مسجلة لهذه الوحدة</p>
            </div>
          </div>
          
          <!-- ========== 6. أزرار الإجراءات ========== -->
          <div class="flex justify-end gap-3 pt-5 border-t border-slate-200">
            <NuxtLink to="/clients" class="px-6 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 transition-colors">
              إلغاء
            </NuxtLink>
            <button type="submit" class="px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-200" :disabled="updating">
              <span v-if="updating">⏳ جاري التحديث...</span>
              <span v-else>💾 حفظ التغييرات</span>
            </button>
          </div>
        </form>
      </div>
    </div>
    
    <!-- Toast -->
    <div v-if="showToast" :class="['fixed bottom-6 left-6 z-50 px-5 py-3 rounded-xl text-white text-sm font-medium animate-slideIn', toastType === 'success' ? 'bg-emerald-500' : 'bg-red-500']">
      {{ toastMessage }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EditClient',
  data() {
    return {
      clientId: null,
      loading: true,
      updating: false,
      showToast: false,
      toastMessage: '',
      toastType: 'success',
      
      form: {
        id: null,
        full_name: '',
        phone: '',
        phone2: '',
        national_id: '',
        address: '',
        gender: '',
        password: '',
        broker_name: '',
        broker_phone: ''
      },
      
      units: [],
      selectedUnit: null,
      numberOfInstallments: 0,
      downPayment: 20,
      installmentsPreview: [],
      
      currentUnit: null,
      existingInstallments: [],
      unitUpdates: []
    }
  },
  computed: {
    downPaymentAmount() {
      const unit = this.currentUnit || this.selectedUnit;
      if (!unit) return 0;
      return unit.total_price * (this.downPayment / 100);
    },
    remainingAmount() {
      const unit = this.currentUnit || this.selectedUnit;
      if (!unit) return 0;
      return unit.total_price * (1 - this.downPayment / 100);
    },
    totalInstallmentsAmount() {
      return this.installmentsPreview.reduce((sum, inst) => sum + (inst.amount || 0), 0);
    }
  },
  mounted() {
    this.clientId = this.$route.params.id;
    if (this.clientId) {
      this.fetchClientData();
    } else {
      this.showMessage('معرف العميل غير صالح', 'error');
      setTimeout(() => this.$router.push('/clients'), 1500);
    }
  },
  methods: {
    formatCurrency(value) {
      if (!value) return '0 ج.م';
      return new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' }).format(value);
    },
    formatDate(date) {
      if (!date) return '';
      return new Date(date).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
    },
    async fetchUnits() {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://api.mawtin.net/api/v1/units', { headers: { Authorization: `Bearer ${token}` } });
        if (res.data.data) this.units = res.data.data;
        else if (Array.isArray(res.data)) this.units = res.data;
      } catch (e) {
        console.error('Error fetching units:', e);
      }
    },
    calculateInstallments() {
      const unit = this.currentUnit || this.selectedUnit;
      if (!unit || !this.numberOfInstallments || this.numberOfInstallments <= 0) {
        this.installmentsPreview = [];
        return;
      }
      const defaultAmount = Math.round(this.remainingAmount / this.numberOfInstallments);
      const startDate = new Date();
      const preview = [];
      for (let i = 1; i <= this.numberOfInstallments; i++) {
        const dueDate = new Date(startDate);
        dueDate.setMonth(startDate.getMonth() + i);
        preview.push({
          installment_number: i,
          amount: defaultAmount,
          due_date: dueDate.toISOString().split('T')[0],
          status: 'pending'
        });
      }
      this.installmentsPreview = preview;
    },
    async fetchClientData() {
      this.loading = true;
      try {
        const token = localStorage.getItem('token');
        const clientRes = await axios.get(`https://api.mawtin.net/api/v1/clients/${this.clientId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!clientRes.data.data) {
          this.showMessage('بيانات العميل غير موجودة', 'error');
          return;
        }
        const client = clientRes.data.data;
        this.form = {
          id: client.id,
          full_name: client.full_name,
          phone: client.phone,
          phone2: client.phone2 || '',
          national_id: client.national_id || '',
          address: client.address || '',
          gender: client.gender || '',
          password: '',
          broker_name: client.broker_name || '',
          broker_phone: client.broker_phone || ''
        };

        if (client.units && client.units.length > 0) {
          this.currentUnit = client.units[0];
          this.existingInstallments = client.installments || [];
          this.numberOfInstallments = this.existingInstallments.length;
          const paid = this.currentUnit.pivot?.paid_amount || 0;
          const total = this.currentUnit.pivot?.agreed_price || this.currentUnit.total_price;
          this.downPayment = total > 0 ? Math.round((paid / total) * 100) : 20;
          this.installmentsPreview = this.existingInstallments.map(inst => ({
            installment_number: inst.installment_number,
            amount: inst.amount,
            due_date: inst.due_date,
            status: inst.status
          }));

          // ✅ جلب تطورات الوحدة
          try {
            const updatesRes = await axios.get(`https://api.mawtin.net/api/v1/units/${this.currentUnit.id}/updates`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            if (updatesRes.data.success && updatesRes.data.data) {
              this.unitUpdates = updatesRes.data.data;
            }
          } catch (e) {
            console.warn('تعذر جلب تطورات الوحدة:', e);
          }
        } else {
          await this.fetchUnits();
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        this.showMessage('فشل في تحميل البيانات', 'error');
      } finally {
        this.loading = false;
      }
    },
    async submitForm() {
      this.updating = true;
      try {
        const token = localStorage.getItem('token');
        const updateData = {
          full_name: this.form.full_name,
          phone: this.form.phone,
          phone2: this.form.phone2,
          address: this.form.address,
          gender: this.form.gender,
          broker_name: this.form.broker_name,
          broker_phone: this.form.broker_phone
        };
        if (this.form.password && this.form.password.trim() !== '') {
          updateData.password = this.form.password;
        }
        await axios.put(`https://api.mawtin.net/api/v1/clients/${this.clientId}`, updateData, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
        });

        if (this.currentUnit) {
          const installIds = this.existingInstallments.map(i => i.id);
          for (const id of installIds) {
            await axios.delete(`https://api.mawtin.net/api/v1/installments/${id}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
          }
          for (const inst of this.installmentsPreview) {
            await axios.post('https://api.mawtin.net/api/v1/installments', {
              client_id: this.clientId,
              unit_id: this.currentUnit.id,
              installment_number: inst.installment_number,
              amount: inst.amount,
              due_date: inst.due_date,
              status: 'pending',
              paid_amount: 0
            }, { headers: { Authorization: `Bearer ${token}` } });
          }
          await axios.post('https://api.mawtin.net/api/v1/client-unit', {
            client_id: this.clientId,
            unit_id: this.currentUnit.id,
            agreed_price: this.currentUnit.total_price,
            paid_amount: this.downPaymentAmount,
            purchase_date: new Date().toISOString().split('T')[0],
            contract_status: 'active'
          }, { headers: { Authorization: `Bearer ${token}` } });
        } else if (this.selectedUnit) {
          await axios.post('https://api.mawtin.net/api/v1/client-unit', {
            client_id: this.clientId,
            unit_id: this.selectedUnit.id,
            agreed_price: this.selectedUnit.total_price,
            paid_amount: this.downPaymentAmount,
            purchase_date: new Date().toISOString().split('T')[0],
            contract_status: 'active'
          }, { headers: { Authorization: `Bearer ${token}` } });
          for (const inst of this.installmentsPreview) {
            await axios.post('https://api.mawtin.net/api/v1/installments', {
              client_id: this.clientId,
              unit_id: this.selectedUnit.id,
              installment_number: inst.installment_number,
              amount: inst.amount,
              due_date: inst.due_date,
              status: 'pending',
              paid_amount: 0
            }, { headers: { Authorization: `Bearer ${token}` } });
          }
        }

        this.showMessage('تم تحديث بيانات العميل بنجاح', 'success');
        setTimeout(() => this.$router.push('/clients'), 2000);
      } catch (error) {
        console.error('Error updating:', error);
        let message = 'حدث خطأ في تحديث البيانات';
        if (error.response?.data?.message) message = error.response.data.message;
        else if (error.response?.data?.errors) message = Object.values(error.response.data.errors).flat().join(', ');
        this.showMessage(message, 'error');
      } finally {
        this.updating = false;
      }
    },
    showMessage(message, type) {
      this.toastMessage = message;
      this.toastType = type;
      this.showToast = true;
      setTimeout(() => { this.showToast = false; }, 3000);
    }
  }
}
</script>

<style scoped>
.rtl { direction: rtl; }
@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
.animate-slideIn { animation: slideIn 0.3s ease-out; }
</style>