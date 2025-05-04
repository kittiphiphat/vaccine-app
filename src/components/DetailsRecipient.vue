<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const vaccineId = route.params.id

const vaccineName = ref('')
const vaccineStatus = ref('')
const keyword = ref('')
const patientList = ref([])

const editingId = ref(null)
const editData = ref({ id: null, name: '', date: '', gender: '' })

onMounted(() => {
  switch (vaccineId) {
    case '1':
      vaccineName.value = 'วัคซีนไข้หวัดใหญ่'
      vaccineStatus.value = 'เปิดจอง'
      patientList.value = [
        { id: 101, name: 'นายประเสริฐ สงบสุข', date: '2025-05-02', gender: 'ชาย' },
        { id: 102, name: 'นางสาวอารี สุขใจ', date: '2025-05-03', gender: 'หญิง' }
      ]
      break
    case '2':
      vaccineName.value = 'วัคซีนโควิด-19'
      vaccineStatus.value = 'ปิดจอง'
      break
    case '3':
      vaccineName.value = 'วัคซีนไข้หวัดใหญ่ (โดสที่สอง)'
      vaccineStatus.value = 'เปิดจอง'
      patientList.value = [
        { id: 301, name: 'นายต้นกล้า ใจดี', date: '2025-06-02', gender: 'ชาย' }
      ]
      break
    default:
      vaccineName.value = 'ไม่พบข้อมูลวัคซีน'
      vaccineStatus.value = 'ยกเลิก'
  }
})

const filteredPatients = computed(() => {
  if (!keyword.value) return patientList.value
  return patientList.value.filter(p =>
    p.name.toLowerCase().includes(keyword.value.toLowerCase())
  )
})

const goBack = () => router.back()
const exportPDF = () => window.print()

const deletePatient = (id) => {
  patientList.value = patientList.value.filter(p => p.id !== id)
}

const startEdit = (patient) => {
  editingId.value = patient.id
  editData.value = { ...patient }
}

const cancelEdit = () => {
  editingId.value = null
}

const saveEdit = () => {
  const index = patientList.value.findIndex(p => p.id === editData.value.id)
  if (index !== -1) {
    patientList.value[index] = { ...editData.value }
  }
  editingId.value = null
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 p-6 font-kanit text-slate-800 dark:text-white print:bg-white">
    <div class="max-w-4xl mx-auto space-y-6">
      <!-- ถ้าสถานะ != เปิดจอง -->
      <div v-if="vaccineStatus !== 'เปิดจอง'" class="text-center text-lg mt-32 text-red-600 dark:text-red-400">
        🚫 ไม่สามารถเข้าดูข้อมูลได้ เนื่องจากวัคซีน "{{ vaccineName }}" ถูก {{ vaccineStatus }}
        <div class="mt-4">
          <button @click="goBack" class="bg-gray-300 dark:bg-gray-700 text-sm px-4 py-2 rounded hover:bg-gray-400">
            ⬅ กลับหน้าหลัก
          </button>
        </div>
      </div>

      <!-- ถ้าเปิดจอง -->
      <div v-else>
        <div class="flex items-center justify-between">
          <h1 class="text-2xl sm:text-3xl font-bold">
            🩺 รายชื่อผู้รับ: <span class="text-blue-600 dark:text-blue-400">{{ vaccineName }}</span>
          </h1>
          <button @click="goBack" class="bg-gray-300 dark:bg-gray-700 text-sm px-4 py-2 rounded hover:bg-gray-400">
            ⬅ ย้อนกลับ
          </button>
        </div>

        <input
          v-model="keyword"
          type="text"
          placeholder="🔍 ค้นหาชื่อ..."
          class="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800"
        />

        <button @click="exportPDF" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          📄 Export PDF
        </button>

        <div v-if="filteredPatients.length" class="space-y-4 mt-4">
          <div
            v-for="patient in filteredPatients"
            :key="patient.id"
            :class="[
              'border rounded-xl p-5 shadow-sm space-y-2',
              patient.gender === 'ชาย'
                ? 'bg-blue-50 border-blue-300 dark:bg-blue-900 dark:border-blue-700'
                : 'bg-pink-50 border-pink-300 dark:bg-pink-900 dark:border-pink-700'
            ]"
          >
            <template v-if="editingId === patient.id">
              <input v-model="editData.name" class="w-full mb-2 p-2 rounded border dark:bg-slate-800" />
              <input v-model="editData.date" type="date" class="w-full mb-2 p-2 rounded border dark:bg-slate-800" />
              <select v-model="editData.gender" class="w-full mb-2 p-2 rounded border dark:bg-slate-800">
                <option value="ชาย">ชาย</option>
                <option value="หญิง">หญิง</option>
              </select>
              <div class="flex gap-2 justify-end">
                <button @click="saveEdit" class="bg-green-600 text-white px-3 py-1 rounded text-sm">💾 บันทึก</button>
                <button @click="cancelEdit" class="bg-gray-400 text-white px-3 py-1 rounded text-sm">❌ ยกเลิก</button>
              </div>
            </template>

            <template v-else>
              <div class="flex justify-between items-center">
                <div>
                  <h2 class="text-lg font-semibold">{{ patient.name }}</h2>
                  <p class="text-sm">📅 วันที่จอง: {{ patient.date }}</p>
                  <p class="text-xs text-gray-500">รหัส: #{{ patient.id }} | เพศ: {{ patient.gender }}</p>
                </div>
                <div class="flex gap-2">
                  <button @click="startEdit(patient)" class="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm">✏ แก้ไข</button>
                  <button @click="deletePatient(patient.id)" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">🗑 ลบ</button>
                </div>
              </div>
            </template>
          </div>
        </div>

        <div v-else class="text-center text-lg mt-10 text-red-600 dark:text-red-400">
          ❌ ไม่พบข้อมูลผู้รับวัคซีน
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@400;600&display=swap');
.font-kanit {
  font-family: 'Kanit', sans-serif;
}
@media print {
  button, input, select {
    display: none !important;
  }
}
</style>
