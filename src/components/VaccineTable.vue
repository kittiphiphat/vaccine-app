<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-800 dark:to-slate-900 text-slate-800 dark:text-white p-6 font-kanit">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl sm:text-4xl font-bold text-center mb-10">
        💉 รายการวัคซีนที่ให้บริการ
      </h1>

      <div class="space-y-6">
        <div
          v-for="(vaccine, index) in vaccines"
          :key="vaccine.id"
          class="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl shadow-md p-6 transition hover:shadow-xl"
        >
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h2 class="text-xl sm:text-2xl font-semibold">
              {{ index + 1 }}. {{ vaccine.name }}
            </h2>
            <span :class="statusClass(vaccine.status)">
              {{ vaccine.status }}
            </span>
          </div>

          <div class="text-base mt-3 space-y-1 leading-relaxed">
            <p><span class="font-medium">📅 เริ่ม:</span> {{ vaccine.startDate }}</p>
            <p><span class="font-medium">📆 สิ้นสุด:</span> {{ vaccine.endDate }}</p>
          </div>

          <div class="mt-5 text-right">
            <RouterLink :to="`/vaccine/${vaccine.id}`">
              <button class="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg shadow hover:scale-105 transition">
                🔍 รายละเอียดผู้รับวัคซีน
              </button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const vaccines = ref([
  {
    id: 1,
    name: 'วัคซีนไข้หวัดใหญ่',
    startDate: '2025-05-01',
    endDate: '2025-05-15',
    status: 'เปิดจอง',
  },
  {
    id: 2,
    name: 'วัคซีนโควิด-19',
    startDate: '2025-05-05',
    endDate: '2025-05-20',
    status: 'ปิดจอง',
  },
  {
    id: 3,
    name: 'วัคซีนไข้หวัดใหญ่ (โดสที่สอง)',
    startDate: '2025-06-01',
    endDate: '2025-06-15',
    status: 'เปิดจอง',
  },
])

const statusClass = (status) => {
  switch (status) {
    case 'เปิดจอง':
      return 'bg-green-100 text-green-800 dark:bg-green-600 dark:text-white px-4 py-1 rounded-full text-sm sm:text-base font-semibold';
    case 'ปิดจอง':
      return 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-white px-4 py-1 rounded-full text-sm sm:text-base font-semibold';
    case 'ยกเลิก':
      return 'bg-red-100 text-red-800 dark:bg-red-600 dark:text-white px-4 py-1 rounded-full text-sm sm:text-base font-semibold';
    default:
      return '';
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@400;600&display=swap');

.font-kanit {
  font-family: 'Kanit', sans-serif;
}
</style>
