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
                  placeholder="مثال: A-12"
                  required
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">
                  المساحة (م²) <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="form.area" 
                  type="number" 
                  step="0.01"
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  placeholder="مثال: 200"
                  required
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">
                  السعر <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="form.total_price" 
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
                  الموقع <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="form.location" 
                  type="text" 
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  placeholder="مثال: مدينة نصر"
                  required
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">
                  عدد غرف النوم
                </label>
                <input 
                  v-model="form.bedrooms" 
                  type="number" 
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  placeholder="مثال: 3"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">
                  عدد دورات المياه
                </label>
                <input 
                  v-model="form.bathrooms" 
                  type="number" 
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  placeholder="مثال: 2"
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
                  العميل (اختياري)
                </label>
                <select v-model="form.client_id" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all">
                  <option value="">بدون عميل</option>
                  <option v-for="client in clients" :key="client.id" :value="client.id">
                    {{ client.full_name }}
                  </option>
                </select>
              </div>
              
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-slate-700 mb-1.5">
                  وصف الوحدة
                </label>
                <textarea 
                  v-model="form.description" 
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                  rows="4"
                  placeholder="وصف تفصيلي للوحدة"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- صور الوحدة -->
          <div class="mb-8">
            <h3 class="text-base font-bold text-slate-800 pb-3 border-b-2 border-blue-500 flex items-center gap-2">
              <span>🖼️</span> صور الوحدة
            </h3>
            
            <div class="mt-5 border-2 border-dashed border-slate-300 rounded-xl p-6 text-center bg-slate-50/30 hover:border-blue-400 transition-colors cursor-pointer" 
                 @dragover.prevent @drop.prevent="handleDrop" @click="$refs.fileInput.click()">
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
            
            <div v-if="images.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-5">
              <div v-for="(img, index) in images" :key="index" class="relative group">
                <img :src="img.preview" class="w-full h-32 object-cover rounded-xl border border-slate-200" />
                <button type="button" class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs hover:bg-red-600 transition-colors" @click="removeImage(index)">✖</button>
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
      clients: [],
      images: [],
      form: {
        unit_number: '',
        area: '',
        total_price: '',
        status: 'available',
        location: '',
        description: '',
        bedrooms: '',
        bathrooms: '',
        floor: '',
        client_id: ''
      },
      submitting: false,
      showToast: false,
      toastMessage: '',
      toastType: 'success'
    }
  },
  
  mounted() {
    this.fetchClients();
  },
  
  methods: {
    formatCurrency(value) {
      if (!value) return '0 ج.م';
      return new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' }).format(value);
    },
    
    async fetchClients() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${apiBase}/api/v1/clients`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.data.success) {
          this.clients = response.data.data;
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
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
            this.images.push({
              file: file,
              preview: e.target.result
            });
          };
          reader.readAsDataURL(file);
        }
      });
    },
    
    removeImage(index) {
      this.images.splice(index, 1);
    },
    
    async submitForm() {
      if (!this.form.unit_number) {
        this.showMessage('الرجاء إدخال رقم الوحدة', 'error');
        return;
      }
      
      if (!this.form.total_price || this.form.total_price <= 0) {
        this.showMessage('الرجاء إدخال سعر صحيح للوحدة', 'error');
        return;
      }
      
      if (!this.form.location) {
        this.showMessage('الرجاء إدخال الموقع', 'error');
        return;
      }
      
      if (!this.form.area || this.form.area <= 0) {
        this.showMessage('الرجاء إدخال المساحة', 'error');
        return;
      }
      
      this.submitting = true;
      
      try {
        const token = localStorage.getItem('token');
        
        const unitData = {
          unit_number: this.form.unit_number,
          unit_type: 'apartment',
          total_price: parseFloat(this.form.total_price),
          down_payment: 0,
          number_of_installments: 12,
          location: this.form.location,
          area: parseInt(this.form.area),
          bedrooms: this.form.bedrooms ? parseInt(this.form.bedrooms) : 0,
          bathrooms: this.form.bathrooms ? parseInt(this.form.bathrooms) : 0,
          status: this.form.status,
          description: this.form.description || null,
          floor: this.form.floor ? parseInt(this.form.floor) : null
        };
        
        const response = await axios.post(`${apiBase}api/v1/units`, unitData, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        const unitId = response.data.id || response.data.data?.id;
        
        // رفع الصور إذا وجدت
        if (this.images.length > 0 && unitId) {
          const formData = new FormData();
          this.images.forEach((img) => {
            formData.append('images[]', img.file);
          });
          formData.append('unit_id', unitId);
          
          await axios.post(`${apiBase}/api/v1/units`, formData, {
            headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          });
        }
        
        this.showMessage('تم إضافة الوحدة بنجاح', 'success');
        setTimeout(() => {
          this.$router.push('/units');
        }, 1500);
        
      } catch (error) {
        console.error('Error:', error);
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