<template>
  <section class="page">
    <h1>Status Layanan</h1>

    <p v-if="loading">Memuat data dari Laravel...</p>

    <p v-else-if="error" class="error">
      Tidak bisa menghubungi backend Laravel di
      <code>{{ apiUrl }}</code>. Pastikan server Laravel sedang berjalan.
      <br />
      <small>{{ error }}</small>
    </p>

    <template v-else>
      <div class="summary" v-if="summary">
        <span>Online: {{ summary.online ?? 0 }}</span>
        <span>Offline: {{ summary.offline ?? 0 }}</span>
        <span>Maintenance: {{ summary.maintenance ?? 0 }}</span>
      </div>

      <table>
        <thead>
          <tr><th>ID</th><th>Nama</th><th>Status</th><th>Diperbarui</th></tr>
        </thead>
        <tbody>
          <tr v-for="s in services" :key="s.id">
            <td>{{ s.id }}</td>
            <td>{{ s.name }}</td>
            <td><span :class="statusBadgeClass(s.status)">{{ s.status }}</span></td>
            <td>{{ s.updated_at }}</td>
          </tr>
        </tbody>
      </table>

      <p class="last-updated" v-if="lastUpdated">Terakhir sinkron: {{ lastUpdated }}</p>
    </template>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { statusBadgeClass } from '../utils/status'

const apiUrl = import.meta.env.VITE_API_URL
const services = ref([])
const summary = ref(null)
const lastUpdated = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const res = await fetch(`${apiUrl}/api/services`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    services.value = data.services ?? []
    summary.value = data.summary ?? null
    lastUpdated.value = data.lastUpdated ?? null
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
th, td { text-align: left; padding: 0.5rem; border-bottom: 1px solid #ddd; }
.summary { display: flex; gap: 1rem; margin: 1rem 0; font-weight: 600; }
.badge { padding: 0.15rem 0.6rem; border-radius: 999px; font-size: 0.85rem; color: white; }
.badge--online { background: #16a34a; }
.badge--offline { background: #dc2626; }
.badge--maintenance { background: #d97706; }
.error { color: #b91c1c; }
.last-updated { color: #666; font-size: 0.85rem; }
</style>
