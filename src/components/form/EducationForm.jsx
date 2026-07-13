import { GraduationCap, Plus, Trash2, BookOpen, Calendar } from 'lucide-react'
import useResumeStore from '../../store/useResumeStore'

export default function EducationForm() {
  const { educations, addEducation, updateEducation, removeEducation } = useResumeStore()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-violet-600" />
          <h2 className="text-lg font-semibold text-slate-800">Pendidikan</h2>
        </div>
        <button
          onClick={addEducation}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-violet-700 bg-violet-50 hover:bg-violet-100 rounded-lg transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          Tambah
        </button>
      </div>

      {educations.map((edu, index) => (
        <div key={edu.id} className="p-4 border border-slate-200 rounded-xl space-y-3 relative bg-slate-50/50">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Pendidikan #{index + 1}</span>
            {educations.length > 1 && (
              <button
                onClick={() => removeEducation(edu.id)}
                className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium text-slate-600 mb-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              Institusi / Universitas
            </label>
            <input
              type="text"
              value={edu.institution}
              onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
              placeholder="Universitas Indonesia"
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all placeholder:text-slate-300 bg-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-slate-600 mb-1.5 block">Gelar</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                placeholder="Sarjana (S1)"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all placeholder:text-slate-300 bg-white"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600 mb-1.5 block">Bidang Studi</label>
              <input
                type="text"
                value={edu.field}
                onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                placeholder="Teknik Informatika"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all placeholder:text-slate-300 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-slate-600 mb-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Mulai
              </label>
              <input
                type="month"
                value={edu.startDate}
                onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all bg-white"
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-slate-600 mb-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Selesai
              </label>
              <input
                type="month"
                value={edu.endDate}
                onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all bg-white"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600 mb-1.5 block">IPK</label>
              <input
                type="text"
                value={edu.gpa}
                onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                placeholder="3.85"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all placeholder:text-slate-300 bg-white"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
