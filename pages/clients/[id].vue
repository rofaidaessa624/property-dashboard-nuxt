<template>
  <div class="min-h-screen bg-slate-50/50 p-4 md:p-6 rtl" dir="rtl">
    <div class="w-full">
      <!-- Header -->
      <header class="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">تعديل عميل</h1>
          <p class="text-slate-500 text-sm">تعديل بيانات العميل والوحدة والأقساط والصور</p>
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
            <h3 class="text-base font-bold text-slate-800 pb-3 border-b-2 border-blue-500 flex items-center gap-2">
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
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  required
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">
                  البريد الإلكتروني <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="form.email" 
                  type="email" 
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
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
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
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
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">
                  النوع
                </label>
                <select v-model="form.gender" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all">
                  <option value="">اختر النوع</option>
                  <option value="male">ذكر</option>
                  <option value="female">أنثى</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">
                  الحالة
                </label>
                <select v-model="form.is_active" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all">
                  <option :value="true">نشط</option>
                  <option :value="false">غير نشط</option>
                </select>
              </div>
            </div>
          </div>
          
          <!-- ========== 2. العنوان ========== -->
          <div class="mb-8">
            <h3 class="text-base font-bold text-slate-800 pb-3 border-b-2 border-blue-500 flex items-center gap-2">
              <span>📍</span> معلومات العنوان
            </h3>
            
            <div class="mt-5">
              <label class="block text-sm font-medium text-slate-700 mb-1.5">
                العنوان
              </label>
              <textarea 
                v-model="form.address" 
                class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                rows="3"
              ></textarea>
            </div>
          </div>
          
          <!-- ========== 3. الوحدة والأقساط ========== -->
          <div class="mb-8">
            <h3 class="text-base font-bold text-slate-800 pb-3 border-b-2 border-blue-500 flex items-center gap-2">
              <span>🏢</span> معلومات الوحدة والأقساط
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">
                  اختيار الوحدة
                </label>
                <select v-model="selectedUnitId" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all">
                  <option value="">-- اختر الوحدة --</option>
                  <option v-for="unit in availableUnits" :key="unit.id" :value="unit.id">
                    {{ unit.unit_number }} - {{ formatCurrency(unit.price) }} ({{ unit.area }} م²)
                  </option>
                </select>
                
                <!-- الوحدة المختارة حالياً -->
                <div v-if="currentUnit && !selectedUnitId" class="mt-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                  <p class="text-sm"><span class="font-bold">الوحدة الحالية:</span> {{ currentUnit.unit_number }}</p>
                  <p class="text-sm"><span class="font-bold">السعر:</span> {{ formatCurrency(currentUnit.price) }}</p>
                  <p class="text-sm"><span class="font-bold">المساحة:</span> {{ currentUnit.area }} م²</p>
                </div>
                
                <!-- الوحدة المختارة جديدة -->
                <div v-if="newSelectedUnit" class="mt-3 p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                  <p class="text-sm font-bold text-emerald-700">الوحدة الجديدة:</p>
                  <p class="text-sm">{{ newSelectedUnit.unit_number }} - {{ formatCurrency(newSelectedUnit.price) }}</p>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">
                  عدد الأقساط الجديدة
                </label>
                <input 
                  v-model.number="numberOfInstallments" 
                  type="number" 
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  placeholder="مثال: 12"
                  min="1"
                  max="60"
                  @input="calculateInstallments"
                />
                <p class="text-xs text-slate-400 mt-1">📌 أضف أقساط جديدة للوحدة</p>
              </div>
            </div>
            
            <!-- نسبة الدفعة المقدمة للأقساط الجديدة -->
            <div v-if="newSelectedUnit && numberOfInstallments > 0" class="mt-5">
              <label class="block text-sm font-medium text-slate-700 mb-1.5">
                نسبة الدفعة المقدمة (%)
              </label>
              <input 
                v-model.number="downPayment" 
                type="number" 
                class="w-full md:w-64 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                placeholder="مثال: 20"
                min="0"
                max="100"
                @input="calculateInstallments"
              />
            </div>
            
            <!-- معاينة الأقساط الجديدة -->
            <div v-if="installmentsPreview.length > 0" class="mt-6">
              <div class="flex justify-between items-center mb-3">
                <h4 class="font-bold text-slate-700">📅 تفاصيل الأقساط الجديدة</h4>
                <button type="button" @click="showInstallments = !showInstallments" class="text-xs text-blue-600 hover:text-blue-700 font-medium">
                  {{ showInstallments ? 'إخفاء' : 'عرض' }} التفاصيل
                </button>
              </div>
              
              <div v-if="showInstallments" class="border border-slate-200 rounded-xl overflow-hidden">
                <div class="grid grid-cols-3 gap-2 bg-slate-100 p-3 text-sm font-bold text-slate-700">
                  <div>رقم القسط</div>
                  <div>المبلغ</div>
                  <div>تاريخ الاستحقاق</div>
                </div>
                <div v-for="inst in installmentsPreview" :key="inst.installment_number" class="grid grid-cols-3 gap-2 p-3 border-t border-slate-100 text-sm text-slate-600">
                  <div>{{ inst.installment_number }}</div>
                  <div>{{ formatCurrency(inst.amount) }}</div>
                  <div>{{ inst.due_date }}</div>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3 bg-blue-50 p-3 border-t border-blue-100 text-xs md:text-sm">
                  <div><span class="font-bold">المجموع الكلي:</span> {{ formatCurrency(totalInstallmentAmount) }}</div>
                  <div><span class="font-bold">المقدم ({{ downPayment }}%):</span> {{ formatCurrency(downPaymentAmount) }}</div>
                  <div><span class="font-bold">المتبقي:</span> {{ formatCurrency(remainingAmount) }}</div>
                  <div><span class="font-bold">القسط الشهري:</span> {{ formatCurrency(monthlyInstallmentAmount) }}</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- ========== 4. صور الوحدة (إضافة جديدة) ========== -->
          <div class="mb-8">
            <h3 class="text-base font-bold text-slate-800 pb-3 border-b-2 border-blue-500 flex items-center gap-2">
              <span>🖼️</span> إضافة صور جديدة للوحدة
            </h3>
            
            <div class="mt-5 border-2 border-dashed border-slate-300 rounded-xl p-6 text-center bg-slate-50/30 hover:border-blue-400 transition-colors cursor-pointer" @dragover.prevent @drop.prevent="handleDrop" @click="$refs.fileInput.click()">
              <input 
                type="file" 
                ref="fileInput"
                multiple 
                accept="image/*"
                @change="handleFileSelect"
                style="display: none;"
              />
              <div class="text-4xl mb-2">📸</div>
              <p class="text-slate-500 text-sm">اسحب الصور هنا أو انقر للاختيار</p>
              <p class="text-slate-400 text-xs mt-1">يمكنك اختيار عدة صور دفعة واحدة</p>
            </div>
            
            <!-- معاينة الصور الجديدة -->
            <div v-if="uploadedImages.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-5">
              <div v-for="(img, index) in uploadedImages" :key="index" class="relative group">
                <img :src="img.preview" class="w-full h-32 object-cover rounded-xl border border-slate-200" />
                <button type="button" class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs hover:bg-red-600 transition-colors" @click="removeImage(index)">✖</button>
                <input v-model="img.caption" type="text" placeholder="وصف الصورة" class="w-full mt-2 px-2 py-1 text-xs border border-slate-200 rounded-lg focus:border-blue-400 outline-none" />
              </div>
            </div>
          </div>
          
          <!-- ========== 5. تطويرات الوحدة (إضافة جديدة) ========== -->
          <div class="mb-8">
            <h3 class="text-base font-bold text-slate-800 pb-3 border-b-2 border-blue-500 flex items-center gap-2">
              <span>📍</span> إضافة تطويرات جديدة للوحدة
            </h3>
            
            <div class="mt-5">
              <button type="button" class="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors" @click="addMilestone">
                + إضافة مرحلة تطوير جديدة
              </button>
            </div>
            
            <div v-for="(milestone, index) in newMilestones" :key="index" class="mt-4 p-5 bg-slate-50/50 rounded-xl border border-slate-200">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-xs font-medium text-slate-600 mb-1">اسم المرحلة</label>
                  <input v-model="milestone.name" type="text" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-blue-400 outline-none" placeholder="أعمال الحفر" />
                </div>
                <div>
                  <label class="block text-xs font-medium text-slate-600 mb-1">تاريخ الإنجاز</label>
                  <input v-model="milestone.completion_date" type="date" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-blue-400 outline-none" />
                </div>
                <div>
                  <label class="block text-xs font-medium text-slate-600 mb-1">الحالة</label>
                  <select v-model="milestone.status" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-blue-400 outline-none">
                    <option value="pending">⏳ قيد الانتظار</option>
                    <option value="in_progress">⚙️ قيد التنفيذ</option>
                    <option value="completed">✅ منجز</option>
                    <option value="delayed">⚠️ متأخر</option>
                  </select>
                </div>
              </div>
              <div class="mt-3">
                <label class="block text-xs font-medium text-slate-600 mb-1">ملاحظات</label>
                <textarea v-model="milestone.notes" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-blue-400 outline-none resize-none" rows="2" placeholder="تفاصيل إضافية..."></textarea>
              </div>
              <button type="button" class="mt-3 text-red-500 hover:text-red-600 text-sm font-medium" @click="removeNewMilestone(index)">
                حذف المرحلة
              </button>
            </div>
            
            <div v-if="newMilestones.length === 0" class="mt-4 p-8 text-center bg-slate-50/50 rounded-xl border border-dashed border-slate-300">
              <p class="text-slate-400 text-sm">📌 لا توجد مراحل تطوير جديدة. أضف مراحل لتتبع تقدم الوحدة.</p>
            </div>
          </div>
          
          <!-- ========== 6. الأقساط الموجودة ========== -->
          <div class="mb-8">
            <h3 class="text-base font-bold text-slate-800 pb-3 border-b-2 border-blue-500 flex items-center gap-2">
              <span>💰</span> الأقساط الحالية
            </h3>
            
            <div class="mt-5">
              <div v-if="existingInstallments.length > 0" class="overflow-x-auto">
                <table class="w-full text-sm">
                  <thead class="bg-slate-50">
                    <tr>
                      <th class="px-3 py-2 text-right">رقم القسط</th>
                      <th class="px-3 py-2 text-right">المبلغ</th>
                      <th class="px-3 py-2 text-right">تاريخ الاستحقاق</th>
                      <th class="px-3 py-2 text-center">الحالة</th>
                      <th class="px-3 py-2 text-right">المدفوع</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="inst in existingInstallments" :key="inst.id" class="border-b border-slate-100">
                      <td class="px-3 py-2">{{ inst.installment_number }}</td>
                      <td class="px-3 py-2">{{ formatCurrency(inst.amount) }}</td>
                      <td class="px-3 py-2">{{ inst.due_date }}</td>
                      <td class="px-3 py-2 text-center">
                        <span :class="[
                          'px-2 py-0.5 rounded-full text-xs font-bold',
                          inst.status === 'paid' ? 'bg-emerald-100 text-emerald-700' :
                          inst.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        ]">
                          {{ getStatusText(inst.status) }}
                        </span>
                      </td>
                      <td class="px-3 py-2">{{ formatCurrency(inst.paid_amount || 0) }}</td>
                     </tr>
                  </tbody>
                </table>
              </div>
              <div v-else class="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
                <p class="text-slate-400">لا توجد أقساط مسجلة لهذا العميل</p>
              </div>
            </div>
          </div>
          
          <!-- ========== 7. أزرار الإجراءات ========== -->
          <div class="flex justify-end gap-3 pt-5 border-t border-slate-200">
            <NuxtLink to="/clients" class="px-6 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 transition-colors">
              إلغاء
            </NuxtLink>
            <button type="submit" class="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-md shadow-blue-200" :disabled="updating">
              <span v-if="updating">⏳ جاري التحديث...</span>
              <span v-else>💾 حفظ التغييرات</span>
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
  name: 'EditClient',
  
  data() {
    return {
      // Basic
      clientId: null,
      loading: true,
      updating: false,
      showToast: false,
      toastMessage: '',
      toastType: 'success',
      
      // Client form
      form: {
        id: null,
        full_name: '',
        email: '',
        phone: '',
        national_id: '',
        address: '',
        gender: '',
        is_active: true
      },
      
      // Units
      availableUnits: [],
      currentUnit: null,
      selectedUnitId: '',
      newSelectedUnit: null,
      
      // Installments
      existingInstallments: [],
      numberOfInstallments: 0,
      downPayment: 20,
      installmentsPreview: [],
      showInstallments: true,
      
      // Images
      uploadedImages: [],
      imageFiles: [],
      
      // New Milestones
      newMilestones: []
    }
  },
  
  computed: {
    totalInstallmentAmount() {
      if (!this.newSelectedUnit) return 0;
      return this.newSelectedUnit.price * (1 - this.downPayment / 100);
    },
    downPaymentAmount() {
      if (!this.newSelectedUnit) return 0;
      return this.newSelectedUnit.price * (this.downPayment / 100);
    },
    remainingAmount() {
      return this.totalInstallmentAmount;
    },
    monthlyInstallmentAmount() {
      if (!this.numberOfInstallments || this.numberOfInstallments <= 0) return 0;
      return this.totalInstallmentAmount / this.numberOfInstallments;
    }
  },
  
  watch: {
    selectedUnitId(val) {
      if (val) {
        this.newSelectedUnit = this.availableUnits.find(u => u.id == val);
        this.calculateInstallments();
      } else {
        this.newSelectedUnit = null;
        this.installmentsPreview = [];
      }
    }
  },
  
  mounted() {
    this.clientId = this.$route.params.id;
    if (this.clientId) {
      this.fetchAllData();
    } else {
      this.showMessage('معرف العميل غير صالح', 'error');
      setTimeout(() => {
        this.$router.push('/clients');
      }, 1500);
    }
  },
  
  methods: {
    formatCurrency(value) {
      if (!value || value === 0) return '0 ج.م';
      return new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' }).format(value);
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
    
    async fetchAllData() {
      this.loading = true;
      try {
        const token = localStorage.getItem('token');
        
        // 1. جلب بيانات العميل
        const clientRes = await axios.get(`http://127.0.0.1:8000/api/v1/clients/${this.clientId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (clientRes.data.success) {
          this.form = clientRes.data.data;
        }
        
        // 2. جلب الوحدات المتاحة
        const unitsRes = await axios.get('http://127.0.0.1:8000/api/v1/units', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (unitsRes.data.success) {
          this.availableUnits = unitsRes.data.data;
        }
        
        // 3. جلب وحدات العميل الحالية
        const clientUnitsRes = await axios.get(`http://127.0.0.1:8000/api/v1/units?client_id=${this.clientId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (clientUnitsRes.data.success && clientUnitsRes.data.data.length > 0) {
          this.currentUnit = clientUnitsRes.data.data[0];
        }
        
        // 4. جلب الأقساط الحالية
        const installmentsRes = await axios.get(`http://127.0.0.1:8000/api/v1/installments?client_id=${this.clientId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (installmentsRes.data.success) {
          this.existingInstallments = installmentsRes.data.data;
        }
        
      } catch (error) {
        console.error('Error fetching data:', error);
        this.showMessage('فشل في تحميل البيانات', 'error');
      } finally {
        this.loading = false;
      }
    },
    
    calculateInstallments() {
      if (!this.newSelectedUnit || !this.numberOfInstallments || this.numberOfInstallments <= 0) {
        this.installmentsPreview = [];
        return;
      }
      
      const monthlyAmount = this.monthlyInstallmentAmount;
      const startDate = new Date();
      const preview = [];
      
      for (let i = 1; i <= this.numberOfInstallments; i++) {
        const dueDate = new Date(startDate);
        dueDate.setMonth(startDate.getMonth() + i);
        
        preview.push({
          installment_number: i,
          amount: Math.round(monthlyAmount),
          due_date: dueDate.toISOString().split('T')[0],
          status: 'pending'
        });
      }
      
      this.installmentsPreview = preview;
    },
    
    // Image Methods
    handleFileSelect(event) {
      const files = Array.from(event.target.files);
      this.processFiles(files);
    },
    
    handleDrop(event) {
      const files = Array.from(event.dataTransfer.files);
      this.processFiles(files);
    },
    
    processFiles(files) {
      files.forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.uploadedImages.push({
              file: file,
              preview: e.target.result,
              caption: '',
              order: this.uploadedImages.length
            });
          };
          reader.readAsDataURL(file);
          this.imageFiles.push(file);
        }
      });
    },
    
    removeImage(index) {
      this.uploadedImages.splice(index, 1);
      this.imageFiles.splice(index, 1);
    },
    
    // Milestone Methods
    addMilestone() {
      this.newMilestones.push({
        name: '',
        completion_date: '',
        status: 'pending',
        notes: ''
      });
    },
    
    removeNewMilestone(index) {
      this.newMilestones.splice(index, 1);
    },
    
    async uploadImages(unitId, token) {
      if (this.imageFiles.length === 0) return;
      
      const formData = new FormData();
      this.imageFiles.forEach((file, index) => {
        formData.append('images[]', file);
        if (this.uploadedImages[index]?.caption) {
          formData.append(`captions[${index}]`, this.uploadedImages[index].caption);
        }
      });
      formData.append('unit_id', unitId);
      
      await axios.post('http://127.0.0.1:8000/api/v1/unit-images', formData, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
    },
    
    async saveNewMilestones(unitId, token) {
      if (this.newMilestones.length === 0) return;
      
      for (const milestone of this.newMilestones) {
        await axios.post('http://127.0.0.1:8000/api/v1/unit-milestones', {
          unit_id: unitId,
          name: milestone.name,
          completion_date: milestone.completion_date,
          status: milestone.status,
          notes: milestone.notes
        }, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
      }
    },
    
    async saveNewInstallments(clientId, unitId, token) {
      if (!unitId || this.installmentsPreview.length === 0) return;
      
      for (const installment of this.installmentsPreview) {
        await axios.post('http://127.0.0.1:8000/api/v1/installments', {
          client_id: clientId,
          unit_id: unitId,
          installment_number: installment.installment_number,
          amount: installment.amount,
          due_date: installment.due_date,
          status: 'pending'
        }, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
      }
    },
    
    // Main Submit
    async submitForm() {
      this.updating = true;
      
      try {
        const token = localStorage.getItem('token');
        
        // 1. تحديث بيانات العميل
        await axios.put(`http://127.0.0.1:8000/api/v1/clients/${this.clientId}`, this.form, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        let unitId = this.currentUnit?.id;
        
        // 2. إذا تم اختيار وحدة جديدة
        if (this.selectedUnitId && this.selectedUnitId != this.currentUnit?.id) {
          const unitRes = await axios.post('http://127.0.0.1:8000/api/v1/units', {
            unit_number: this.newSelectedUnit.unit_number,
            price: this.newSelectedUnit.price,
            area: this.newSelectedUnit.area,
            location: this.newSelectedUnit.location || '',
            status: 'sold',
            client_id: this.clientId
          }, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          
          if (unitRes.data.success) {
            unitId = unitRes.data.data.id;
          }
        }
        
        // 3. حفظ الأقساط الجديدة
        if (unitId && this.installmentsPreview.length > 0) {
          await this.saveNewInstallments(this.clientId, unitId, token);
        }
        
        // 4. رفع الصور الجديدة
        if (unitId && this.imageFiles.length > 0) {
          await this.uploadImages(unitId, token);
        }
        
        // 5. حفظ التطويرات الجديدة
        if (unitId && this.newMilestones.length > 0) {
          await this.saveNewMilestones(unitId, token);
        }
        
        this.showMessage('تم تحديث البيانات بنجاح', 'success');
        
        setTimeout(() => {
          this.$router.push('/clients');
        }, 1500);
        
      } catch (error) {
        console.error('Error updating:', error);
        this.showMessage('حدث خطأ في تحديث البيانات', 'error');
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
</style>