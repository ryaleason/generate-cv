import { useState, useCallback } from 'react'
import { pdf } from '@react-pdf/renderer'
import { Analytics } from '@vercel/analytics/react'
import { FileDown, RotateCcw, FileText, ChevronDown, ChevronUp, Eye, EyeOff, Globe, Monitor, Smartphone } from 'lucide-react'
import PersonalInfoForm from './components/form/PersonalInfoForm'
import ExperienceForm from './components/form/ExperienceForm'
import EducationForm from './components/form/EducationForm'
import SkillsForm from './components/form/SkillsForm'
import TemplateForm from './components/form/TemplateForm'
import ResumePreview from './components/preview/ResumePreview'
import ResumePDFDocument from './components/pdf/ResumePDFDocument'
import useResumeStore from './store/useResumeStore'

function InstagramIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function App() {
  const store = useResumeStore()
  const [exporting, setExporting] = useState(false)
  const [viewMode, setViewMode] = useState('desktop')
  const [showPreview, setShowPreview] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    template: true,
    personal: true,
    experience: true,
    education: true,
    skills: true,
  })

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const handleExportPDF = useCallback(async () => {
    setExporting(true)
    try {
      // Read the latest Zustand snapshot so the exported PDF always uses the
      // template, photo, and form values currently shown in the preview.
      const currentStore = useResumeStore.getState()
      const data = {
        personalInfo: currentStore.personalInfo,
        experiences: currentStore.experiences,
        educations: currentStore.educations,
        skills: currentStore.skills,
      }
      const blob = await pdf(<ResumePDFDocument data={data} />).toBlob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${currentStore.personalInfo.fullName || 'Resume'}_CV.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('PDF export failed:', err)
      alert('Gagal mengekspor PDF. Silakan coba lagi.')
    } finally {
      setExporting(false)
    }
  }, [])

  const handleReset = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus semua data? Tindakan ini tidak dapat dibatalkan.')) {
      store.resetAll()
    }
  }

  const sections = [
    { key: 'template', component: <TemplateForm /> },
    { key: 'personal', component: <PersonalInfoForm /> },
    { key: 'experience', component: <ExperienceForm /> },
    { key: 'education', component: <EducationForm /> },
    { key: 'skills', component: <SkillsForm /> },
  ]

  return (
    <div className={`min-h-screen bg-slate-100 ${viewMode === 'desktop' ? 'min-w-[1100px]' : ''}`}>
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div>
              <h1 className="text-sm font-bold text-slate-800 leading-tight">ResumeBuilder</h1>
              <p className="text-[10px] text-slate-400 leading-tight">Gausa bingung ngedit cv</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="lg:hidden flex items-center rounded-lg bg-slate-100 p-0.5">
              <button
                type="button"
                onClick={() => setViewMode('desktop')}
                aria-pressed={viewMode === 'desktop'}
                className={`flex items-center gap-1 px-2 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  viewMode === 'desktop' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                Desktop
              </button>
              <button
                type="button"
                onClick={() => {
                  setViewMode('mobile')
                  setShowPreview(false)
                }}
                aria-pressed={viewMode === 'mobile'}
                className={`flex items-center gap-1 px-2 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  viewMode === 'mobile' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                Mobile
              </button>
            </div>

            {viewMode === 'mobile' && (
              <button
                type="button"
                onClick={() => setShowPreview((current) => !current)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                {showPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                {showPreview ? 'Editor' : 'Preview'}
              </button>
            )}

            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            <button
              onClick={handleExportPDF}
              disabled={exporting}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5" />
              {exporting ? 'Mengekspor...' : 'Export PDF'}
            </button>
          </div>
        </div>
      </header>

      <div className="border-b border-slate-200 bg-white px-4 py-2 text-center text-xs text-slate-500">
        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <span>Created by ryaleason</span>
          <span className="text-slate-300">•</span>
          <a
            href="https://www.instagram.com/ryaleason_/"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            <span className="inline-flex items-center gap-1">
              <InstagramIcon className="w-3.5 h-3.5" />
              Instagram @ryaleason_
            </span>
          </a>
          <span className="text-slate-300">•</span>
          <a
            href="https://gabrialfitrah.dev/"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            <span className="inline-flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" />
              gabrialfitrah.dev
            </span>
          </a>
        </p>
      </div>

      {/* Main Layout */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6">
        <div className={`flex gap-6 ${viewMode === 'desktop' ? 'flex-row' : 'flex-col'}`}>
          {/* Left Panel - Form Editor */}
          <div className={`${viewMode === 'desktop' ? 'w-[480px] shrink-0' : 'w-full'} space-y-4 ${viewMode === 'mobile' && showPreview ? 'hidden' : ''}`}>
            {sections.map(({ key, component }) => (
              <div key={key} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <button
                  onClick={() => toggleSection(key)}
                  className="w-full px-5 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span className="text-sm font-medium text-slate-700">
                    {key === 'template' && 'Pilih Template CV'}
                    {key === 'personal' && 'Data Pribadi'}
                    {key === 'experience' && 'Pengalaman Kerja'}
                    {key === 'education' && 'Pendidikan'}
                    {key === 'skills' && 'Keahlian'}
                  </span>
                  {expandedSections[key] ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>
                {expandedSections[key] && (
                  <div className="px-5 pb-5">
                    {component}
                  </div>
                )}
              </div>
            ))}

            {/* Auto-save indicator */}
            <div className="text-center py-2">
              <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                Data tersimpan otomatis di browser
              </p>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className={`flex-1 min-w-0 ${viewMode === 'mobile' && !showPreview ? 'hidden' : ''}`}>
            <div className="sticky top-20">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-medium text-slate-500 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  Live Preview
                </h2>
                <span className="text-[10px] text-slate-400">Format: Harvard ATS-Friendly</span>
              </div>
              <div className="overflow-auto rounded-xl shadow-lg" style={{ maxHeight: 'calc(100vh - 140px)' }}>
                <ResumePreview />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Analytics />

    </div>
  )
}

export default App
