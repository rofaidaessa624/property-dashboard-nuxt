<template>
  <div class="min-h-screen bg-slate-50/50 p-4 md:p-6 rtl" dir="rtl">
    <div class="w-full">
      <!-- Header -->
      <header class="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">إضافة وحدة جديدة</h1>
          <p class="text-slate-500 text-sm">إضافة وحدة سكنية جديدة إلى النظام</p>
        </div>
        <NuxtLink 
          to="/units" 
          class="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-slate-700"
        >
          ← العودة للقائمة
        </NuxtLink>
      </header>

      <!-- Form Content -->
      <div class="rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden">
        <form @submit.prevent="submitForm" class="p-6">
          
          <!-- معلومات الوحدة -->
          <div class="mb-8">
            <h3 class="text-base font-bold text-slate-800 pb-3 border-b-2 border-blue-500 flex items-center gap-2">
              <span>🏢</span> معلومات الوحدة
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">
                  رقم الوحدة <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="form.unit_number" 
                  type="text" 
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  placeholder="مثال: B101"
                  required
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">
                  الدور
                </label>
                <input 
                  v-model="form.floor" 
                  type="number" 
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  placeholder="مثال: 3"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">
                  المساحة (م²)
                </label>
                <input 
                  v-model="form.area" 
                  type="number" 
                  step="0.01"
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  placeholder="مثال: 120.5"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">
                  السعر <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="form.price" 
                  type="number" 
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  placeholder="مثال: 850000"
                  required
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">
                  الحالة
                </label>
                <select v-model="form.status" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all">
                  <option value="available">🟢 متاحة</option>
                  <option value="sold">🔴 مباعة</option>
                  <option value="reserved">🟡 محجوزة</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">
                  الموقع
                </label>
                <input 
                  v-model="form.location" 
                  type="text" 
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  placeholder="المبنى - الطابق"
                />
              </div>
              
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-slate-700 mb-1.5">
                  وصف الوحدة
                </label>
                <textarea 
                  v-model="form.description" 
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                  rows="4"
                  placeholder="وصف تفصيلي للوحدة (الغرف، التشطيبات، الإطلالة...)"
                ></textarea>
              </div>
            </div>
          </div>
          
          <!-- صور الوحدة -->
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
          
          <!-- أزرار الإجراءات -->
          <div class="flex justify-end gap-3 pt-5 border-t border-slate-200">
            <NuxtLink to="/units" class="px-6 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 transition-colors">
              إلغاء
            </NuxtLink>
            <button type="submit" class="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-md shadow-blue-200" :disabled="submitting">
              <span v-if="submitting">⏳ جاري الحفظ...</span>
              <span v-else>💾 حفظ الوحدة</span>
            </button>
          </div>
        </form>
      </div>
    </div>
    
    <!-- Loading Overlay -->
    <div v-if="loading" class="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-50">
      <div class="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4"></div>
      <p class="text-white">جاري التحميل...</p>
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
  name: 'AddUnit',
  
  data() {
    return {
      form: {
        unit_number: '',
        floor: '',
        area: '',
        price: '',
        status: 'available',
        location: '',
        description: ''
      },
      uploadedImages: [],
      imageFiles: [],
      submitting: false,
      loading: false,
      showToast: false,
      toastMessage: '',
      toastType: 'success'
    }
  },
  
  methods: {
    formatCurrency(value) {
      if (!value) return '0 ج.م';
      return new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' }).format(value);
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
    
    async submitForm() {
      this.submitting = true;
      
      try {
        const token = localStorage.getItem('token');
        
        // Create Unit
        const response = await axios.post('http://127.0.0.1:8000/api/v1/units', this.form, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.data.success) {
          const unitId = response.data.data.id;
          
          // Upload Images
          if (this.imageFiles.length > 0) {
            await this.uploadImages(unitId, token);
          }
          
          this.showMessage('تم إضافة الوحدة بنجاح', 'success');
          
          setTimeout(() => {
            this.$router.push('/units');
          }, 1500);
        } else {
          throw new Error('فشل في إضافة الوحدة');
        }
        
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