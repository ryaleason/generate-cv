import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const initialState = {
  coverLetterInfo: {
    template: 'modern', // 'modern' (Block Style) or 'biodata' (Classic Indonesian Biodata Style)
    senderName: 'Galih Perdana',
    senderAddress: 'Jl. Desa 123, Bekasi 45678',
    senderPhone: '+628xxxxxxxxxx',
    senderEmail: 'galih.perdana@gmail.com',
    letterDate: 'Jakarta, 25 April 202X',
    letterSubject: 'Lamaran Kerja untuk Posisi Staff Pabrik',
    letterEnclosure: '1 halaman CV',
    recipientName: 'Kepada Yth.,\nHRD PT Produksi Pelangi',
    recipientAddress: 'Jl. Industri No. 456\nKarawang 789012',
    salutation: 'Dengan Hormat,',
    bodyParagraph1: 'Dengan ini saya mengajukan lamaran kerja untuk bergabung dalam perusahaan yang Bapak/Ibu pimpin. Saya tertarik untuk melamar posisi yang tersedia di pabrik manufaktur di perusahaan Bapak/Ibu.',
    bodyParagraph2: 'Saya memiliki latar belakang pendidikan dan pengalaman kerja yang relevan di bidang manufaktur. Selama 5 tahun terakhir, saya telah bekerja di PT Produksi Warna untuk mengelola proses produksi, memastikan kualitas produk, dan menjaga keamanan di tempat kerja.',
    bodyParagraph3: 'Terlampir bersama surat lamaran ini adalah riwayat hidup dan daftar keterampilan saya yang rinci. Saya siap untuk menjalani proses seleksi lebih lanjut dan berdiskusi lebih lanjut mengenai bagaimana saya dapat memberikan kontribusi yang berarti bagi perusahaan. Terima kasih atas perhatian Bapak/Ibu dan kesempatan untuk melamar posisi di perusahaan ini.',
    closingSalutation: 'Hormat saya,',
    signatureImage: '',
    showSignature: true,
    boldSenderName: true,
    underlineSenderName: false,
    boldRecipientName: true,
    
    // Biodata Template Fields
    birthPlaceDate: 'Bekasi, 15 Mei 1998',
    gender: 'Laki-laki',
    lastEducation: 'S1 Teknik Industri',
    attachments: 'Curriculum Vitae (CV)\nFotokopi Ijazah Terakhir\nFotokopi Transkrip Nilai\nFotokopi Kartu Identitas (KTP)\nFotokopi Surat Keterangan Catatan Kepolisian (SKCK)\nFotokopi Surat Keterangan Berbadan Sehat dari Dokter\nFotokopi Sertifikat\nPasfoto Terbaru ukuran 3x4 (3 Lembar)',
  }
}

const useCoverLetterStore = create(
  persist(
    (set) => ({
      ...initialState,

      updateCoverLetterInfo: (field, value) =>
        set((state) => ({
          coverLetterInfo: { ...state.coverLetterInfo, [field]: value },
        })),

      resetAll: () => set({ ...initialState }),
    }),
    {
      name: 'cover-letter-storage',
    }
  )
)

export default useCoverLetterStore
