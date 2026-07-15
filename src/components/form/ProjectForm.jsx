import { Calendar, Code2, FolderGit2, Link, Plus, Trash2 } from 'lucide-react'
import useResumeStore from '../../store/useResumeStore'

export default function ProjectForm() {
  const { projects, addProject, updateProject, removeProject } = useResumeStore()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FolderGit2 className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-semibold text-slate-800">Proyek</h2>
        </div>
        <button onClick={addProject} className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer">
          <Plus className="w-3.5 h-3.5" />
          Tambah
        </button>
      </div>

      {projects.map((project, index) => (
        <div key={project.id} className="p-4 border border-slate-200 rounded-xl space-y-3 relative bg-slate-50/50">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Proyek #{index + 1}</span>
            {projects.length > 1 && (
              <button onClick={() => removeProject(project.id)} aria-label={`Hapus proyek ${index + 1}`} className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer">
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-slate-600 mb-1.5"><FolderGit2 className="w-3.5 h-3.5" />Nama Proyek</label>
              <input type="text" value={project.name} onChange={(e) => updateProject(project.id, 'name', e.target.value)} placeholder="Contoh: Aplikasi Kasir" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-300 bg-white" />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-slate-600 mb-1.5"><Link className="w-3.5 h-3.5" />Tautan Proyek</label>
              <input type="url" value={project.link} onChange={(e) => updateProject(project.id, 'link', e.target.value)} placeholder="https://github.com/..." className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-300 bg-white" />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium text-slate-600 mb-1.5"><Code2 className="w-3.5 h-3.5" />Teknologi</label>
            <input type="text" value={project.technologies} onChange={(e) => updateProject(project.id, 'technologies', e.target.value)} placeholder="Contoh: React, Node.js, PostgreSQL" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-300 bg-white" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-slate-600 mb-1.5"><Calendar className="w-3.5 h-3.5" />Tanggal Mulai</label>
              <input type="month" value={project.startDate} onChange={(e) => updateProject(project.id, 'startDate', e.target.value)} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-white" />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-slate-600 mb-1.5"><Calendar className="w-3.5 h-3.5" />Tanggal Selesai</label>
              <input type="month" value={project.endDate} onChange={(e) => updateProject(project.id, 'endDate', e.target.value)} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-white" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-600 mb-1.5 block">Deskripsi Proyek</label>
            <textarea value={project.description} onChange={(e) => updateProject(project.id, 'description', e.target.value)} placeholder="Jelaskan fitur, peran, atau pencapaian. Tiap baris menjadi bullet point." rows={3} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-300 resize-none bg-white" />
          </div>
        </div>
      ))}
    </div>
  )
}
