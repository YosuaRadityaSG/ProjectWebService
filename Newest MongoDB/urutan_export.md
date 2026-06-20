# 🚂🎉 Panduan Import Database KAI (Kereta Api Indonesia) 🎉🚂

Selamat datang di panduan setup database sistem pemesanan tiket kereta! 🎫✨
Dokumen ini akan memandu kamu melakukan proses _import_ data secara berurutan dari file JSON yang sudah disiapkan.

> ⚠️ **PENTING:** Urutan import di bawah ini sangat krusial! Pastikan kamu mengikutinya dari nomor 1 sampai 7 agar tidak ada relasi data yang _error_ atau hilang (_referential integrity_).

---

## 📋 Urutan Eksekusi Import Collection

Silakan lakukan _import_ data secara berurutan sesuai daftar di bawah ini. _(Kamu bisa mencentangnya di dalam hatimu saat sudah selesai!)_ 😉

- [ ] **1. `users`** 👤 — _Data master pengguna aplikasi. Harus ada pertama kali!_
- [ ] **2. `trains`** 🚆 — _Data master armada kereta api._
- [ ] **3. `stations`** 🚉 — _Data master stasiun keberangkatan & tujuan._
- [ ] **4. `schedules`** 🗓️ — _Jadwal kereta (Bergantung pada `trains` & `stations`)._
- [ ] **5. `bookings`** 🛒 — _Data pesanan (Bergantung pada `users` & `schedules`)._
- [ ] **6. `tickets`** 🎟️ — _Data tiket fisik/digital (Dihasilkan dari `bookings`)._
- [ ] **7. `payments`** 💳 — _Data transaksi (Langkah terakhir untuk menyelesaikan pesanan)._

---

## 🛠️ Cara Import Data

Kamu bisa memilih salah satu dari dua cara di bawah ini untuk memasukkan data ke dalam MongoDB.

### 🌟 Opsi A: Menggunakan MongoDB Compass (GUI)

_Sangat disarankan jika kamu ingin tinggal klik-klik saja._

1. Buka **MongoDB Compass** dan hubungkan ke koneksi lokal/server kamu.
2. Buat database baru bernama **`KAI`** (jika belum ada).
3. Buat _collection_ pertama bernama `users`.
4. Masuk ke _collection_ `users`, lalu klik tombol hijau **Add Data** ➡️ **Import JSON or CSV file**.
5. Pilih file `users.json` kamu, biarkan formatnya JSON, lalu klik **Import**.
6. **Ulangi langkah 3-5** untuk _collections_ berikutnya sesuai urutan di atas!

### 💻 Opsi B: Menggunakan Terminal (CLI)

_Sangat disarankan jika kamu merasa seperti hacker sejati._ 🕶️

Buka **Terminal** atau **Command Prompt** (Pastikan kamu tidak berada di dalam `mongosh`), lalu jalankan perintah ini satu per satu secara berurutan:

```bash
# 1. Import Users
mongoimport --db=KAI --collection=users --file=users.json --jsonArray

# 2. Import Trains
mongoimport --db=KAI --collection=trains --file=trains.json --jsonArray

# 3. Import Stations
mongoimport --db=KAI --collection=stations --file=stations.json --jsonArray

# 4. Import Schedules
mongoimport --db=KAI --collection=schedules --file=schedules.json --jsonArray

# 5. Import Bookings
mongoimport --db=KAI --collection=bookings --file=bookings.json --jsonArray

# 6. Import Tickets
mongoimport --db=KAI --collection=tickets --file=tickets.json --jsonArray

# 7. Import Payments
mongoimport --db=KAI --collection=payments --file=payments.json --jsonArray
```
