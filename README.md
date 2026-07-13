<div align="center">

# 📄 ATS-ResumeBuilder

**Bangun CV profesional ber-format ATS-Friendly, langsung di browser kamu — tanpa server, tanpa database, 100% privat.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-informational)](#)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-Build%20Tool-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Zustand](https://img.shields.io/badge/State-Zustand-orange)](https://zustand-demo.pmnd.rs)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#-kontribusi)

[Demo Langsung](#) · [Laporkan Bug](#) · [Ajukan Fitur](#)

</div>

---

## 📚 Daftar Isi

- [Deskripsi Proyek](#-deskripsi-proyek)
- [Demo](#-demo)
- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#️-tech-stack)
- [Instalasi & Menjalankan Secara Lokal](#-instalasi--menjalankan-secara-lokal)
- [Cara Penggunaan](#-cara-penggunaan)
- [Struktur Folder](#-struktur-folder)
- [Kontribusi](#-kontribusi)
- [Lisensi](#-lisensi)

---

## 📌 Deskripsi Proyek

**ATS-ResumeBuilder** adalah aplikasi web untuk membuat CV/Resume profesional dengan format **ATS-Friendly (Harvard-style)** — rapi, bersih, dan yang terpenting: **teksnya tetap bisa dibaca dan di-*parse*** oleh sistem pelacak pelamar (*Applicant Tracking System*) yang digunakan oleh HR di berbagai perusahaan.

Berbeda dari kebanyakan pembuat CV lain, proyek ini dibangun dengan prinsip **client-side first**:

> 🔐 Tidak ada backend. Tidak ada database. Data yang kamu ketik **tidak pernah meninggalkan browser-mu.**

Cocok untuk kamu yang:
- Ingin membuat CV cepat tanpa perlu registrasi/login.
- Peduli dengan privasi data pribadi (riwayat kerja, kontak, dll).
- Butuh CV yang lolos filter otomatis ATS, bukan sekadar cantik di mata manusia.

---

## 🎬 Demo

<div align="center">

**🔗 Live Demo:** [https://ats-resumebuilder.vercel.app](#) &nbsp;*(placeholder — ganti dengan link deployment kamu)*

<!-- Ganti baris di bawah ini dengan screenshot atau GIF asli aplikasi kamu -->
<img src="./docs/preview.gif" alt="Preview ATS-ResumeBuilder" width="800"/>

*Contoh alur: isi form di sisi kiri → preview CV real-time di sisi kanan → export ke PDF.*

</div>

> 💡 **Catatan:** Simpan screenshot/GIF demo kamu di folder `docs/` lalu update path gambar di atas.

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|---|---|
| 🔒 **No Database, No Backend** | Seluruh aplikasi berjalan di sisi klien. Data pengguna **tidak pernah dikirim ke server manapun**, menjamin privasi 100%. |
| 💾 **Auto-Save (Local Persistence)** | Setiap perubahan otomatis tersimpan ke `LocalStorage` browser. Refresh atau tutup tab? Data kamu tetap aman. |
| ⚡ **Real-time Preview** | Perubahan pada form langsung terlihat di preview CV tanpa delay — WYSIWYG sepenuhnya. |
| 📄 **True PDF Export** | Ekspor PDF menggunakan *native rendering* via `@react-pdf/renderer`, **bukan** screenshot HTML/Canvas. Hasilnya: teks di PDF tetap *selectable* dan terbaca sempurna oleh mesin ATS. |
| 📱 **Responsive UI** | Antarmuka aplikasi menyesuaikan baik di desktop maupun mobile. |
| 🎓 **Desain Harvard-Style** | Tipografi Serif elegan, divider garis yang jelas, dan layout grid 2 kolom untuk bagian *skills* — format yang disukai ATS dan recruiter. |

---

## 🛠️ Tech Stack

| Kategori | Teknologi |
|---|---|
| **Framework Frontend** | [React.js](https://react.dev) + [Vite](https://vitejs.dev) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com) JANGAN GUNAKAN EMOJI | GUNAKAN ICON LUCIDE REACT SUDAH SAYA INSTALLKAN |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs) (dengan middleware `persist`) |
| **PDF Generator** | [`@react-pdf/renderer`](https://react-pdf.org/) |
| **Deployment** | Vercel / Netlify / GitHub Pages |

---

## 🚀 Instalasi & Menjalankan Secara Lokal

### Prasyarat

Pastikan environment kamu sudah memiliki:

- **Node.js** `v18.x` atau lebih baru — [unduh di sini](https://nodejs.org/)
- **npm**, **yarn**, atau **pnpm** (pilih salah satu package manager)
- **Git**

Cek versi Node.js kamu:

```bash
node -v
```

### Langkah-langkah

**1. Clone repository**

```bash
git clone https://github.com/ryaleason/ats-resumebuilder.git
cd ats-resumebuilder
```

**2. Install dependencies**

```bash
npm install
# atau
yarn install
# atau
pnpm install
```

**3. Jalankan development server**

```bash
npm run dev
```

Setelah berhasil, buka browser dan akses:

```
http://localhost:5173
```

**4. Build untuk production**

Jika ingin membuat versi production (hasil build akan ada di folder `dist/`):

```bash
npm run build
```

**5. Preview hasil build (opsional)**

Untuk memastikan hasil build berjalan normal sebelum deploy:

```bash
npm run preview
```

> ⚙️ **Tips:** Karena proyek ini 100% client-side, kamu bisa deploy folder `dist/` ke platform *static hosting* apa pun — Vercel, Netlify, GitHub Pages, Cloudflare Pages, dll — tanpa konfigurasi server tambahan.

---

## 📖 Cara Penggunaan

1. **Isi Data Diri** — Lengkapi form di panel kiri: identitas, ringkasan profil, pengalaman kerja, pendidikan, dan skills.
2. **Pantau Preview Real-time** — Setiap ketikan langsung tercermin di panel preview CV di sisi kanan, sehingga kamu bisa melihat hasil akhirnya sebelum export.
3. **Jangan Khawatir Data Hilang** — Semua isian otomatis tersimpan ke `LocalStorage`. Kamu bisa menutup tab dan melanjutkan kapan saja.
4. **Export ke PDF** — Klik tombol **"Export PDF"**. File yang dihasilkan menggunakan rendering PDF asli sehingga teksnya tetap bisa di-*copy* dan dibaca oleh sistem ATS perusahaan.
5. **Reset Form (opsional)** — Gunakan tombol reset jika ingin mulai dari form kosong.

---

## 📁 Struktur Folder

```
ats-resumebuilder/
├── public/
│   └── favicon.svg
├── docs/
│   └── preview.gif                # Screenshot/GIF demo untuk README
├── src/
│   ├── assets/                    # Font, ikon, gambar statis
│   ├── components/
│   │   ├── form/                  # Komponen input form CV
│   │   │   ├── PersonalInfoForm.jsx
│   │   │   ├── ExperienceForm.jsx
│   │   │   ├── EducationForm.jsx
│   │   │   └── SkillsForm.jsx
│   │   ├── preview/                # Komponen preview CV real-time
│   │   │   └── ResumePreview.jsx
│   │   ├── pdf/                    # Definisi dokumen untuk @react-pdf/renderer
│   │   │   └── ResumePDFDocument.jsx
│   │   └── ui/                     # Komponen UI reusable (Button, Input, dsb)
│   ├── store/
│   │   └── useResumeStore.js       # Zustand store + middleware persist
│   ├── hooks/                      # Custom React hooks
│   ├── utils/                      # Helper & formatter
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                   # Entry point Tailwind CSS
├── .env.example
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🤝 Kontribusi

Kontribusi dari siapa pun sangat diapresiasi! 🎉 Berikut alurnya:

1. **Fork** repository ini.
2. Buat branch baru untuk fitur/perbaikan kamu:
   ```bash
   git checkout -b fitur/nama-fitur-kamu
   ```
3. Lakukan perubahan, lalu commit dengan pesan yang jelas:
   ```bash
   git commit -m "feat: menambahkan fitur X"
   ```
4. Push ke branch kamu:
   ```bash
   git push origin fitur/nama-fitur-kamu
   ```
5. Buka **Pull Request** ke branch `main` di repository ini, jelaskan perubahan yang kamu buat.

### Panduan Tambahan

- Pastikan kode sudah melewati linting sebelum PR (`npm run lint`).
- Gunakan format commit message yang deskriptif (disarankan mengikuti [Conventional Commits](https://www.conventionalcommits.org/)).
- Untuk perubahan besar, buka **Issue** terlebih dahulu untuk didiskusikan sebelum mulai coding.
- Laporkan bug atau ajukan ide fitur baru lewat tab **[Issues](../../issues)**.

---

## 📜 Lisensi

Proyek ini dilisensikan di bawah **MIT License** — bebas digunakan, dimodifikasi, dan didistribusikan ulang, baik untuk kebutuhan pribadi maupun komersial.

```
MIT License

Copyright (c) 2026 ryaleason

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

Lihat file [`LICENSE`](./LICENSE) untuk teks lengkap.

---

<div align="center">

Dibuat dengan ☕ oleh [**ryaleason**](https://github.com/ryaleason)

⭐ Kalau proyek ini bermanfaat, jangan lupa kasih *star* di GitHub!

</div>