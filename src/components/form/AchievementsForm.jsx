import { Trophy, Plus, Trash2, Calendar, Award, FileText } from 'lucide-react'
import useResumeStore from '../../store/useResumeStore'

export default function AchievementsForm() {
  const { achievements = [], addAchievement, updateAchievement, removeAchievement } = useResumeStore()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-rose-600" />
          <h2 className="text-lg font-semibold text-slate-800">Prestasi & Penghargaan</h2>
        </div>
        <button
          onClick={addAchievement}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          Tambah
        </button>
      </div>

      {achievements.map((ach, index) => (
        <div key={ach.id} className="p-4 border border-slate-200 rounded-xl space-y-3 relative bg-slate-50/50">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Prestasi #{index + 1}</span>
            {achievements.length > 1 && (
              <button
                onClick={() => removeAchievement(ach.id)}
                className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium text-slate-600 mb-1.5">
              <Award className="w-3.5 h-3.5" />
              Nama Penghargaan / Prestasi
            </label>
            <input
              type="text"
              value={ach.title}
              onChange={(e) => updateAchievement(ach.id, 'title', e.target.value)}
              placeholder="Juara 1 Hackathon Nasional"
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all placeholder:text-slate-300 bg-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-slate-600 mb-1.5 block">Pemberi Penghargaan / Penyelenggara</label>
              <input
                type="text"
                value={ach.issuer}
                onChange={(e) => updateAchievement(ach.id, 'issuer', e.target.value)}
                placeholder="Kementerian Ristekdikti"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all placeholder:text-slate-300 bg-white"
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-slate-600 mb-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Tanggal / Bulan
              </label>
              <input
                type="month"
                value={ach.date}
                onChange={(e) => updateAchievement(ach.id, 'date', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all bg-white"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium text-slate-600 mb-1.5">
              <FileText className="w-3.5 h-3.5" />
              Deskripsi Singkat (Opsional)
            </label>
            <textarea
              value={ach.description}
              onChange={(e) => updateAchievement(ach.id, 'description', e.target.value)}
              placeholder="Jelaskan detail prestasi Anda atau kriteria lomba (misal: mengalahkan 500+ peserta dari seluruh Indonesia)"
              rows={2}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all placeholder:text-slate-300 resize-none bg-white"
            />
          </div>
        </div>
      ))}
    </div>
  )
}
