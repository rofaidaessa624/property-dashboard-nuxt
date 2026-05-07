<template>
  <div style="margin-right: 260px; padding: 24px;">
    <DataTable
      title="المشاريع"
      :columns="columns"
      :data="projects"
      addButtonText="+ إضافة مشروع"
      searchPlaceholder="اسم المشروع"
      @add="showAddModal = true"
      @edit="editProject"
      @delete="deleteProject"
    />
    
    <!-- Add/Edit Modal -->
    <div v-if="showAddModal || showEditModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <h2>{{ showEditModal ? 'تعديل مشروع' : 'إضافة مشروع جديد' }}</h2>
        
        <div class="form-grid">
          <div class="form-group full-width">
            <label>اسم المشروع *</label>
            <input v-model="form.name" placeholder="اسم المشروع" />
          </div>
          
          <div class="form-group">
            <label>الموقع</label>
            <input v-model="form.location" placeholder="الموقع" />
          </div>
          
          <div class="form-group">
            <label>تاريخ البدء</label>
            <input v-model="form.start_date" type="date" />
          </div>
          
          <div class="form-group">
            <label>تاريخ التسليم المتوقع</label>
            <input v-model="form.expected_end_date" type="date" />
          </div>
          
          <div class="form-group">
            <label>الحالة</label>
            <select v-model="form.status">
              <option value="planned">مخطط</option>
              <option value="in_progress">قيد التنفيذ</option>
              <option value="completed">منتهي</option>
              <option value="on_hold">متوقف</option>
            </select>
          </div>
          
          <div class="form-group full-width">
            <label>الوصف</label>
            <textarea v-model="form.description" rows="3" placeholder="وصف المشروع..."></textarea>
          </div>
        </div>
        
        <div class="modal-actions">
          <button class="cancel-btn" @click="closeModal">إلغاء</button>
          <button class="save-btn" @click="submitForm" :disabled="submitting">
            {{ submitting ? 'جاري الحفظ...' : (showEditModal ? 'تحديث' : 'إضافة') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from '@/components/DataTable.vue';
import axios from 'axios';

export default {
  components: { DataTable },
  
  data() {
    return {
      projects: [],
      columns: [
        { key: 'name', label: 'اسم المشروع' },
        { key: 'location', label: 'الموقع' },
        { key: 'start_date', label: 'تاريخ البدء', type: 'date' },
        { key: 'expected_end_date', label: 'تاريخ التسليم', type: 'date' },
        { key: 'units_count', label: 'عدد الوحدات', align: 'center' },
        { key: 'status', label: 'الحالة', type: 'badge' }
      ],
      showAddModal: false,
      showEditModal: false,
      submitting: false,
      form: {
        id: null,
        name: '',
        location: '',
        start_date: '',
        expected_end_date: '',
        status: 'planned',
        description: ''
      }
    }
  },
  
  mounted() {
    this.fetchProjects();
  },
  
  methods: {
    async fetchProjects() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/v1/projects', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.data.success) {
          this.projects = response.data.data;
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
    
    editProject(project) {
      this.form = { ...project };
      this.showEditModal = true;
    },
    
    async deleteProject(id) {
      if (!confirm('هل أنت متأكد من حذف هذا المشروع؟')) return;
      
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://127.0.0.1:8000/api/v1/projects/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        await this.fetchProjects();
      } catch (error) {
        console.error('Error:', error);
        alert('فشل الحذف');
      }
    },
    
    async submitForm() {
      this.submitting = true;
      
      try {
        const token = localStorage.getItem('token');
        const url = this.showEditModal 
          ? `http://127.0.0.1:8000/api/v1/projects/${this.form.id}`
          : 'http://127.0.0.1:8000/api/v1/projects';
        const method = this.showEditModal ? 'put' : 'post';
        
        await axios[method](url, this.form, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        this.closeModal();
        await this.fetchProjects();
      } catch (error) {
        console.error('Error:', error);
        alert('فشل الحفظ');
      } finally {
        this.submitting = false;
      }
    },
    
    closeModal() {
      this.showAddModal = false;
      this.showEditModal = false;
      this.form = { id: null, name: '', location: '', start_date: '', expected_end_date: '', status: 'planned', description: '' };
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 30px;
  width: 600px;
  max-width: 90%;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin: 20px 0;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group.full-width {
  grid-column: span 2;
}

.form-group label {
  font-size: 14px;
  color: #555;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.cancel-btn {
  background: #6c757d;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 6px;
  cursor: pointer;
}

.save-btn {
  background: #4a90e2;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 6px;
  cursor: pointer;
}
</style>