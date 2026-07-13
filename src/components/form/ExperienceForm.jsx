import { Briefcase, Plus, Trash2, Building2, Calendar } from 'lucide-react'
import useResumeStore from '../../store/useResumeStore'

export default function ExperienceForm() {
  const { experiences, addExperience, updateExperience, removeExperience } = useResumeStore()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-semibold text-slate-800">Pengalaman Kerja</h2>
        </div>
        <button
          onClick={addExperience}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          Tambah
        </button>
      </div>

      {experiences.map((exp, index) => (
        <div key={exp.id} className="p-4 border border-slate-200 rounded-xl space-y-3 relative bg-slate-50/50">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Pengalaman #{index + 1}</span>
            {experiences.length > 1 && (
              <button
                onClick={() => removeExperience(exp.id)}
                className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-slate-600 mb-1.5">
                <Building2 className="w-3.5 h-3.5" />
                Perusahaan
              </label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                placeholder="Nama perusahaan"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-300 bg-white"
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-slate-600 mb-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                Posisi
              </label>
              <input
                type="text"
                value={exp.position}
                onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                placeholder="Jabatan / posisi"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-300 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-slate-600 mb-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Tanggal Mulai
              </label>
              <input
                type="month"
                value={exp.startDate}
                onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-white"
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-slate-600 mb-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Tanggal Selesai
              </label>
              <input
                type="month"
                value={exp.endDate}
                onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                disabled={exp.current}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all disabled:opacity-50 disabled:bg-slate-100 bg-white"
              />
              <label className="flex items-center gap-2 mt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                />
                <span className="text-xs text-slate-500">Masih bekerja di sini</span>
              </label>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-600 mb-1.5 block">Deskripsi Pekerjaan</label>
            <textarea
              value={exp.description}
              onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
              placeholder="Jelaskan tanggung jawab dan pencapaian Anda. Gunakan bullet points (tiap baris baru = 1 bullet point)"
              rows={3}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-300 resize-none bg-white"
            />
          </div>
        </div>
      ))}
    </div>
  )
}
