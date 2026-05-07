<template>
  <div class="min-h-screen bg-slate-50/50 p-4 md:p-6 rtl" dir="rtl">
    <div class="w-full">
      <!-- Header -->
      <header class="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">تعديل وحدة</h1>
          <p class="text-slate-500 text-sm">تعديل بيانات الوحدة السكنية</p>
        </div>
        <NuxtLink 
          to="/units" 
          class="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-slate-700"
        >
          ← العودة للقائمة
        </NuxtLink>
      </header>

      <!-- Loading State -->
      <div v-if="loading" class="rounded-2xl bg-white p-20 text-center">
        <div class="flex flex-col items-center justify-center">
          <div class="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <p class="text-slate-500">جاري تحميل بيانات الوحدة...</p>
        </div>
      </div>

      <!-- Form Content -->
      <div v-else class="rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden">
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
                ></textarea>
              </div>
            </div>
          </div>
          
          <!-- صور الوحدة الموجودة -->
          <div class="mb-8">
            <h3 class="text-base font-bold text-slate-800 pb-3 border-b-2 border-blue-500 flex items-center gap-2">
              <span>🖼️</span> صور الوحدة
            </h3>
            
            <div v-if="existingImages.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-5">
              <div v-for="(img, index) in existingImages" :key="index" class="relative group">
                <img :src="img.image_url" class="w-full h-32 object-cover rounded-xl border border-slate-200" />
                <span class="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-1.5 py-0.5 rounded">{{ img.caption || 'بدون وصف' }}</span>
                <button type="button" class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs hover:bg-red-600 transition-colors" @click="deleteImage(img.id, index)">✖</button>
              </div>
            </div>
            <div v-else class="mt-5 p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
              <p class="text-slate-400">لا توجد صور لهذه الوحدة</p>
            </div>
          </div>
          
          <!-- إضافة صور جديدة -->
          <div class="mb-8">
            <h3 class="text-base font-bold text-slate-800 pb-3 border-b-2 border-blue-500 flex items-center gap-2">
              <span>➕</span> إضافة صور جديدة
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
            <div v-if="newImages.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-5">
              <div v-for="(img, index) in newImages" :key="index" class="relative group">
                <img :src="img.preview" class="w-full h-32 object-cover rounded-xl border border-slate-200" />
                <button type="button" class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs hover:bg-red-600 transition-colors" @click="removeNewImage(index)">✖</button>
                <input v-model="img.caption" type="text" placeholder="وصف الصورة" class="w-full mt-2 px-2 py-1 text-xs border border-slate-200 rounded-lg focus:border-blue-400 outline-none" />
              </div>
            </div>
          </div>
          
          <!-- أزرار الإجراءات -->
          <div class="flex justify-end gap-3 pt-5 border-t border-slate-200">
            <NuxtLink to="/units" class="px-6 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 transition-colors">
              إلغاء
            </NuxtLink>
            <button type="submit" class="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-md shadow-blue-200" :disabled="updating">
              <span v-if="updating">⏳ جاري التحديث...</span>
              <span v-else>💾 تحديث البيانات</span>
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
  name: 'EditUnit',
  
  data() {
    return {
      unitId: null,
      loading: true,
      updating: false,
      showToast: false,
      toastMessage: '',
      toastType: 'success',
      
      form: {
        unit_number: '',
        floor: '',
        area: '',
        price: '',
        status: 'available',
        location: '',
        description: ''
      },
      
      existingImages: [],
      newImages: [],
      newImageFiles: []
    }
  },
  
  mounted() {
    this.unitId = this.$route.params.id;
    if (this.unitId) {
      this.fetchUnitData();
    } else {
      this.showMessage('معرف الوحدة غير صالح', 'error');
      setTimeout(() => {
        this.$router.push('/units');
      }, 1500);
    }
  },
  
  methods: {
    formatCurrency(value) {
      if (!value) return '0 ج.م';
      return new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' }).format(value);
    },
    
    async fetchUnitData() {
      this.loading = true;
      try {
        const token = localStorage.getItem('token');
        
        // Fetch unit details
        const unitRes = await axios.get(`http://127.0.0.1:8000/api/v1/units/${this.unitId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (unitRes.data.success) {
          this.form = unitRes.data.data;
        }
        
        // Fetch unit images
        const imagesRes = await axios.get(`http://127.0.0.1:8000/api/v1/units/${this.unitId}/images`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (imagesRes.data.success) {
          this.existingImages = imagesRes.data.data;
        }
        
      } catch (error) {
        console.error('Error fetching unit:', error);
        this.showMessage('فشل في تحميل بيانات الوحدة', 'error');
      } finally {
        this.loading = false;
      }
    },
    
    // Image Methods
    handleFileSelect(event) {
      const files = Array.from(event.target.files);
      this.processNewImages(files);
    },
    
    handleDrop(event) {
      const files = Array.from(event.dataTransfer.files);
      this.processNewImages(files);
    },
    
    processNewImages(files) {
      files.forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.newImages.push({
              file: file,
              preview: e.target.result,
              caption: '',
              order: this.newImages.length
            });
          };
          reader.readAsDataURL(file);
          this.newImageFiles.push(file);
        }
      });
    },
    
    removeNewImage(index) {
      this.newImages.splice(index, 1);
      this.newImageFiles.splice(index, 1);
    },
    
    async deleteImage(imageId, index) {
      if (!confirm('هل أنت متأكد من حذف هذه الصورة؟')) return;
      
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://127.0.0.1:8000/api/v1/unit-images/${imageId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        this.existingImages.splice(index, 1);
        this.showMessage('تم حذف الصورة بنجاح', 'success');
      } catch (error) {
        console.error('Error deleting image:', error);
        this.showMessage('فشل حذف الصورة', 'error');
      }
    },
    
    async uploadNewImages(unitId, token) {
      if (this.newImageFiles.length === 0) return;
      
      const formData = new FormData();
      this.newImageFiles.forEach((file, index) => {
        formData.append('images[]', file);
        if (this.newImages[index]?.caption) {
          formData.append(`captions[${index}]`, this.newImages[index].caption);
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
      this.updating = true;
      
      try {
        const token = localStorage.getItem('token');
        
        // Update unit
        await axios.put(`http://127.0.0.1:8000/api/v1/units/${this.unitId}`, this.form, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        // Upload new images
        if (this.newImageFiles.length > 0) {
          await this.uploadNewImages(this.unitId, token);
        }
        
        this.showMessage('تم تحديث الوحدة بنجاح', 'success');
        
        setTimeout(() => {
          this.$router.push('/units');
        }, 1500);
        
      } catch (error) {
        console.error('Error updating unit:', error);
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