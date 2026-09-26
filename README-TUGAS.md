# Tugas P4 — Frontend Vue untuk Laravel

## 1. Backend Laravel (poin 1 & 20%)

1. Salin `laravel-snippet/app/Http/Controllers/Api/ServiceController.php`
   ke `app/Http/Controllers/Api/ServiceController.php` di repo Laravel kalian.
2. Tambahkan isi `laravel-snippet/routes-api-tambahan.php` ke `routes/api.php`.
3. Pastikan CORS mengizinkan origin dev Vue. Di `config/cors.php`:
   ```php
   'paths' => ['api/*'],
   'allowed_origins' => ['http://localhost:5173'],
   ```
4. Jalankan: `php artisan serve --port=8001`
   → `GET http://127.0.0.1:8001/api/services` harus mengembalikan JSON
   persis format di soal (`success`, `services[]`, `summary`, `lastUpdated`).

## 2. Frontend Vue (poin 2, 20%)

1. Salin folder `frontend/` ke dalam repo `evolusi-pl-NIM` kalian (sejajar
   dengan folder Laravel-nya).
2. `cd frontend && cp .env.example .env` — isi `VITE_API_URL` sesuai alamat
   Laravel kalian.
3. `npm install`
4. `npm run dev` → buka `http://localhost:5173`, cek halaman **Beranda**
   (statis) dan **Layanan** (mengambil data dari Laravel).

## 3. Workflow CI/CD (poin 3–5, 20% + 10%)

`.github/workflows/ci.yml` sudah punya 4 job berantai lewat `needs:`:
`lint → test → build → deploy-pages` (+ `deploy-vercel` untuk bonus).

- `npm ci` + `cache: 'npm'` sudah dipasang di semua job.
- `deploy-pages` dan `deploy-vercel` punya
  `if: github.ref == 'refs/heads/main' && github.event_name == 'push'`
  → di Pull Request, kedua job ini otomatis **skipped**, sementara
  lint/test/build tetap jalan.
- Keduanya memakai `actions/download-artifact@v4` untuk mengambil `dist/`
  dari job `build`, lalu mencetak isinya (`find dist -type f`) sebagai
  bukti tidak ada build ulang.
- Sebelum dipakai: aktifkan **Settings → Pages → Source: GitHub Actions**
  di repo kalian.

`package-lock.json` **wajib** ikut di-commit — jangan taruh di `.gitignore`.

## 4. Unit test (poin 6, 15%)

`frontend/tests/status.spec.js` menguji `src/utils/status.js` secara
langsung (tidak lewat `fetch`), jadi lulus di Actions walau Laravel tidak
dijalankan sama sekali.

## 5. Bukti yang perlu discreenshot (poin 7)

- Buka Pull Request → lihat `deploy-pages`/`deploy-vercel` berstatus
  **Skipped**, sedangkan lint/test/build hijau.
- Rusak sementara satu assertion di `status.spec.js` → push → pipeline
  berhenti merah di job `test`, job sesudahnya tidak jalan.
- Screenshot halaman **Layanan** menampilkan data asli dari Laravel.
- Log job `deploy-pages`/`deploy-vercel` yang mencetak isi `dist/`.

## 6. Bonus Vercel +30

- Buat project di Vercel, ambil `VERCEL_TOKEN`, simpan sebagai secret repo
  `VERCEL_TOKEN` (dan `VITE_API_URL` kalau backend produksinya beda alamat).
- **Matikan** Git Integration otomatis di dashboard Vercel (Settings →
  Git) supaya deploy hanya lewat Actions, tidak dobel dengan auto-deploy
  Vercel sendiri.
- `frontend/vercel.json` sudah berisi rewrite ke `index.html` supaya
  halaman `/services` tidak 404 saat di-refresh langsung.
- Pesan error jelas saat Laravel tidak terhubung sudah ada di
  `Services.vue` (blok `v-else-if="error"`).

## 7. Laporan PDF (poin 8, 20%)

Tulis laporan yang menjelaskan: cara `Services.vue` mengambil data lewat
`VITE_API_URL`, alur 4 job di `ci.yml`, cara `dist/` dioper antar-job lewat
artifact, cara kerja penjaga `if:` pada job deploy, dan kendala yang
kalian temui. Kalau mau, saya bisa bantu susun draftnya sebagai file Word
terpisah — tinggal bilang.
