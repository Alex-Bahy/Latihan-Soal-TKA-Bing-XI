# Ujian Online Latihan Soal Bahasa Inggris (Format TKA)

28 soal, 45 menit, kelas X, XI, XII SMK. Frontend statis (GitHub Pages) dan backend Google Apps Script yang menyimpan data ke Google Sheets.

## Isi repo
- `index.html` : tampilan ujian (tanpa soal dan tanpa kunci)
- `Code.gs` : backend (bank soal, kunci, penilaian di server)
- `.nojekyll`

## Deploy backend
1. Buka spreadsheet, **Extensions > Apps Script**, hapus isi bawaan, tempel `Code.gs`, simpan.
2. Pilih fungsi `setup`, klik **Run**, setujui izin. Sheet Hasil, Jawaban_Detail, Log_Pelanggaran, Sesi, Config, dan Rekap dibuat otomatis.
3. **Deploy > New deployment > Web app**. Execute as: *Me*. Who has access: *Anyone*. Salin URL yang berakhiran `/exec`.
4. Setiap kali `Code.gs` diubah, buat **New version / deployment baru** agar URL `/exec` memakai kode terbaru.

## Deploy frontend
1. Buka `index.html`, ganti `GANTI_DENGAN_URL_WEB_APP_/exec` pada konstanta `API_URL` dengan URL dari langkah di atas.
2. Push ke GitHub:
```
git init
git add .
git commit -m "Ujian TKA anti-nyontek"
git branch -M main
git remote add origin https://github.com/alex-bahy/NAMA-REPO.git
git push -u origin main
```
3. Di GitHub: **Settings > Pages > Branch: main, folder: / (root)**. Tautan siswa: `https://alex-bahy.github.io/NAMA-REPO/`.

## Pengaturan guru (sheet Config)
| Key | Fungsi |
|---|---|
| TOKEN | Kode akses ujian (ganti kapan saja) |
| DURASI_MENIT | Default 45 |
| MAKS_PELANGGARAN | Pelanggaran ke-N memicu auto-submit (default 3) |
| NAVIGASI_BEBAS | TRUE: siswa bisa kembali ke soal sebelumnya, ada grid nomor dan tombol ragu-ragu |
| TAMPILKAN_NILAI | TRUE: skor tampil setelah submit |
| UJIAN_AKTIF | FALSE untuk menutup ujian |

Menu **TKA** di spreadsheet: Setup Awal, Reset Sesi Siswa (izinkan ulang berdasarkan NIS), Rekap Otomatis.

## Keterbatasan
- Browser tidak bisa memblokir 100% screenshot, foto layar, atau HP kedua. Watermark nama dan NIS membantu pelacakan.
- iPhone tidak mendukung mode layar penuh pada Safari. Deteksi pindah tab tetap berjalan.
- Pemblokiran pintasan keyboard hanya sebatas yang diizinkan browser.
- Gunakan bersama pengawasan di ruangan untuk ujian bernilai tinggi.

## Checklist uji sebelum ujian
- [ ] Token salah ditolak
- [ ] Login dengan NIS uji, soal tampil acak dan tanpa kunci di Network tab
- [ ] Refresh di tengah ujian: waktu dan jawaban tetap
- [ ] Pindah tab 3x: auto-submit, status AUTO-SUBMIT PELANGGARAN
- [ ] Submit dua kali: hanya satu baris di Hasil
- [ ] Waktu habis: terkirim otomatis
- [ ] Skor di Hasil sesuai hitungan manual, lalu hapus data uji dan reset sesi
