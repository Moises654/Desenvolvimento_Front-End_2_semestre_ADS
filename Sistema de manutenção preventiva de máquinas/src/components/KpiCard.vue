<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-gray-600 text-sm">{{ title }}</p>
        <p class="text-2xl font-bold text-gray-900">{{ value }}</p>
      </div>
      <div :class="iconClass">
        <slot name="icon">📊</slot>
      </div>
    </div>
    <div class="mt-2">
      <span 
        :class="trendClass"
        class="text-sm font-medium"
      >
        {{ trend }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KpiCard',
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: true
    },
    trend: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'blue'
    }
  },
  computed: {
    iconClass() {
      return `text-3xl p-3 rounded-full bg-${this.color}-100 text-${this.color}-600`
    },
    trendClass() {
      if (this.trend.includes('↑')) return 'text-green-600'
      if (this.trend.includes('↓')) return 'text-red-600'
      return 'text-gray-600'
    }
  }
}
</script>