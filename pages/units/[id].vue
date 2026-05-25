<template>
  <div class="min-h-screen bg-slate-50/50 p-4 md:p-6 rtl" dir="rtl">
    <div class="w-full">
      <header class="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">تعديل وحدة</h1>
          <p class="text-slate-500 text-sm">تعديل بيانات الوحدة السكنية وإضافة مراحل جديدة</p>
        </div>
        <NuxtLink to="/units" class="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-slate-700">
          ← العودة للقائمة
        </NuxtLink>
      </header>

      <div v-if="loading" class="rounded-2xl bg-white p-20 text-center">
        <div class="flex flex-col items-center justify-center">
          <div class="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <p class="text-slate-500">جاري تحميل بيانات الوحدة...</p>
        </div>
      </div>

      <div v-else class="rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden">
        <form @submit.prevent="submitForm" class="p-6">
          
          <!-- ========== معلومات الوحدة الأساسية ========== -->
          <div class="mb-8">
            <h3 class="text-base font-bold text-slate-800 pb-3 border-b-2 border-blue-500 flex items-center gap-2">
              <span>🏢</span> معلومات الوحدة
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">رقم الوحدة <span class="text-red-500">*</span></label>
                <input v-model="form.unit_number" type="text" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all" required />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">المساحة (م²) <span class="text-red-500">*</span></label>
                <input v-model="form.area" type="number" step="0.01" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all" required />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">السعر <span class="text-red-500">*</span></label>
                <input v-model="form.total_price" type="number" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all" required />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">الحالة</label>
                <select v-model="form.status" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all">
                  <option value="available">🟢 متاحة</option>
                  <option value="sold">🔴 مباعة</option>
                  <option value="reserved">🟡 محجوزة</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">الموقع <span class="text-red-500">*</span></label>
                <input v-model="form.location" type="text" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all" required />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">عدد غرف النوم</label>
                <input v-model="form.bedrooms" type="number" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all" />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">عدد دورات المياه</label>
                <input v-model="form.bathrooms" type="number" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all" />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">الدور</label>
                <input v-model="form.floor" type="number" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all" placeholder="مثلاً: 3" />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-slate-700 mb-1.5">وصف الوحدة</label>
                <textarea v-model="form.description" rows="4" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"></textarea>
              </div>
            </div>
          </div>

          <!-- ========== صور الوحدة الموجودة ========== -->
          <div class="mb-8">
            <h3 class="text-base font-bold text-slate-800 pb-3 border-b-2 border-blue-500 flex items-center gap-2">
              <span>🖼️</span> صور الوحدة الحالية
            </h3>
            <div v-if="existingImages.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-5">
              <div v-for="(img, index) in existingImages" :key="img.id" class="relative group">
                <img :src="img.image_url || img.path" class="w-full h-32 object-cover rounded-xl border border-slate-200" />
                <button type="button" class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs hover:bg-red-600 transition-colors" @click="deleteImage(img.id, index)">✖</button>
              </div>
            </div>
            <div v-else class="mt-5 p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
              <p class="text-slate-400">لا توجد صور لهذه الوحدة</p>
            </div>
          </div>

          <!-- ========== إضافة صور جديدة ========== -->
          <div class="mb-8">
            <h3 class="text-base font-bold text-slate-800 pb-3 border-b-2 border-blue-500 flex items-center gap-2">
              <span>➕</span> إضافة صور جديدة
            </h3>
            <div class="mt-5 border-2 border-dashed border-slate-300 rounded-xl p-6 text-center bg-slate-50/30 hover:border-blue-400 transition-colors cursor-pointer"
                 @click="$refs.fileInput.click()" @dragover.prevent @drop.prevent="handleDrop">
              <input type="file" ref="fileInput" multiple accept="image/*" @change="handleFileSelect" style="display: none;" />
              <div class="text-4xl mb-2">📸</div>
              <p class="text-slate-500 text-sm">اسحب الصور هنا أو انقر للاختيار</p>
            </div>
            <div v-if="newImages.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-5">
              <div v-for="(img, index) in newImages" :key="index" class="relative group">
                <img :src="img.preview" class="w-full h-32 object-cover rounded-xl border border-slate-200" />
                <button @click="removeNewImage(index)" class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs hover:bg-red-600 transition-colors">✖</button>
              </div>
            </div>
          </div>

          <!-- ========== تطورات الوحدة (المراحل السابقة) ========== -->
