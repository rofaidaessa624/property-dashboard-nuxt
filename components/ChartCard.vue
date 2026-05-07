<template>
  <div class="chart-card">
    <div class="chart-header">
      <h3>{{ title }}</h3>
      <select v-if="hasPeriod" v-model="period" @change="$emit('period-change', period)" class="period-select">
        <option value="week">هذا الأسبوع</option>
        <option value="month">هذا الشهر</option>
        <option value="year">هذا العام</option>
      </select>
    </div>
    <div class="chart-container">
      <canvas :ref="chartId"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  props: {
    title: String,
    chartId: String,
    chartType: { type: String, default: 'line' },
    chartData: Object,
    hasPeriod: { type: Boolean, default: false }
  },
  data() {
    return {
      period: 'month',
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler() {
        this.updateChart();
      }
    }
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      const ctx = this.$refs[this.chartId].getContext('2d');
      this.chart = new Chart(ctx, {
        type: this.chartType,
        data: this.chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom' } }
        }
      });
    },
    updateChart() {
      if (this.chart) {
        this.chart.data = this.chartData;
        this.chart.update();
      }
    }
  }
}
</script>

<style scoped>
.chart-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.chart-header h3 {
  margin: 0;
  color: #333;
}

.period-select {
  padding: 5px 10px;
  border-radius: 6px;
  border: 1px solid #ddd;
  background: white;
}

.chart-container {
  height: 300px;
}
</style>