import useResumeStore from '../../store/useResumeStore'

function formatDate(dateStr) {
  if (!dateStr) return ''
  const [year, month] = dateStr.split('-')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
  return `${months[parseInt(month, 10) - 1]} ${year}`
}

const sectionLabels = {
  en: {
    summary: 'Professional Summary',
    experience: 'Work Experience',
    education: 'Education',
    projects: 'Projects',
    skills: 'Skills',
  },
  id: {
    summary: 'Ringkasan Profil',
    experience: 'Pengalaman Kerja',
    education: 'Pendidikan',
    projects: 'Proyek',
    skills: 'Keahlian',
  },
}

export default function ResumePreview() {
  const { personalInfo, experiences, educations, projects = [], skills } = useResumeStore()
  const template = personalInfo.template || 'classic'
  const photoShape = personalInfo.photoShape || 'circle'
  const labels = sectionLabels[personalInfo.language || 'en']
  const theme = {
    classic: { primary: '#1e293b', secondary: '#475569', border: '#cbd5e1', align: 'center', photo: 'mx-auto', headerBorder: '2px solid #1e293b' },
    modern: { primary: '#1d4ed8', secondary: '#2563eb', border: '#bfdbfe', align: 'left', photo: '', headerBorder: '4px solid #2563eb' },
    minimal: { primary: '#44403c', secondary: '#78716c', border: '#d6d3d1', align: 'center', photo: 'mx-auto grayscale', headerBorder: '1px solid #a8a29e' },
  }[template]
  const accentColor = personalInfo.accentColor || theme.primary

  const hasContent = personalInfo.fullName || personalInfo.summary ||
    experiences.some(e => e.company || e.position) ||
    educations.some(e => e.institution || e.degree) ||
    projects.some(project => project.name) ||
    skills.some(s => s.items)

  return (
    <div className="resume-preview bg-white shadow-lg border border-slate-200 mx-auto" style={{ width: '210mm', minHeight: '297mm', maxWidth: '100%', padding: '20mm 18mm', fontFamily: 'Georgia, "Times New Roman", serif' }}>
      {!hasContent ? (
        <div className="flex items-center justify-center h-64 text-slate-300">
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm">Mulai isi form di sebelah kiri untuk melihat preview CV Anda</p>
          </div>
        </div>
      ) : (
        <>
          {/* Header - Name & Contact */}
          {personalInfo.fullName && (
            <div className={`mb-1 ${theme.align === 'center' ? 'text-center' : 'text-left'} ${template === 'modern' ? 'flex items-center gap-4' : ''}`} style={{ borderBottom: `${template === 'modern' ? 4 : template === 'minimal' ? 1 : 2}px solid ${accentColor}`, paddingBottom: '12px' }}>
              {personalInfo.photo && (
                <img
                  src={personalInfo.photo}
                  alt={`Foto ${personalInfo.fullName}`}
                  className={`w-20 h-20 ${photoShape === 'circle' ? 'rounded-full' : 'rounded-none'} object-cover mb-2 ${template === 'modern' ? 'order-2 shrink-0 mb-0' : theme.photo}`}
                />
              )}
              <div className={template === 'modern' ? 'flex-1 min-w-0' : ''}>
                <h1 className="text-2xl font-bold tracking-wide" style={{ color: template === 'modern' ? accentColor : theme.primary, margin: '0 0 2px 0', fontSize: '22pt', letterSpacing: '1px' }}>
                  {personalInfo.fullName.toUpperCase()}
                </h1>
                {personalInfo.jobTitle && (
                  <p className="text-sm" style={{ color: template === 'modern' ? accentColor : theme.secondary, margin: '2px 0 6px 0', fontSize: '10pt', letterSpacing: '0.5px' }}>
                    {personalInfo.jobTitle}
                  </p>
                )}
                <div className={`flex flex-wrap gap-x-4 gap-y-1 ${theme.align === 'center' ? 'justify-center' : ''}`} style={{ fontSize: '9pt', color: '#64748b' }}>
                  {personalInfo.email && <span>{personalInfo.email}</span>}
                  {personalInfo.phone && <span>{personalInfo.phone}</span>}
                  {personalInfo.location && <span>{personalInfo.location}</span>}
                  {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
                </div>
              </div>
            </div>
          )}

          {/* Summary */}
          {personalInfo.summary && (
            <div style={{ marginTop: '14px' }}>
              <h2 style={{ fontSize: '11pt', fontWeight: 'bold', color: accentColor, textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: `1px solid ${accentColor}`, paddingBottom: '3px', marginBottom: '8px' }}>
                {labels.summary}
              </h2>
              <p style={{ fontSize: '10pt', lineHeight: '1.5', color: '#334155', textAlign: 'justify' }}>
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {experiences.some(e => e.company || e.position) && (
            <div style={{ marginTop: '14px' }}>
              <h2 style={{ fontSize: '11pt', fontWeight: 'bold', color: accentColor, textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: `1px solid ${accentColor}`, paddingBottom: '3px', marginBottom: '8px' }}>
                {labels.experience}
              </h2>
              {experiences.filter(e => e.company || e.position).map((exp) => (
                <div key={exp.id} style={{ marginBottom: '10px' }}>
                  <div className="flex justify-between items-baseline">
                    <div>
                      <span style={{ fontSize: '10.5pt', fontWeight: 'bold', color: '#1e293b' }}>{exp.position}</span>
                      {exp.company && <span style={{ fontSize: '10.5pt', color: '#1e293b' }}> — {exp.company}</span>}
                    </div>
                    <span style={{ fontSize: '9pt', color: '#64748b', whiteSpace: 'nowrap', flexShrink: 0 }}>
                      {formatDate(exp.startDate)}{exp.startDate && ' – '}{exp.current ? 'Sekarang' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && (
                    <ul style={{ margin: '4px 0 0 0', paddingLeft: '18px', fontSize: '9.5pt', lineHeight: '1.5', color: '#334155' }}>
                      {exp.description.split('\n').filter(line => line.trim()).map((line, i) => (
                        <li key={i} style={{ marginBottom: '2px' }}>{line.trim()}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {educations.some(e => e.institution || e.degree) && (
            <div style={{ marginTop: '14px' }}>
              <h2 style={{ fontSize: '11pt', fontWeight: 'bold', color: accentColor, textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: `1px solid ${accentColor}`, paddingBottom: '3px', marginBottom: '8px' }}>
                {labels.education}
              </h2>
              {educations.filter(e => e.institution || e.degree).map((edu) => (
                <div key={edu.id} style={{ marginBottom: '8px' }}>
                  <div className="flex justify-between items-baseline">
                    <div>
                      <span style={{ fontSize: '10.5pt', fontWeight: 'bold', color: '#1e293b' }}>{edu.institution}</span>
                    </div>
                    <span style={{ fontSize: '9pt', color: '#64748b', whiteSpace: 'nowrap', flexShrink: 0 }}>
                      {formatDate(edu.startDate)}{edu.startDate && ' – '}{formatDate(edu.endDate)}
                    </span>
                  </div>
                  <div style={{ fontSize: '9.5pt', color: '#334155' }}>
                    {edu.degree}{edu.field && `, ${edu.field}`}{edu.gpa && ` — IPK: ${edu.gpa}`}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects.some(project => project.name) && (
            <div style={{ marginTop: '14px' }}>
              <h2 style={{ fontSize: '11pt', fontWeight: 'bold', color: accentColor, textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: `1px solid ${accentColor}`, paddingBottom: '3px', marginBottom: '8px' }}>
                {labels.projects}
              </h2>
              {projects.filter(project => project.name).map((project) => (
                <div key={project.id} style={{ marginBottom: '10px' }}>
                  <div className="flex justify-between items-baseline">
                    <div>
                      <span style={{ fontSize: '10.5pt', fontWeight: 'bold', color: '#1e293b' }}>{project.name}</span>
                      {project.technologies && <span style={{ fontSize: '9.5pt', color: '#475569' }}> · {project.technologies}</span>}
                      {project.link && <span style={{ fontSize: '9pt', color: '#64748b' }}> · {project.link}</span>}
                    </div>
                    <span style={{ fontSize: '9pt', color: '#64748b', whiteSpace: 'nowrap', flexShrink: 0 }}>{formatDate(project.startDate)}{project.startDate && project.endDate && ' – '}{formatDate(project.endDate)}</span>
                  </div>
                  {project.description && (
                    <ul style={{ margin: '4px 0 0 0', paddingLeft: '18px', fontSize: '9.5pt', lineHeight: '1.5', color: '#334155' }}>
                      {project.description.split('\n').filter(line => line.trim()).map((line, i) => <li key={i} style={{ marginBottom: '2px' }}>{line.trim()}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {skills.some(s => s.items) && (
            <div style={{ marginTop: '14px' }}>
              <h2 style={{ fontSize: '11pt', fontWeight: 'bold', color: accentColor, textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: `1px solid ${accentColor}`, paddingBottom: '3px', marginBottom: '8px' }}>
                {labels.skills}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 24px' }}>
                {skills.filter(s => s.items).map((skill) => (
                  <div key={skill.id} style={{ fontSize: '9.5pt', color: '#334155' }}>
                    <span style={{ fontWeight: 'bold', color: '#1e293b' }}>{skill.category}: </span>
                    {skill.items}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
