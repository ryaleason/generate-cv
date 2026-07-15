import { User, Mail, Phone, MapPin, Calendar, FileText, Upload, X, Building, Signature, Layout } from 'lucide-react'
import useCoverLetterStore from '../../store/useCoverLetterStore'

export default function CoverLetterForm() {
  const { coverLetterInfo, updateCoverLetterInfo } = useCoverLetterStore()

  const handleSignatureUpload = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Silakan pilih file gambar.')
      return
    }

    const reader = new FileReader()
    reader.onload = () => updateCoverLetterInfo('signatureImage', reader.result)
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-6">
      {/* 0. Template Switcher */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <Layout className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-slate-800 text-sm">Pilih Template Surat</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => updateCoverLetterInfo('template', 'modern')}
            className={`px-4 py-3 text-xs font-semibold rounded-lg border transition-colors cursor-pointer text-center ${
              coverLetterInfo.template === 'modern'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-slate-200 text-slate-500 hover:bg-slate-50'
            }`}
          >
            Modern (Block Style)
          </button>
          <button
            onClick={() => updateCoverLetterInfo('template', 'biodata')}
            className={`px-4 py-3 text-xs font-semibold rounded-lg border transition-colors cursor-pointer text-center ${
              coverLetterInfo.template === 'biodata'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-slate-200 text-slate-500 hover:bg-slate-50'
            }`}
          >
            Klasik Biodata (Indonesian Style)
          </button>
        </div>
      </div>

      {/* 1. Pengirim */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <User className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-slate-800 text-sm">Informasi Pengirim</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 mb-1.5">
              Nama Pengirim
            </label>
            <input
              type="text"
              value={coverLetterInfo.senderName}
              onChange={(e) => updateCoverLetterInfo('senderName', e.target.value)}
              placeholder="Galih Perdana"
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
            />
            <label className="flex items-center gap-2 mt-2 cursor-pointer text-xs font-medium text-slate-600">
              <input
                type="checkbox"
                checked={coverLetterInfo.boldSenderName !== false}
                onChange={(e) => updateCoverLetterInfo('boldSenderName', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              Tebalkan (Bold) Nama Pengirim
            </label>
            <label className="flex items-center gap-2 mt-1.5 cursor-pointer text-xs font-medium text-slate-600">
              <input
                type="checkbox"
                checked={!!coverLetterInfo.underlineSenderName}
                onChange={(e) => updateCoverLetterInfo('underlineSenderName', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              Garis Bawahi (Underline) Nama Pengirim
            </label>
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 mb-1.5">
              Alamat Pengirim
            </label>
            <input
              type="text"
              value={coverLetterInfo.senderAddress}
              onChange={(e) => updateCoverLetterInfo('senderAddress', e.target.value)}
              placeholder="Jl. Desa 123, Bekasi 45678"
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
            />
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 mb-1.5">
              No. Telepon
            </label>
            <input
              type="tel"
              value={coverLetterInfo.senderPhone}
              onChange={(e) => updateCoverLetterInfo('senderPhone', e.target.value)}
              placeholder="+628xxxxxxxxxx"
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
            />
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={coverLetterInfo.senderEmail}
              onChange={(e) => updateCoverLetterInfo('senderEmail', e.target.value)}
              placeholder="galih.perdana@gmail.com"
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
            />
          </div>
        </div>
      </div>

      {/* 2. Detail Surat */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-slate-800 text-sm">Detail Surat</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 mb-1.5">
              Tempat, Tanggal Surat
            </label>
            <input
              type="text"
              value={coverLetterInfo.letterDate}
              onChange={(e) => updateCoverLetterInfo('letterDate', e.target.value)}
              placeholder="Jakarta, 25 April 202X"
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
            />
          </div>
          <div className="md:col-span-1">
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 mb-1.5">
              {coverLetterInfo.template === 'biodata' ? 'Hal' : 'Perihal'}
            </label>
            <input
              type="text"
              value={coverLetterInfo.letterSubject}
              onChange={(e) => updateCoverLetterInfo('letterSubject', e.target.value)}
              placeholder="Lamaran Kerja..."
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
            />
          </div>
          {coverLetterInfo.template !== 'biodata' && (
            <div className="md:col-span-1">
              <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 mb-1.5">
                Lampiran
              </label>
              <input
                type="text"
                value={coverLetterInfo.letterEnclosure}
                onChange={(e) => updateCoverLetterInfo('letterEnclosure', e.target.value)}
                placeholder="1 halaman CV"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
              />
            </div>
          )}
        </div>
      </div>

      {/* 2.5 Biodata & Lampiran Fields (Hanya untuk template Biodata) */}
      {coverLetterInfo.template === 'biodata' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-slate-800 text-sm">Data Biodata & Lampiran</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 mb-1.5">
                Tempat, Tanggal Lahir
              </label>
              <input
                type="text"
                value={coverLetterInfo.birthPlaceDate}
                onChange={(e) => updateCoverLetterInfo('birthPlaceDate', e.target.value)}
                placeholder="Bekasi, 15 Mei 1998"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 mb-1.5">
                Jenis Kelamin
              </label>
              <input
                type="text"
                value={coverLetterInfo.gender}
                onChange={(e) => updateCoverLetterInfo('gender', e.target.value)}
                placeholder="Laki-laki / Perempuan"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 mb-1.5">
                Pendidikan Terakhir
              </label>
              <input
                type="text"
                value={coverLetterInfo.lastEducation}
                onChange={(e) => updateCoverLetterInfo('lastEducation', e.target.value)}
                placeholder="S1 Teknik Industri"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
              />
            </div>
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 mb-1.5">
              Daftar Lampiran (Tiap Baris Baru = 1 Lampiran)
            </label>
            <textarea
              value={coverLetterInfo.attachments}
              onChange={(e) => updateCoverLetterInfo('attachments', e.target.value)}
              placeholder="Curriculum Vitae (CV)&#10;Fotokopi Ijazah Terakhir"
              rows={6}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white resize-y"
            />
          </div>
        </div>
      )}

      {/* 3. Penerima Surat */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <Building className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-slate-800 text-sm">Penerima Surat</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 mb-1.5">
              Kepada Yth. (Nama/Jabatan)
            </label>
            <textarea
              value={coverLetterInfo.recipientName}
              onChange={(e) => updateCoverLetterInfo('recipientName', e.target.value)}
              placeholder="Kepada Yth.,&#10;HRD PT Produksi Pelangi"
              rows={2}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white resize-none"
            />
            <label className="flex items-center gap-2 mt-2 cursor-pointer text-xs font-medium text-slate-600">
              <input
                type="checkbox"
                checked={coverLetterInfo.boldRecipientName !== false}
                onChange={(e) => updateCoverLetterInfo('boldRecipientName', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              Tebalkan (Bold) Penerima
            </label>
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 mb-1.5">
              Alamat Perusahaan
            </label>
            <textarea
              value={coverLetterInfo.recipientAddress}
              onChange={(e) => updateCoverLetterInfo('recipientAddress', e.target.value)}
              placeholder="Jl. Industri No. 456&#10;Karawang 789012"
              rows={2}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white resize-none"
            />
          </div>
        </div>
      </div>

      {/* 4. Isi Surat */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-slate-800 text-sm">Isi Surat</h3>
        </div>
        <div className="space-y-3">
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 mb-1.5">
              Salam Pembuka
            </label>
            <input
              type="text"
              value={coverLetterInfo.salutation}
              onChange={(e) => updateCoverLetterInfo('salutation', e.target.value)}
              placeholder="Dengan Hormat,"
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
            />
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 mb-1.5">
              Paragraf Pembuka (Paragraf 1)
            </label>
            <textarea
              value={coverLetterInfo.bodyParagraph1}
              onChange={(e) => updateCoverLetterInfo('bodyParagraph1', e.target.value)}
              placeholder="Dengan ini saya mengajukan lamaran kerja..."
              rows={3}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white resize-y"
            />
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 mb-1.5">
              {coverLetterInfo.template === 'biodata' ? 'Paragraf Pengantar Biodata (Paragraf 2 - Opsional)' : 'Paragraf Isi (Paragraf 2)'}
            </label>
            <textarea
              value={coverLetterInfo.bodyParagraph2}
              onChange={(e) => updateCoverLetterInfo('bodyParagraph2', e.target.value)}
              placeholder={coverLetterInfo.template === 'biodata' ? "Saya yang bertanda tangan di bawah ini :" : "Saya memiliki latar belakang pendidikan..."}
              rows={3}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white resize-y"
            />
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 mb-1.5">
              Paragraf Penutup (Paragraf 3)
            </label>
            <textarea
              value={coverLetterInfo.bodyParagraph3}
              onChange={(e) => updateCoverLetterInfo('bodyParagraph3', e.target.value)}
              placeholder="Terlampir bersama surat lamaran ini..."
              rows={3}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white resize-y"
            />
          </div>
        </div>
      </div>

      {/* 5. Tanda Tangan */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <Signature className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-slate-800 text-sm">Salam Penutup & Tanda Tangan</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 mb-1.5">
              Salam Penutup
            </label>
            <input
              type="text"
              value={coverLetterInfo.closingSalutation}
              onChange={(e) => updateCoverLetterInfo('closingSalutation', e.target.value)}
              placeholder="Hormat saya,"
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 mb-2 cursor-pointer text-xs font-medium text-slate-600">
              <input
                type="checkbox"
                checked={coverLetterInfo.showSignature}
                onChange={(e) => updateCoverLetterInfo('showSignature', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              Tampilkan Tanda Tangan
            </label>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 mb-1.5">
            <Upload className="w-3.5 h-3.5" />
            Upload Gambar Tanda Tangan
          </label>
          <div className="flex items-center gap-3">
            {coverLetterInfo.signatureImage ? (
              <div className="relative border border-slate-200 rounded-lg p-2 bg-white flex items-center justify-center max-w-[150px] h-[80px]">
                <img
                  src={coverLetterInfo.signatureImage}
                  alt="Tanda Tangan"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ) : (
              <div className="w-[150px] h-[80px] rounded-lg bg-slate-100 border border-dashed border-slate-300 flex items-center justify-center">
                <Signature className="w-6 h-6 text-slate-400" />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer w-max">
                <Upload className="w-3.5 h-3.5" />
                Upload Tanda Tangan
                <input type="file" accept="image/*" onChange={handleSignatureUpload} className="hidden" />
              </label>
              {coverLetterInfo.signatureImage && (
                <button
                  type="button"
                  onClick={() => updateCoverLetterInfo('signatureImage', '')}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer w-max"
                >
                  <X className="w-3.5 h-3.5" />
                  Hapus
                </button>
              )}
            </div>
          </div>
          <p className="mt-1.5 text-[11px] text-slate-400">Gunakan file gambar PNG/JPG transparan agar tampilan tanda tangan lebih natural.</p>
        </div>
      </div>
    </div>
  )
}
