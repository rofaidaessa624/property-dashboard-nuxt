<template>
  <div class="min-h-screen bg-slate-50/50 p-4 md:p-6 rtl" dir="rtl">
    <div class="w-full">
      <header class="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">تعديل وحدة</h1>
          <p class="text-slate-500 text-sm">تعديل بيانات الوحدة السكنية وإضافة مراحل جديدة</p>
        </div>
        <NuxtLink to="/units" class="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-slate-700 transition-all">
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

          <!-- ========== صور وفيديوهات الوحدة الموجودة ========== -->
          <div class="mb-8">
            <h3 class="text-base font-bold text-slate-800 pb-3 border-b-2 border-blue-500 flex items-center gap-2">
              <span>🖼️</span> الملفات الحالية (صور - فيديوهات)
            </h3>
            <div v-if="existingFiles.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-5">
              <div v-for="(file, index) in existingFiles" :key="file.id" class="relative group">
             <img v-if="isImageFile(file.file_type || file.mime_type || file.type)" 
     :src="file.image_url || getFileUrl(file)" />

                <video v-else-if="isVideoFile(file.file_type || file.mime_type || file.type)" 
                       controls
                       class="w-full h-32 object-cover rounded-xl border border-slate-200">
                  <source :src="getFileUrl(file)" :type="file.file_type || file.mime_type || file.type" />
                </video>
                <div v-else class="w-full h-32 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center">
                  <span class="text-4xl">📄</span>
                </div>
                <button type="button" 
                        class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100" 
                        @click="deleteFile(file.id, index)">✖</button>
              </div>
            </div>
            <div v-else class="mt-5 p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
              <p class="text-slate-400">لا توجد ملفات لهذه الوحدة</p>
            </div>
          </div>

          <!-- ========== إضافة ملفات جديدة (صور + فيديوهات) ========== -->
          <div class="mb-8">
            <h3 class="text-base font-bold text-slate-800 pb-3 border-b-2 border-blue-500 flex items-center gap-2">
              <span>➕</span> إضافة ملفات جديدة (صور - فيديوهات)
            </h3>
            <div class="mt-5 border-2 border-dashed border-slate-300 rounded-xl p-6 text-center bg-slate-50/30 hover:border-blue-400 transition-colors cursor-pointer"
                 @click="$refs.fileInput.click()" 
                 @dragover.prevent 
                 @drop.prevent="handleDrop">
              <input type="file" 
                     ref="fileInput" 
                     multiple 
                     accept="image/*,video/*" 
                     @change="handleFileSelect" 
                     style="display: none;" />
              <div class="text-4xl mb-2">📸🎥</div>
              <p class="text-slate-500 text-sm">اسحب الصور أو الفيديوهات هنا أو انقر للاختيار</p>
              <p class="text-slate-400 text-xs mt-1">مسموح: JPG, PNG, GIF, MP4, MOV, AVI</p>
            </div>
            <div v-if="newFiles.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-5">
              <div v-for="(file, index) in newFiles" :key="index" class="relative group">
                <img v-if="file.type.startsWith('image/')" 
                     :src="file.preview" 
                     class="w-full h-32 object-cover rounded-xl border border-slate-200" />
                <video v-else-if="file.type.startsWith('video/')" 
                       class="w-full h-32 object-cover rounded-xl border border-slate-200">
                  <source :src="file.preview" :type="file.type" />
                </video>
                <div v-else class="w-full h-32 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center">
                  <span class="text-4xl">📄</span>
                </div>
                <button @click="removeNewFile(index)" 
                        class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100">✖</button>
              </div>
            </div>
          </div>

          <!-- ========== تطورات الوحدة (المراحل السابقة) ========== -->
          <div class="mb-8">
            <h3 class="text-base font-bold text-slate-800 pb-3 border-b-2 border-emerald-500 flex items-center gap-2">
              <span>✅</span> تطورات الوحدة
            </h3>
            <div v-if="unitUpdates.length" class="space-y-3 mt-5">
              <div v-for="update in unitUpdates" :key="update.id" class="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start">
                  <p class="text-slate-700 font-medium flex-1">{{ update.update_text }}</p>
                  <button @click="deleteUpdate(update.id)" 
                          class="text-red-500 hover:text-red-700 text-xs px-2 py-1 hover:bg-red-50 rounded-lg transition-colors">✖ حذف</button>
                </div>
                <p class="text-xs text-slate-400 mt-2">{{ formatDate(update.created_at) }}</p>
                
                <!-- عرض ملفات التطور (صور وفيديوهات) -->
                <div v-if="update.images && update.images.length" class="flex gap-2 mt-3 flex-wrap">
                  <div v-for="(file, idx) in update.images" :key="idx" class="relative group">
                  <img v-if="file.image_url"
     :src="file.image_url"
     class="w-20 h-20 object-cover rounded-lg border border-slate-200 hover:scale-105 transition-transform cursor-pointer"
     @click="previewImage(file.image_url)" />
                  <video v-else-if="file.image_url"
       class="w-20 h-20 object-cover rounded-lg border border-slate-200"
       @click="previewVideo(file.image_url, file.file_type || file.mime_type)">
  <source :src="file.image_url" />