<!-- ========== تطورات الوحدة (المراحل السابقة) ========== -->
<div class="mb-8">
  <h3 class="text-base font-bold text-slate-800 pb-3 border-b-2 border-emerald-500 flex items-center gap-2">
    <span>✅</span> تطورات الوحدة
  </h3>
  <div v-if="unitUpdates.length" class="space-y-3 mt-5">
    <div v-for="update in unitUpdates" :key="update.id" class="p-4 bg-slate-50 rounded-xl border border-slate-200">
      <div class="flex justify-between items-start">
        <p class="text-slate-700 font-medium">{{ update.update_text }}</p>
        <button @click="deleteUpdate(update.id)" class="text-red-500 hover:text-red-700 text-xs">✖ حذف</button>
      </div>
      <p class="text-xs text-slate-400 mt-2">{{ formatDate(update.created_at) }}</p>
      <div v-if="update.images && update.images.length" class="flex gap-2 mt-3 flex-wrap">
        <!-- ✅ تم تعديل السطر ده -->
        <img v-for="(img, idx) in update.images" :key="idx" :src="'https://api.mawtin.net/storage/' + img.path" class="w-20 h-20 object-cover rounded-lg border" />
      </div>
    </div>
  </div>
  <div v-else class="mt-5 p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
    <p class="text-slate-400">لا توجد تطورات مسجلة لهذه الوحدة</p>
  </div>
