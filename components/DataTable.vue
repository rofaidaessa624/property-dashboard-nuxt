<template>
  <div class="data-table-container">
    <!-- Header with search and add button -->
    <div class="table-header">
      <h3>{{ title }}</h3>
      <div class="table-actions">
        <div class="search-box">
          <span>🔍</span>
          <input 
            v-model="searchTerm"
            type="text" 
            :placeholder="'بحث عن ' + searchPlaceholder"
            @input="onSearch"
          />
        </div>
        <button v-if="showAddButton" class="add-btn" @click="$emit('add')">
          + {{ addButtonText }}
        </button>
      </div>
    </div>
    
    <!-- Table -->
    <div class="table-wrapper">
      <table class="data-table">
        <thead>
          <tr>
            <th v-for="col in columns" :key="col.key" :style="{ textAlign: col.align || 'right' }">
              {{ col.label }}
            </th>
            <th v-if="hasActions" style="text-align: center;">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in paginatedData" :key="item.id">
            <td v-for="col in columns" :key="col.key" :style="{ textAlign: col.align || 'right' }">
              <span v-if="col.type === 'badge'" :class="'badge badge-' + item[col.key]">
                {{ getBadgeText(item[col.key], col.badgeMap) }}
              </span>
              <span v-else-if="col.type === 'currency'">
                {{ formatCurrency(item[col.key]) }}
              </span>
              <span v-else-if="col.type === 'date'">
                {{ formatDate(item[col.key]) }}
              </span>
              <span v-else>
                {{ item[col.key] || '-' }}
              </span>
            </td>
            <td v-if="hasActions" class="actions">
              <button class="edit-btn" @click="$emit('edit', item)">تعديل</button>

              <button class="delete-btn" @click="$emit('delete', item.id)">حذف</button>
            </td>
          </tr>
          <tr v-if="filteredData.length === 0">
            <td :colspan="columns.length + (hasActions ? 1 : 0)" class="empty-row">
              لا توجد بيانات
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Pagination -->
    <div v-if="filteredData.length > 0" class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">‹ السابق</button>
      <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">التالي ›</button>
    </div>
  </div>

</template>

<script>

export default {
  props: {
    title: String,
    columns: Array,
    data: Array,
    hasActions: { type: Boolean, default: true },
    showAddButton: { type: Boolean, default: true },
    addButtonText: { type: String, default: 'إضافة' },
    searchPlaceholder: { type: String, default: '' },
    itemsPerPage: { type: Number, default: 10 }
  },
  data() {
    return {
      searchTerm: '',
      currentPage: 1
    }
  },
  computed: {
    filteredData() {
      if (!this.searchTerm) return this.data;
      const term = this.searchTerm.toLowerCase();
      return this.data.filter(item => {
        return Object.values(item).some(val => 
          String(val).toLowerCase().includes(term)
        );
      });
    },
    totalPages() {
      return Math.ceil(this.filteredData.length / this.itemsPerPage);
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredData.slice(start, end);
    }
  },

  methods: {
    onSearch() {
      this.currentPage = 1;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' }).format(value);
    },
    formatDate(date) {
      if (!date) return '-';
      return new Date(date).toLocaleDateString('ar-EG');
    },
    getBadgeText(status, map) {
      if (map && map[status]) return map[status];
      const texts = { paid: 'مدفوع', pending: 'قيد الانتظار', overdue: 'متأخر', available: 'متاح', sold: 'مباع' };
      return texts[status] || status;
    },
      onEdit(item) {
    this.$emit('edit', item); }
  }
}
</script>

<style scoped>
.data-table-container {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
}

.table-header h3 {
  margin: 0;
  color: #333;
}

.table-actions {
  display: flex;
  gap: 15px;
  align-items: center;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f5f5f5;
  padding: 8px 15px;
  border-radius: 8px;
}

.search-box input {
  border: none;
  background: transparent;
  outline: none;
  width: 200px;
}

.add-btn {
  background: #4a90e2;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 8px;
  cursor: pointer;
}

.table-wrapper {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 12px;
  border-bottom: 1px solid #eee;
  text-align: right;
}

.data-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #555;
}

.data-table tr:hover {
  background: #fafafa;
}

.actions {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.edit-btn {
  background: #ffc107;
  border: none;
  padding: 5px 12px;
  border-radius: 5px;
  cursor: pointer;
}

.delete-btn {
  background: #dc3545;
  color: white;
  border: none;
  padding: 5px 12px;
  border-radius: 5px;
  cursor: pointer;
}

.badge {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
}

.badge-paid, .badge-available {
  background: #d4edda;
  color: #155724;
}

.badge-pending {
  background: #fff3cd;
  color: #856404;
}

.badge-overdue, .badge-sold {
  background: #f8d7da;
  color: #721c24;
}

.empty-row {
  text-align: center;
  padding: 40px;
  color: #888;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
  align-items: center;
}

.pagination button {
  background: #f5f5f5;
  border: 1px solid #ddd;
  padding: 6px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  font-size: 14px;
  color: #666;
}
</style>