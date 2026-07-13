import { Wrench, Plus, Trash2 } from 'lucide-react'
import useResumeStore from '../../store/useResumeStore'

export default function SkillsForm() {
  const { skills, addSkillCategory, updateSkill, removeSkillCategory } = useResumeStore()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Wrench className="w-5 h-5 text-amber-600" />
          <h2 className="text-lg font-semibold text-slate-800">Keahlian</h2>
        </div>
        <button
          onClick={addSkillCategory}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          Tambah Kategori
        </button>
      </div>

      {skills.map((skill, index) => (
        <div key={skill.id} className="p-4 border border-slate-200 rounded-xl space-y-3 bg-slate-50/50">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Kategori #{index + 1}</span>
            {skills.length > 1 && (
              <button
                onClick={() => removeSkillCategory(skill.id)}
                className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-slate-600 mb-1.5 block">Nama Kategori</label>
            <input
              type="text"
              value={skill.category}
              onChange={(e) => updateSkill(skill.id, 'category', e.target.value)}
              placeholder="Contoh: Technical Skills, Soft Skills, Languages"
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder:text-slate-300 bg-white"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-600 mb-1.5 block">Daftar Keahlian</label>
            <textarea
              value={skill.items}
              onChange={(e) => updateSkill(skill.id, 'items', e.target.value)}
              placeholder="Pisahkan dengan koma, contoh: JavaScript, React, Node.js, Python"
              rows={2}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder:text-slate-300 resize-none bg-white"
            />
          </div>
        </div>
      ))}
    </div>
  )
}
