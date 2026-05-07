<template>
  <div 
    class="stats-card"
    :style="{ background: bgColor || 'white' }"
    @mouseenter="hover = true" 
    @mouseleave="hover = false"
  >
    <div class="stats-info">
      <div class="stats-title">{{ title }}</div>
      <div class="stats-value">{{ value.toLocaleString() }}</div>
      <div v-if="change" class="stats-change" :style="{ color: change > 0 ? '#28a745' : '#dc3545' }">
        {{ change > 0 ? '▲' : '▼' }} {{ Math.abs(change) }}% عن الشهر الماضي
      </div>
    </div>
    <div class="stats-icon" :style="{ background: iconBgColor || color + '20' }">
      <span style="font-size: 32px;">{{ icon }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    value: [Number, String],
    icon: String,
    color: { type: String, default: '#4a90e2' },
    bgColor: { type: String, default: 'white' },
    iconBgColor: String,
    change: Number
  },
  data() {
    return { hover: false }
  }
}
</script>

<style scoped>
.stats-card {
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  transition: transform 0.2s, box-shadow 0.2s;
}

.stats-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.12);
}

.stats-info {
  flex: 1;
}

.stats-title {
  font-size: 14px;
  color: #888;
  margin-bottom: 8px;
}

.stats-value {
  font-size: 28px;
  font-weight: bold;
  color: #333;
}

.stats-change {
  font-size: 12px;
  margin-top: 8px;
}

.stats-icon {
  width: 55px;
  height: 55px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>