</video>
                    <div v-else class="w-20 h-20 bg-gray-200 rounded-lg border flex items-center justify-center">
                      <span class="text-2xl">📷</span>
                    </div>
                  </div>
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
              <label class="block text-sm font-medium text-slate-700 mb-1.5">نص المرحلة <span class="text-red-500">*</span></label>
              <textarea v-model="newUpdate.text" 
                        rows="3" 
                        class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition-all resize-none" 
                        placeholder="مثلاً: تم صب السقف" 
                        required></textarea>
            </div>
            <div class="mt-4">
              <label class="block text-sm font-medium text-slate-700 mb-1.5">ملفات المرحلة (صور - فيديوهات - اختياري)</label>
              <div class="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center bg-slate-50/30 hover:border-emerald-400 transition-colors cursor-pointer"
                   @click="$refs.updateFileInput.click()" 
                   @dragover.prevent 
                   @drop.prevent="handleDropUpdate">
                <input type="file" 
                       ref="updateFileInput" 
                       multiple 
                       accept="image/*,video/*" 
                       @change="handleUpdateFileSelect" 
                       style="display: none;" />
                <div class="text-4xl mb-2">📸🎥</div>
                <p class="text-slate-500 text-sm">اسحب ملفات المرحلة هنا أو انقر للاختيار</p>
                <p class="text-slate-400 text-xs mt-1">مسموح: صور وفيديوهات فقط</p>
              </div>
              <div v-if="newUpdateFiles.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                <div v-for="(file, index) in newUpdateFiles" :key="index" class="relative group">
                  <img v-if="file.type.startsWith('image/')" 
                       :src="file.preview" 
                       class="w-full h-32 object-cover rounded-xl border border-slate-200" />
                  <video v-else-if="file.type.startsWith('video/')" 
                         class="w-full h-32 object-cover rounded-xl border border-slate-200">
                    <source :src="file.preview" :type="file.type" />
                  </video>
                  <div v-else class="w-full h-32 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center">
                    <span class="text-4xl">📄</span>
                  </div>
                  <button @click="removeUpdateFile(index)" 
                          class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100">✖</button>
                </div>
              </div>
            </div>
          </div>

          <!-- أزرار الإجراءات -->
          <div class="flex justify-end gap-3 pt-5 border-t border-slate-200">
            <NuxtLink to="/units" class="px-6 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 transition-colors">إلغاء</NuxtLink>
            <button type="submit" 
                    class="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-md shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed" 
                    :disabled="updating">
              <span v-if="updating">⏳ جاري التحديث...</span>
              <span v-else>💾 تحديث البيانات</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Toast Notifications -->
    <div v-if="showToast" 
         :class="['fixed bottom-6 left-6 z-50 px-5 py-3 rounded-xl text-white text-sm font-medium animate-slideIn', toastType === 'success' ? 'bg-emerald-500' : 'bg-red-500']">
      {{ toastMessage }}
    </div>

    <!-- Modal لعرض الصور والفيديوهات بشكل أكبر -->
    <div v-if="modalVisible" 
         class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" 
         @click="closeModal">
      <div class="relative max-w-4xl w-full" @click.stop>
        <button @click="closeModal" 
                class="absolute -top-12 right-0 text-white hover:text-gray-300 text-3xl">&times;</button>
        <img v-if="modalType === 'image'" :src="modalUrl" class="w-full h-auto rounded-lg" />
        <video v-else-if="modalType === 'video'" 
               controls 
               autoplay 
               class="w-full h-auto rounded-lg">
          <source :src="modalUrl" :type="modalVideoType" />
        </video>
      </div>
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
      API_BASE_URL: 'https://api.mawtin.net',

      modalVisible: false,
      modalType: '',
      modalUrl: '',
      modalVideoType: '',

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

      existingFiles: [],
      newFiles: [],

      unitUpdates: [],
      newUpdate: { text: '' },
      newUpdateFiles: []
    }
  },
  mounted() {
    // ✅ إعداد axios لاستخدام التوكن تلقائياً
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    
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

    isImageFile(mimeType) {
      if (!mimeType) return false;
      return mimeType.toString().toLowerCase().startsWith('image/');
    },

    isVideoFile(mimeType) {
      if (!mimeType) return false;
      return mimeType.toString().toLowerCase().startsWith('video/');
    },

    getFileUrl(file) {
      if (!file) return '';
      
      if (file.url) return file.url;
      if (file.image_url) return file.image_url;
      if (file.file_url) return file.file_url;
      
      if (file.path) {
        if (file.path.startsWith('http')) return file.path;
        if (file.path.startsWith('/storage')) return `https://api.mawtin.net${file.path}`;
        return `https://api.mawtin.net/storage/${file.path}`;
      }
      
      if (file.file_path) {
        if (file.file_path.startsWith('http')) return file.file_path;
        return `https://api.mawtin.net/storage/${file.file_path}`;
      }
      
      if (file.file_name) {
        return `https://api.mawtin.net/storage/updates/${file.file_name}`;
      }
      
      if (file.preview) return file.preview;
      
      console.warn('Unknown file format:', file);
      return '';
    },

    previewImage(url) {
      this.modalType = 'image';
      this.modalUrl = url;
      this.modalVisible = true;
    },

    previewVideo(url, type) {
      this.modalType = 'video';
      this.modalUrl = url;
      this.modalVideoType = type;
      this.modalVisible = true;
    },

    closeModal() {
      this.modalVisible = false;
      this.modalUrl = '';
    },

    async fetchUnitData() {
      this.loading = true;
      try {
        const token = localStorage.getItem('token');
        
        // 1. جلب بيانات الوحدة الأساسية
        const unitRes = await axios.get(`${this.API_BASE_URL}/api/v1/units/${this.unitId}`);
        
        if (unitRes.data.success && unitRes.data.data) {
          const data = unitRes.data.data;
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

        // 2. جلب التطورات مع صورها
        const updatesRes = await axios.get(`${this.API_BASE_URL}/api/v1/units/${this.unitId}/updates`);
        
        if (updatesRes.data.success && updatesRes.data.data) {
          this.unitUpdates = updatesRes.data.data;
          console.log('تم تحميل التطورات:', this.unitUpdates);
        } else {
          this.unitUpdates = [];
        }

      } catch (error) {
        console.error('Error fetching unit:', error);
        this.showMessage('فشل في تحميل بيانات الوحدة', 'error');
      } finally {
        this.loading = false;
      }
    },

    handleFileSelect(event) { 
      this.processNewFiles(event.target.files, 'unit'); 
      event.target.value = '';
    },
    
    handleDrop(event) { 
      this.processNewFiles(event.dataTransfer.files, 'unit'); 
    },
    
    processNewFiles(files, type) {
      Array.from(files).forEach(file => {
        if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
          const reader = new FileReader();
          reader.onload = e => {
            if (type === 'unit') {
              this.newFiles.push({ file, preview: e.target.result, type: file.type });
            } else {
              this.newUpdateFiles.push({ file, preview: e.target.result, type: file.type });
            }
          };
          reader.readAsDataURL(file);
        } else {
          this.showMessage(`الملف ${file.name} غير مدعوم. المسموح: صور وفيديوهات فقط`, 'error');
        }
      });
    },
    
    removeNewFile(index) { 
      this.newFiles.splice(index, 1); 
    },

    async deleteFile(fileId, index) {
      if (!confirm('هل أنت متأكد من حذف هذا الملف؟')) return;
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${this.API_BASE_URL}/api/v1/unit-files/${fileId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.existingFiles.splice(index, 1);
        this.showMessage('تم حذف الملف بنجاح', 'success');
      } catch (error) {
        console.error('Delete error:', error);
        this.showMessage('فشل حذف الملف', 'error');
      }
    },

    handleUpdateFileSelect(event) { 
      this.processNewFiles(event.target.files, 'update'); 
      event.target.value = '';
    },
    
    handleDropUpdate(event) { 
      this.processNewFiles(event.dataTransfer.files, 'update'); 
    },
    
    removeUpdateFile(index) { 
      this.newUpdateFiles.splice(index, 1); 
    },

    async deleteUpdate(updateId) {
      if (!confirm('هل أنت متأكد من حذف هذه المرحلة؟')) return;
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${this.API_BASE_URL}/api/v1/unit-updates/${updateId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.unitUpdates = this.unitUpdates.filter(u => u.id !== updateId);
        this.showMessage('تم حذف المرحلة بنجاح', 'success');
      } catch (error) {
        console.error('Delete update error:', error);
        this.showMessage('فشل حذف المرحلة', 'error');
      }
    },

    async submitForm() {
      this.updating = true;
      try {
        const token = localStorage.getItem('token');
        
        // 1. تحديث بيانات الوحدة الأساسية
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

        await axios.put(`${this.API_BASE_URL}/api/v1/units/${this.unitId}`, updateData);

        // 2. إضافة مرحلة جديدة مع الصور ✅ التعديل الأهم هنا
        if (this.newUpdate.text.trim()) {
          const updateForm = new FormData();
          updateForm.append('unit_id', this.unitId);
          updateForm.append('update_text', this.newUpdate.text.trim());
          
          // ✅ استخدام 'images' بدلاً من 'files' ليتوافق مع الـ Backend
          this.newUpdateFiles.forEach((fileItem) => {
            updateForm.append('images[]', fileItem.file);
          });
          
          console.log('Sending update with files:', this.newUpdateFiles.length);
          
          const response = await axios.post(`${this.API_BASE_URL}/api/v1/unit-updates`, updateForm, {
            headers: { 
              'Content-Type': 'multipart/form-data' 
            }
          });
          
          console.log('Response:', response.data);
          
          // إعادة تحميل التطورات
          await this.fetchUnitData();
          
          // reset new update form
          this.newUpdate.text = '';
          this.newUpdateFiles = [];
        }

        this.showMessage('تم تحديث الوحدة بنجاح', 'success');
        setTimeout(() => this.$router.push('/units'), 1500);
      } catch (error) {
        console.error('Error updating unit:', error);
        let message = 'حدث خطأ في تحديث البيانات';
        if (error.response?.data?.message) message = error.response.data.message;
        if (error.response?.data?.errors) message = Object.values(error.response.data.errors).flat().join(', ');
        if (error.message) message = error.message;
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

.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

.opacity-0 {
  opacity: 0;
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>