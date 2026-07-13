import { Check, LayoutTemplate, Sparkles, Columns3 } from 'lucide-react'
import useResumeStore from '../../store/useResumeStore'

const templates = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Formal dan berpusat, cocok untuk semua bidang.',
    icon: LayoutTemplate,
    preview: 'bg-slate-800',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Tampilan tegas dengan aksen biru profesional.',
    icon: Sparkles,
    preview: 'bg-blue-600',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Bersih, sederhana, dan fokus pada isi.',
    icon: Columns3,
    preview: 'bg-stone-500',
  },
]

const templateColors = {
  classic: '#1e293b',
  modern: '#1d4ed8',
  minimal: '#44403c',
}

const accentColors = [
  { name: 'Merah', value: '#dc2626' },
  { name: 'Kuning', value: '#ca8a04' },
  { name: 'Hijau', value: '#16a34a' },
  { name: 'Biru', value: '#2563eb' },
  { name: 'Ungu', value: '#7c3aed' },
  { name: 'Ijo', value: '#65a30d' },
  { name: 'Oranye', value: '#ea580c' },
  { name: 'Hitam', value: '#1f2937' },
]

export default function TemplateForm() {
  const { personalInfo, updateTemplate, updatePersonalInfo } = useResumeStore()
  const activeTemplate = personalInfo.template || 'classic'
  const accentColor = personalInfo.accentColor || templateColors[activeTemplate]

  return (
    <div className="space-y-3 pt-1">
      <p className="text-xs text-slate-500">Pilih desain CV Anda. Pilihan ini juga digunakan saat export PDF.</p>
      <div className="grid gap-3">
        {templates.map(({ id, name, description, icon: Icon, preview }) => {
          const isActive = activeTemplate === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => updateTemplate(id)}
              className={`w-full flex items-center gap-3 rounded-lg border p-3 text-left transition-colors cursor-pointer ${
                isActive ? 'border-slate-700 bg-slate-50 ring-1 ring-slate-700' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className={`w-12 h-14 rounded-md p-2 shadow-sm ${preview}`}>
                <div className="h-1.5 w-5/6 bg-white/90 rounded mb-2" />
                <div className="h-1 w-full bg-white/60 rounded mb-1" />
                <div className="h-1 w-4/5 bg-white/60 rounded mb-1" />
                <div className="h-1 w-full bg-white/60 rounded" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                  <Icon className="w-4 h-4" />
                  {name}
                </div>
                <p className="mt-0.5 text-xs text-slate-400">{description}</p>
              </div>
              {isActive && <Check className="w-5 h-5 text-slate-700 shrink-0" />}
            </button>
          )
        })}
      </div>

      <div className="pt-2 border-t border-slate-100">
        <label className="block text-sm font-medium text-slate-600 mb-2">Bahasa CV</label>
        <div className="flex gap-2">
          {[
            { value: 'en', label: 'English' },
            { value: 'id', label: 'Indonesia' },
          ].map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => updatePersonalInfo('language', value)}
              className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                (personalInfo.language || 'en') === value
                  ? 'border-slate-700 bg-slate-100 text-slate-800'
                  : 'border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100">
        <label className="block text-sm font-medium text-slate-600 mb-2">Warna Aksen CV</label>
        <div className="flex flex-wrap items-center gap-2">
          {accentColors.map(({ name, value }) => (
            <button
              key={value}
              type="button"
              onClick={() => updatePersonalInfo('accentColor', value)}
              className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer ${
                accentColor === value ? 'border-slate-800 scale-110' : 'border-white shadow-sm hover:scale-105'
              }`}
              style={{ backgroundColor: value }}
              title={name}
              aria-label={`Pilih warna ${name}`}
            />
          ))}
          <button
            type="button"
            onClick={() => updatePersonalInfo('accentColor', '')}
            className="text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            Default template
          </button>
        </div>
      </div>
    </div>
  )
}
