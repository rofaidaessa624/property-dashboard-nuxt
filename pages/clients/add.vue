<template>
  <div class="min-h-screen bg-slate-50/50 p-4 md:p-6 rtl" dir="rtl">
    <div class="w-full">
      <!-- Header -->
      <header class="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">إضافة عميل جديد</h1>
          <p class="text-slate-500 text-sm">إضافة عميل جديد مع الوحدة والأقساط والصور</p>
        </div>
        <NuxtLink 
          to="/clients" 
          class="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-slate-700"
        >
          ← العودة للقائمة
        </NuxtLink>
      </header>

      <!-- Form Content -->
      <div class="rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden">
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
                  placeholder="أدخل الاسم الكامل"
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
                  placeholder="example@domain.com"
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
                  placeholder="01012345678"
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
                  placeholder="29501011234567"
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
                placeholder="أدخل العنوان الكامل (الشارع، المدينة، المنطقة...)"
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
                  اختيار الوحدة <span class="text-red-500">*</span>
                </label>
                <select v-model="selectedUnit" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all" @change="calculateInstallments">
                  <option value="">-- اختر الوحدة --</option>
                  <option v-for="unit in units" :key="unit.id" :value="unit">
                    {{ unit.unit_number }} - {{ formatCurrency(unit.price) }} ({{ unit.area }} م²)
                  </option>
                </select>
                
                <div v-if="selectedUnit" class="mt-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                  <p class="text-sm"><span class="font-bold">سعر الوحدة:</span> {{ formatCurrency(selectedUnit.price) }}</p>
                  <p class="text-sm mt-1"><span class="font-bold">المساحة:</span> {{ selectedUnit.area }} م²</p>
                  <p class="text-sm mt-1"><span class="font-bold">الموقع:</span> {{ selectedUnit.location || 'غير محدد' }}</p>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">
                  عدد الأقساط <span class="text-red-500">*</span>
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
                <p class="text-xs text-slate-400 mt-1">📌 الحد الأقصى 60 قسط</p>
              </div>
            </div>
            
            <!-- نسبة الدفعة المقدمة -->
            <div v-if="selectedUnit" class="mt-5">
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
            
            <!-- معاينة الأقساط -->
            <div v-if="installmentsPreview.length > 0" class="mt-6">
              <div class="flex justify-between items-center mb-3">
                <h4 class="font-bold text-slate-700">📅 تفاصيل الأقساط</h4>
                <button type="button" @click="showInstallments = !showInstallments" class="text-xs text-blue-600 hover:text-blue-700 font-medium">
                  {{ showInstallments ? 'إخفاء التفاصيل' : 'عرض التفاصيل' }}
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
          
          <!-- ========== 4. صور الوحدة ========== -->
          <div class="mb-8">
            <h3 class="text-base font-bold text-slate-800 pb-3 border-b-2 border-blue-500 flex items-center gap-2">
              <span>🖼️</span> صور الوحدة
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
            
            <!-- معاينة الصور -->
            <div v-if="uploadedImages.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-5">
              <div v-for="(img, index) in uploadedImages" :key="index" class="relative group">
                <img :src="img.preview" class="w-full h-32 object-cover rounded-xl border border-slate-200" />
                <button type="button" class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs hover:bg-red-600 transition-colors" @click="removeImage(index)">✖</button>
                <input v-model="img.caption" type="text" placeholder="وصف الصورة" class="w-full mt-2 px-2 py-1 text-xs border border-slate-200 rounded-lg focus:border-blue-400 outline-none" />
              </div>
            </div>
          </div>
          
          <!-- ========== 5. تطويرات الوحدة ========== -->
          <div class="mb-8">
            <h3 class="text-base font-bold text-slate-800 pb-3 border-b-2 border-blue-500 flex items-center gap-2">
              <span>📍</span> تطويرات الوحدة
            </h3>
            
            <div class="mt-5">
              <button type="button" class="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors" @click="addMilestone">
                + إضافة مرحلة تطوير جديدة
              </button>
            </div>
            
            <div v-for="(milestone, index) in milestones" :key="index" class="mt-4 p-5 bg-slate-50/50 rounded-xl border border-slate-200">
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
              <button type="button" class="mt-3 text-red-500 hover:text-red-600 text-sm font-medium" @click="removeMilestone(index)">
                حذف المرحلة
              </button>
            </div>
            
            <div v-if="milestones.length === 0" class="mt-4 p-8 text-center bg-slate-50/50 rounded-xl border border-dashed border-slate-300">
              <p class="text-slate-400 text-sm">📌 لا توجد مراحل تطوير. أضف المراحل لتتبع تقدم الوحدة.</p>
            </div>
          </div>
          
          <!-- ========== 6. أزرار الإجراءات ========== -->
          <div class="flex justify-end gap-3 pt-5 border-t border-slate-200">
            <NuxtLink to="/clients" class="px-6 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 transition-colors">
              إلغاء
            </NuxtLink>
            <button type="submit" class="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-md shadow-blue-200" :disabled="submitting">
              <span v-if="submitting">⏳ جاري الحفظ...</span>
              <span v-else>💾 حفظ البيانات</span>
            </button>
          </div>
        </form>
      </div>
    </div>
    
    <!-- Loading Overlay -->
    <div v-if="loading" class="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-50">
      <div class="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4"></div>
      <p class="text-white">جاري تحميل البيانات...</p>
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
  name: 'AddClient',
  
  data() {
    return {
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
      units: [],
      selectedUnit: null,
      numberOfInstallments: 0,
      downPayment: 20,
      installmentsPreview: [],
      showInstallments: true,
      uploadedImages: [],
      imageFiles: [],
      milestones: [],
      submitting: false,
      loading: false,
      showToast: false,
      toastMessage: '',
      toastType: 'success'
    }
  },
  
  computed: {
    totalInstallmentAmount() {
      if (!this.selectedUnit) return 0;
      return this.selectedUnit.price * (1 - this.downPayment / 100);
    },
    downPaymentAmount() {
      if (!this.selectedUnit) return 0;
      return this.selectedUnit.price * (this.downPayment / 100);
    },
    remainingAmount() {
      return this.totalInstallmentAmount;
    },
    monthlyInstallmentAmount() {
      if (!this.numberOfInstallments || this.numberOfInstallments <= 0) return 0;
      return this.totalInstallmentAmount / this.numberOfInstallments;
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
        this.loading = false;
      }
    },
    
    calculateInstallments() {
      if (!this.selectedUnit || !this.numberOfInstallments || this.numberOfInstallments <= 0) {
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
    
    addMilestone() {
      this.milestones.push({
        name: '',
        completion_date: '',
        status: 'pending',
        notes: ''
      });
    },
    
    removeMilestone(index) {
      this.milestones.splice(index, 1);
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
    
    async saveMilestones(unitId, token) {
      if (this.milestones.length === 0) return;
      
      for (const milestone of this.milestones) {
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
    
    async saveInstallments(clientId, unitId, token) {
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
    
    async submitForm() {
      this.submitting = true;
      
      try {
        const token = localStorage.getItem('token');
        
        const clientResponse = await axios.post('http://127.0.0.1:8000/api/v1/clients', this.form, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!clientResponse.data.success) {
          throw new Error('فشل في إنشاء العميل');
        }
        
        const clientId = clientResponse.data.data.id;
        let unitId = null;
        
        if (this.selectedUnit) {
          const unitResponse = await axios.post('http://127.0.0.1:8000/api/v1/units', {
            unit_number: this.selectedUnit.unit_number,
            price: this.selectedUnit.price,
            area: this.selectedUnit.area,
            location: this.selectedUnit.location || '',
            status: 'sold',
            client_id: clientId
          }, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          
          if (unitResponse.data.success) {
            unitId = unitResponse.data.data.id;
          }
        }
        
        if (unitId) {
          await this.saveInstallments(clientId, unitId, token);
        }
        
        if (unitId && this.imageFiles.length > 0) {
          await this.uploadImages(unitId, token);
        }
        
        if (unitId && this.milestones.length > 0) {
          await this.saveMilestones(unitId, token);
        }
        
        this.showMessage('تم إضافة العميل والوحدة والأقساط بنجاح', 'success');
        
        setTimeout(() => {
          this.$router.push('/clients');
        }, 2000);
        
      } catch (error) {
        console.error('Error:', error);
        const message = error.response?.data?.message || error.message || 'حدث خطأ في حفظ البيانات';
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