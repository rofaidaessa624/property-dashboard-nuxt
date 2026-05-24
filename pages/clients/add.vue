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
                  كلمة المرور <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="form.password" 
                  type="password" 
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  placeholder="********"
                  required
                />
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

          <!-- ========== 3. معلومات الوسيط (السمسار) ========== -->
          <div class="mb-8">
            <h3 class="text-base font-bold text-slate-800 pb-3 border-b-2 border-blue-500 flex items-center gap-2">
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
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  placeholder="رقم هاتف آخر"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">
                  اسم السمسار (اختياري)
                </label>
                <input 
                  v-model="form.broker_name" 
                  type="text" 
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  placeholder="مثال: محمد علي"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">
                  رقم هاتف السمسار (اختياري)
                </label>
                <input 
                  v-model="form.broker_phone" 
                  type="tel" 
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  placeholder="مثال: 01234567890"
                />
              </div>
            </div>
          </div>
          
          <!-- ========== 4. الوحدة والأقساط ========== -->
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
                    {{ unit.unit_number }} - {{ formatCurrency(unit.total_price) }} ({{ unit.area }} م²)
                  </option>
                </select>
                
                <div v-if="selectedUnit" class="mt-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                  <p class="text-sm"><span class="font-bold">سعر الوحدة:</span> {{ formatCurrency(selectedUnit.total_price) }}</p>
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
            
            <!-- معاينة الأقساط مع إمكانية تعديل المبلغ لكل قسط -->
            <div v-if="installmentsPreview.length > 0" class="mt-6">
              <div class="flex justify-between items-center mb-3">
                <h4 class="font-bold text-slate-700">📅 تفاصيل الأقساط (يمكنك تعديل كل مبلغ على حدة)</h4>
                <button type="button" @click="showInstallments = !showInstallments" class="text-xs text-blue-600 hover:text-blue-700 font-medium">
                  {{ showInstallments ? 'إخفاء التفاصيل' : 'عرض التفاصيل' }}
                </button>
              </div>
              
              <div v-if="showInstallments" class="border border-slate-200 rounded-xl overflow-hidden">
                <!-- جدول الأقساط -->
                <div class="overflow-x-auto">
                  <table class="w-full text-sm">
                    <thead class="bg-slate-100">
                      <tr>
                        <th class="p-3 text-right font-bold text-slate-700">رقم القسط</th>
                        <th class="p-3 text-right font-bold text-slate-700">المبلغ (ج.م)</th>
                        <th class="p-3 text-right font-bold text-slate-700">تاريخ الاستحقاق</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="inst in installmentsPreview" :key="inst.installment_number" class="border-t border-slate-100">
                        <td class="p-3 text-slate-600">{{ inst.installment_number }}</td>
                        <td class="p-3">
                          <input 
                            type="number" 
                            v-model.number="inst.amount"
                            class="w-32 px-2 py-1 border border-slate-200 rounded-lg text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-100 outline-none"
                            @input="updateTotalAmount"
                          />
                        </td>
                        <td class="p-3">
                          <input 
                            type="date" 
                            v-model="inst.due_date"
                            class="px-2 py-1 border border-slate-200 rounded-lg text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-100 outline-none"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <!-- ملخص الأقساط مع التحقق من إجمالي الأقساط -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3 p-3 border-t text-xs md:text-sm" :class="totalInstallmentsAmount === remainingAmount ? 'bg-blue-50' : 'bg-red-50'">
                  <div><span class="font-bold">المجموع الكلي للوحدة:</span> {{ formatCurrency(selectedUnit.total_price) }}</div>
                  <div><span class="font-bold">المقدم ({{ downPayment }}%):</span> {{ formatCurrency(downPaymentAmount) }}</div>
                  <div><span class="font-bold">المتبقي المطلوب:</span> {{ formatCurrency(remainingAmount) }}</div>
                  <div :class="totalInstallmentsAmount !== remainingAmount ? 'text-red-600 font-bold' : ''">
                    <span class="font-bold">إجمالي الأقساط المدخلة:</span> {{ formatCurrency(totalInstallmentsAmount) }}
                    <span v-if="Math.abs(totalInstallmentsAmount - remainingAmount) > 0.01" class="text-red-500 mr-2">⚠️ غير مطابق</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- ========== 5. صور الوحدة ========== -->
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
      showInstallments: true,
      uploadedImages: [],
      submitting: false,
      loading: false,
      showToast: false,
      toastMessage: '',
      toastType: 'success'
    }
  },
  
  computed: {
    downPaymentAmount() {
      if (!this.selectedUnit) return 0;
      return this.selectedUnit.total_price * (this.downPayment / 100);
    },
    remainingAmount() {
      if (!this.selectedUnit) return 0;
      return this.selectedUnit.total_price * (1 - this.downPayment / 100);
    },
    totalInstallmentsAmount() {
      if (!this.installmentsPreview.length) return 0;
      return this.installmentsPreview.reduce((sum, inst) => sum + (inst.amount || 0), 0);
    }
  },
  
  mounted() {
    this.fetchUnits();
  },
  
  methods: {
    formatCurrency(value) {
      if (!value && value !== 0) return '0 ج.م';
      return new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' }).format(value);
    },
    
    async fetchUnits() {
      this.loading = true;
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://api.mawtin.net/api/v1/units', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.data.data) {
          this.units = response.data.data;
        } else if (Array.isArray(response.data)) {
          this.units = response.data;
        } else if (response.data.units) {
          this.units = response.data.units;
        } else {
          this.units = [];
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
      
      // Default equal amount
      const defaultAmount = Math.round(this.remainingAmount / this.numberOfInstallments);
      
      let startDate = new Date();
      if (this.selectedUnit.start_date) {
        startDate = new Date(this.selectedUnit.start_date);
      }
      
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
      this.updateTotalAmount(); // just to update UI if needed
    },
    
    updateTotalAmount() {
      // This method is called when any amount changes
      // We can add validation or warning here
      this.$forceUpdate(); // ensure UI updates for the summary
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
        }
      });
    },
    
    removeImage(index) {
      this.uploadedImages.splice(index, 1);
    },
    
    async submitForm() {
      // Validation
      if (!this.form.full_name) {
        this.showMessage('الرجاء إدخال الاسم الكامل', 'error');
        return;
      }
      if (!this.form.phone) {
        this.showMessage('الرجاء إدخال رقم الهاتف', 'error');
        return;
      }
      if (!this.form.password) {
        this.showMessage('الرجاء إدخال كلمة المرور', 'error');
        return;
      }
      if (!this.selectedUnit) {
        this.showMessage('الرجاء اختيار الوحدة', 'error');
        return;
      }
      if (!this.numberOfInstallments || this.numberOfInstallments <= 0) {
        this.showMessage('الرجاء إدخال عدد الأقساط', 'error');
        return;
      }
      
      // Check that total installments amount matches remaining amount (with small tolerance)
      const diff = Math.abs(this.totalInstallmentsAmount - this.remainingAmount);
      if (diff > 0.01) {
        this.showMessage(`إجمالي الأقساط (${this.formatCurrency(this.totalInstallmentsAmount)}) لا يساوي المبلغ المتبقي (${this.formatCurrency(this.remainingAmount)}). الرجاء تعديل قيم الأقساط.`, 'error');
        return;
      }
      
      this.submitting = true;
      
      try {
        const token = localStorage.getItem('token');
        
        // 1. Create client
        const clientData = {
          full_name: this.form.full_name,
          phone: this.form.phone,
          phone2: this.form.phone2,
          national_id: this.form.national_id,
          password: this.form.password,
          address: this.form.address,
          gender: this.form.gender,
          broker_name: this.form.broker_name,
          broker_phone: this.form.broker_phone,
          is_active: true
        };
        
        const clientResponse = await axios.post('https://api.mawtin.net/api/v1/clients', clientData, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        const clientId = clientResponse.data.data?.id;
        if (!clientId) throw new Error('فشل في إنشاء العميل');
        
        // 2. Link client with unit
        const clientUnitData = {
          client_id: clientId,
          unit_id: this.selectedUnit.id,
          agreed_price: this.selectedUnit.total_price,
          paid_amount: this.downPaymentAmount,
          purchase_date: new Date().toISOString().split('T')[0],
          contract_status: 'active'
        };
        
        await axios.post('https://api.mawtin.net/api/v1/client-unit', clientUnitData, {
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        });
        
        // 3. Save installments (with custom amounts)
        for (const installment of this.installmentsPreview) {
          await axios.post('https://api.mawtin.net/api/v1/installments', {
            client_id: clientId,
            unit_id: this.selectedUnit.id,
            installment_number: installment.installment_number,
            amount: installment.amount,
            due_date: installment.due_date,
            status: 'pending',
            paid_amount: 0
          }, { headers: { 'Authorization': `Bearer ${token}` } });
        }
        
        // 4. Upload images if any
        if (this.uploadedImages.length > 0) {
          const formData = new FormData();
          this.uploadedImages.forEach((img, index) => {
            formData.append(`images[${index}]`, img.file);
            if (img.caption) formData.append(`captions[${index}]`, img.caption);
          });
          formData.append('unit_id', this.selectedUnit.id);
          
          await axios.post('https://api.mawtin.net/api/v1/unit-images', formData, {
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
          });
        }
        
        this.showMessage('تم إضافة العميل وربطه بالوحدة والأقساط بنجاح', 'success');
        setTimeout(() => this.$router.push('/clients'), 2000);
        
      } catch (error) {
        console.error('Error:', error);
        let message = 'حدث خطأ في حفظ البيانات';
        if (error.response?.data?.message) message = error.response.data.message;
        else if (error.response?.data?.errors) message = Object.values(error.response.data.errors).flat().join(', ');
        else if (error.message) message = error.message;
        this.showMessage(message, 'error');
      } finally {
        this.submitting = false;
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
@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
.animate-slideIn { animation: slideIn 0.3s ease-out; }
</style>