</div>
          <!-- ========== إضافة مرحلة جديدة ========== -->
          <div class="mb-8">
            <h3 class="text-base font-bold text-slate-800 pb-3 border-b-2 border-emerald-500 flex items-center gap-2">
              <span>🆕</span> إضافة مرحلة جديدة
            </h3>
            <div class="mt-5">
              <label class="block text-sm font-medium text-slate-700 mb-1.5">نص المرحلة</label>
              <textarea v-model="newUpdate.text" rows="3" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition-all resize-none" placeholder="مثلاً: تم صب السقف"></textarea>
            </div>
            <div class="mt-4">
              <label class="block text-sm font-medium text-slate-700 mb-1.5">صور المرحلة (اختياري)</label>
              <div class="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center bg-slate-50/30 hover:border-emerald-400 transition-colors cursor-pointer"
                   @click="$refs.updateFileInput.click()" @dragover.prevent @drop.prevent="handleDropUpdate">
                <input type="file" ref="updateFileInput" multiple accept="image/*" @change="handleUpdateFileSelect" style="display: none;" />
                <div class="text-4xl mb-2">📸</div>
                <p class="text-slate-500 text-sm">اسحب صور المرحلة هنا أو انقر للاختيار</p>
              </div>
              <div v-if="newUpdateImages.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                <div v-for="(img, index) in newUpdateImages" :key="index" class="relative group">
                  <img :src="img.preview" class="w-full h-32 object-cover rounded-xl border border-slate-200" />
                  <button @click="removeUpdateImage(index)" class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs hover:bg-red-600 transition-colors">✖</button>
                </div>
              </div>
            </div>
          </div>

          <!-- أزرار الإجراءات -->
          <div class="flex justify-end gap-3 pt-5 border-t border-slate-200">
            <NuxtLink to="/units" class="px-6 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 transition-colors">إلغاء</NuxtLink>
            <button type="submit" class="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-md shadow-blue-200" :disabled="updating">
              <span v-if="updating">⏳ جاري التحديث...</span>
              <span v-else>💾 تحديث البيانات</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="showToast" :class="['fixed bottom-6 left-6 z-50 px-5 py-3 rounded-xl text-white text-sm font-medium animate-slideIn', toastType === 'success' ? 'bg-emerald-500' : 'bg-red-500']">
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
        area: '',
        total_price: '',
        status: 'available',
        location: '',
        description: '',
        bedrooms: '',
        bathrooms: '',
        floor: ''
      },

      existingImages: [],
      newImages: [],

      unitUpdates: [],
      newUpdate: { text: '' },
      newUpdateImages: []
    }
  },
  mounted() {
    this.unitId = this.$route.params.id;
    if (this.unitId) {
      this.fetchUnitData();
    } else {
      this.showMessage('معرف الوحدة غير صالح', 'error');
      setTimeout(() => this.$router.push('/units'), 1500);
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return '';
      return new Date(date).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
    },

    async fetchUnitData() {
      this.loading = true;
      try {
        const token = localStorage.getItem('token');
        
        const unitRes = await axios.get(`{ba}api/v1/units/${this.unitId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (unitRes.data.success || unitRes.data) {
          const data = unitRes.data.data || unitRes.data;
          this.form = {
            unit_number: data.unit_number || '',
            area: data.area || '',
            total_price: data.total_price || '',
            status: data.status || 'available',
            location: data.location || '',
            description: data.description || '',
            bedrooms: data.bedrooms || '',
            bathrooms: data.bathrooms || '',
            floor: data.floor || ''
          };
        }

        try {
          const updatesRes = await axios.get(`https://api.mawtin.net/api/v1/units/${this.unitId}/updates`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (updatesRes.data.success || updatesRes.data.data) {
            this.unitUpdates = updatesRes.data.data || updatesRes.data || [];
          }
        } catch (e) {
          console.warn('تعذر جلب التطورات:', e);
        }

      } catch (error) {
        console.error('Error fetching unit:', error);
        this.showMessage('فشل في تحميل بيانات الوحدة', 'error');
      } finally {
        this.loading = false;
      }
    },

    handleFileSelect(event) { this.processNewImages(event.target.files); },
    handleDrop(event) { this.processNewImages(event.dataTransfer.files); },
    processNewImages(files) {
      Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = e => this.newImages.push({ file, preview: e.target.result });
          reader.readAsDataURL(file);
        }
      });
    },
    removeNewImage(index) { this.newImages.splice(index, 1); },

    async deleteImage(imageId, index) {
      if (!confirm('هل أنت متأكد من حذف هذه الصورة؟')) return;
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`https://api.mawtin.net/api/v1/units/${imageId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.existingImages.splice(index, 1);
        this.showMessage('تم حذف الصورة بنجاح', 'success');
      } catch (error) {
        this.showMessage('فشل حذف الصورة', 'error');
      }
    },

    handleUpdateFileSelect(event) { this.processUpdateImages(event.target.files); },
    handleDropUpdate(event) { this.processUpdateImages(event.dataTransfer.files); },
    processUpdateImages(files) {
      Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = e => this.newUpdateImages.push({ file, preview: e.target.result });
          reader.readAsDataURL(file);
        }
      });
    },
    removeUpdateImage(index) { this.newUpdateImages.splice(index, 1); },

    async deleteUpdate(updateId) {
      if (!confirm('هل أنت متأكد من حذف هذه المرحلة؟')) return;
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`https://api.mawtin.net/api/v1/unit-updates/${updateId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.unitUpdates = this.unitUpdates.filter(u => u.id !== updateId);
        this.showMessage('تم حذف المرحلة بنجاح', 'success');
      } catch (error) {
        this.showMessage('فشل حذف المرحلة', 'error');
      }
    },

    async submitForm() {
      this.updating = true;
      try {
        const token = localStorage.getItem('token');
        
        const updateData = {
          unit_number: this.form.unit_number,
          area: parseFloat(this.form.area) || null,
          total_price: parseFloat(this.form.total_price),
          status: this.form.status,
          location: this.form.location || null,
          description: this.form.description || null,
          bedrooms: parseInt(this.form.bedrooms) || null,
          bathrooms: parseInt(this.form.bathrooms) || null,
          floor: this.form.floor ? parseInt(this.form.floor) : null
        };

        await axios.put(`https://api.mawtin.net/api/v1/units/${this.unitId}`, updateData, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (this.newImages.length) {
          const formData = new FormData();
          this.newImages.forEach((img) => {
            formData.append('images[]', img.file);
          });
          formData.append('unit_id', this.unitId);
          
          await axios.post(`https://api.mawtin.net/api/v1/units`, formData, {
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
          });
        }

        if (this.newUpdate.text.trim() || this.newUpdateImages.length) {
          const updateForm = new FormData();
          updateForm.append('unit_id', this.unitId);
          updateForm.append('update_text', this.newUpdate.text || '');
          this.newUpdateImages.forEach((img) => {
            updateForm.append('images[]', img.file);
          });
          
          await axios.post(`https://api.mawtin.net/api/v1/unit-updates`, updateForm, {
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
          });
        }

        this.showMessage('تم تحديث الوحدة بنجاح', 'success');
        setTimeout(() => this.$router.push('/units'), 1500);
      } catch (error) {
        console.error('Error updating unit:', error);
        let message = 'حدث خطأ في تحديث البيانات';
        if (error.response?.data?.message) message = error.response.data.message;
        this.showMessage(message, 'error');
      } finally {
        this.updating = false;
      }
    },

    showMessage(message, type) {
      this.toastMessage = message;
      this.toastType = type;
      this.showToast = true;
      setTimeout(() => this.showToast = false, 3000);
    }
  }
}
</script>

<style scoped>
.rtl { direction: rtl; }
@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
.animate-slideIn { animation: slideIn 0.3s ease-out; }
</style>