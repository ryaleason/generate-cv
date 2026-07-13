import { User, Mail, Phone, MapPin, Link, FileText, Upload, X } from 'lucide-react'
import useResumeStore from '../../store/useResumeStore'

export default function PersonalInfoForm() {
  const { personalInfo, updatePersonalInfo } = useResumeStore()

  const handlePhotoUpload = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Silakan pilih file gambar.')
      return
    }

    const reader = new FileReader()
    reader.onload = () => updatePersonalInfo('photo', reader.result)
    reader.readAsDataURL(file)
  }

  const fields = [
    { key: 'fullName', label: 'Nama Lengkap', icon: User, placeholder: 'John Doe', type: 'text' },
    { key: 'jobTitle', label: 'Posisi / Job Title', icon: FileText, placeholder: 'Software Engineer', type: 'text' },
    { key: 'email', label: 'Email', icon: Mail, placeholder: 'john@example.com', type: 'email' },
    { key: 'phone', label: 'No. Telepon', icon: Phone, placeholder: '+62 812 xxxx xxxx', type: 'tel' },
    { key: 'location', label: 'Lokasi', icon: MapPin, placeholder: 'Jakarta, Indonesia', type: 'text' },
    { key: 'linkedin', label: 'LinkedIn URL', icon: Link, placeholder: 'linkedin.com/in/username', type: 'url' },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <User className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-slate-800">Data Pribadi</h2>
      </div>

      <div>
        <label className="flex items-center gap-1.5 text-sm font-medium text-slate-600 mb-1.5">
          <Upload className="w-3.5 h-3.5" />
          Foto Profil
        </label>
        <div className="flex items-center gap-3">
          {personalInfo.photo ? (
            <img
              src={personalInfo.photo}
              alt="Foto profil"
              className={`w-16 h-16 ${(personalInfo.photoShape || 'circle') === 'circle' ? 'rounded-full' : 'rounded-none'} object-cover border border-slate-200`}
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-slate-100 border border-dashed border-slate-300 flex items-center justify-center">
              <User className="w-6 h-6 text-slate-400" />
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            <label className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              Upload Foto
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            </label>
            {personalInfo.photo && (
              <button
                type="button"
                onClick={() => updatePersonalInfo('photo', '')}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                Hapus
              </button>
            )}
          </div>
        </div>
        <p className="mt-1.5 text-[11px] text-slate-400">Gunakan foto JPG, PNG, atau WebP dengan rasio 1:1 (kotak) agar hasil PDF rapi.</p>
        {personalInfo.photo && (
          <div className="mt-3">
            <p className="text-xs font-medium text-slate-600 mb-1.5">Bentuk Foto</p>
            <div className="flex gap-2">
              {[
                { value: 'circle', label: 'Lingkaran', className: 'rounded-full' },
                { value: 'square', label: 'Kotak', className: 'rounded-none' },
              ].map(({ value, label, className }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => updatePersonalInfo('photoShape', value)}
                  className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                    (personalInfo.photoShape || 'circle') === value
                      ? 'border-slate-700 bg-slate-100 text-slate-800'
                      : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <span className={`w-4 h-4 bg-slate-500 ${className}`} />
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map(({ key, label, icon: Icon, placeholder, type }) => (
          <div key={key} className={key === 'fullName' || key === 'jobTitle' ? 'md:col-span-2' : ''}>
            <label className="flex items-center gap-1.5 text-sm font-medium text-slate-600 mb-1.5">
              <Icon className="w-3.5 h-3.5" />
              {label}
            </label>
            <input
              type={type}
              value={personalInfo[key]}
              onChange={(e) => updatePersonalInfo(key, e.target.value)}
              placeholder={placeholder}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-300"
            />
          </div>
        ))}
      </div>

      <div>
        <label className="flex items-center gap-1.5 text-sm font-medium text-slate-600 mb-1.5">
          <FileText className="w-3.5 h-3.5" />
          Ringkasan Profil
        </label>
        <textarea
          value={personalInfo.summary}
          onChange={(e) => updatePersonalInfo('summary', e.target.value)}
          placeholder="Tuliskan ringkasan singkat tentang diri Anda, keahlian, dan tujuan karir..."
          rows={4}
          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-300 resize-none"
        />
      </div>
    </div>
  )
}
