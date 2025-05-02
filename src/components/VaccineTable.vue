<script setup>
import { ref } from 'vue';

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
]);

const statusClass = (status) => {
  switch (status) {
    case 'เปิดจอง':
      return 'bg-green-500 text-white px-2 py-1 rounded-full';
    case 'ปิดจอง':
      return 'bg-gray-500 text-white px-2 py-1 rounded-full';
    case 'ยกเลิก':
      return 'bg-red-500 text-white px-2 py-1 rounded-full';
    default:
      return '';
  }
};

</script>

<style scoped>
         @import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

      #app {
        font-family: "Kanit", sans-serif;
        justify-content: center;
      }
</style>

<template>
  <div class="container mx-auto p-6 ">
    <h2 class="text-3xl font-semibold mb-6 text-center text-gray-200">รายการวัคซีนที่เปิดจอง</h2>

    <div class="overflow-x-auto bg-white rounded-lg shadow-lg mb-3">
      <table class="min-w-full table-auto border-separate border-spacing-0">
        <thead class="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <tr>
            <th class="px-6 py-3 text-left text-lg font-semibold">หมายเลข</th>
            <th class="px-6 py-3 text-left text-lg font-semibold">ชื่อวัคซีน</th>
            <th class="px-6 py-3 text-left text-lg font-semibold">วันที่เปิดจอง</th>
            <th class="px-6 py-3 text-left text-lg font-semibold">วันที่สิ้นสุด</th>
            <th class="px-10 py-3 text-left text-lg font-semibold">สถานะ</th>
            <th class="px-6 py-3 text-left text-lg font-semibold">การจัดการ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(vaccine, index) in vaccines" :key="vaccine.id" class="border-t hover:bg-gray-50 text-black font-semibold">
            <td class="px-6 py-4 text-lg">{{ index + 1 }}</td>
            <td class="px-6 py-4 text-lg">{{ vaccine.name }}</td>
            <td class="px-6 py-4 text-lg">{{ vaccine.startDate }}</td>
            <td class="px-6 py-4 text-lg">{{ vaccine.endDate }}</td>
            <td class="px-6 py-4">
              <span :class="statusClass(vaccine.status)">
                {{ vaccine.status }}
              </span>
            </td>
            <td class="px-6 py-4">

              <RouterLink :to="`/patient/${vaccine.id}`">
                <button class="px-6 py-2 text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg shadow-md
                transition-all duration-200 transform hover:scale-105">
                  รายละเอียดผู้รับวัคซีน
                </button>
              </RouterLink>





            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
