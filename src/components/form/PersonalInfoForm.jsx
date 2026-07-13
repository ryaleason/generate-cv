import { User, Mail, Phone, MapPin, Link, FileText } from 'lucide-react'
import useResumeStore from '../../store/useResumeStore'

export default function PersonalInfoForm() {
  const { personalInfo, updatePersonalInfo } = useResumeStore()

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
