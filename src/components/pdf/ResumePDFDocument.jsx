import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    padding: '20mm 18mm',
    fontSize: 10,
    fontFamily: 'Times-Roman',
    color: '#334155',
    lineHeight: 1.4,
  },
  headerContainer: {
    textAlign: 'center',
    borderBottom: '2pt solid #1e293b',
    paddingBottom: 10,
    marginBottom: 4,
  },
  photo: {
    width: 60,
    height: 60,
    objectFit: 'cover',
    borderRadius: 30,
    alignSelf: 'center',
    marginBottom: 6,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    lineHeight: 1.25,
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 10,
    color: '#475569',
    lineHeight: 1.25,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 12,
    fontSize: 8.5,
    color: '#64748b',
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1e293b',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    borderBottom: '0.5pt solid #cbd5e1',
    paddingBottom: 3,
    marginBottom: 6,
    marginTop: 12,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 2,
  },
  entryTitle: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  entrySubtitle: {
    fontSize: 10.5,
    color: '#1e293b',
  },
  entryDate: {
    fontSize: 9,
    color: '#64748b',
  },
  entryDetail: {
    fontSize: 9.5,
    color: '#334155',
    marginBottom: 2,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 2,
    paddingLeft: 4,
  },
  bullet: {
    width: 10,
    fontSize: 9.5,
    color: '#334155',
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
    color: '#334155',
    lineHeight: 1.4,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillItem: {
    width: '50%',
    fontSize: 9.5,
    color: '#334155',
    marginBottom: 4,
    paddingRight: 12,
  },
  skillCategory: {
    fontWeight: 'bold',
    color: '#1e293b',
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#334155',
    textAlign: 'justify',
  },
  entryContainer: {
    marginBottom: 8,
  },
})

function formatDate(dateStr) {
  if (!dateStr) return ''
  const [year, month] = dateStr.split('-')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
  return `${months[parseInt(month, 10) - 1]} ${year}`
}

function normalizeSummary(text) {
  return text.replace(/\s+/g, ' ').trim()
}

const sectionLabels = {
  en: {
    summary: 'Professional Summary',
    experience: 'Work Experience',
    education: 'Education',
    projects: 'Projects',
    skills: 'Skills',
    achievements: 'Achievements & Awards',
  },
  id: {
    summary: 'Ringkasan Profil',
    experience: 'Pengalaman Kerja',
    education: 'Pendidikan',
    projects: 'Proyek',
    skills: 'Keahlian',
    achievements: 'Prestasi & Penghargaan',
  },
}

export default function ResumePDFDocument({ data }) {
  const { personalInfo, experiences, educations, projects = [], skills, achievements = [] } = data
  const template = personalInfo.template || 'classic'
  const photoShape = personalInfo.photoShape || 'circle'
  const labels = sectionLabels[personalInfo.language || 'en']
  const theme = {
    classic: { primary: '#1e293b', secondary: '#475569', border: '#cbd5e1', headerBorder: '2pt solid #1e293b', align: 'center' },
    modern: { primary: '#1d4ed8', secondary: '#2563eb', border: '#bfdbfe', headerBorder: '4pt solid #2563eb', align: 'left' },
    minimal: { primary: '#44403c', secondary: '#78716c', border: '#d6d3d1', headerBorder: '1pt solid #a8a29e', align: 'center' },
  }[template]
  const accentColor = personalInfo.accentColor || theme.primary

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        {personalInfo.fullName && (
          <View style={[styles.headerContainer, { borderBottom: `${template === 'modern' ? 4 : template === 'minimal' ? 1 : 2}pt solid ${accentColor}`, textAlign: theme.align, flexDirection: template === 'modern' ? 'row' : 'column', alignItems: template === 'modern' ? 'center' : undefined }]}>
            <View style={template === 'modern' ? { flex: 1 } : undefined}>
              {template !== 'modern' && personalInfo.photo && <Image src={personalInfo.photo} style={[styles.photo, { alignSelf: 'center', borderRadius: photoShape === 'circle' ? 30 : 0 }]} />}
              <Text style={[styles.name, { color: template === 'modern' ? accentColor : theme.primary }]}>{personalInfo.fullName}</Text>
              {personalInfo.jobTitle && (
                <Text style={[styles.jobTitle, { color: template === 'modern' ? accentColor : theme.secondary }]}>{personalInfo.jobTitle}</Text>
              )}
              <View style={[styles.contactRow, { justifyContent: theme.align === 'center' ? 'center' : 'flex-start' }]}>
                {personalInfo.email && <Text>{personalInfo.email}</Text>}
                {personalInfo.phone && <Text>{personalInfo.phone}</Text>}
                {personalInfo.location && <Text>{personalInfo.location}</Text>}
                {personalInfo.linkedin && <Text>{personalInfo.linkedin}</Text>}
              </View>
            </View>
            {template === 'modern' && personalInfo.photo && <Image src={personalInfo.photo} style={[styles.photo, { marginBottom: 0, marginLeft: 12, borderRadius: photoShape === 'circle' ? 30 : 0 }]} />}
          </View>
        )}

        {/* Summary */}
        {personalInfo.summary && (
          <View>
            <Text style={[styles.sectionTitle, { color: accentColor, borderBottomColor: accentColor }]}>{labels.summary}</Text>
            <Text style={styles.summary}>{normalizeSummary(personalInfo.summary)}</Text>
          </View>
        )}

        {/* Experience */}
        {experiences.some(e => e.company || e.position) && (
          <View>
            <Text style={[styles.sectionTitle, { color: accentColor, borderBottomColor: accentColor }]}>{labels.experience}</Text>
            {experiences.filter(e => e.company || e.position).map((exp) => (
              <View key={exp.id} style={styles.entryContainer}>
                <View style={styles.entryHeader}>
                  <Text style={{ flex: 1, marginRight: 10 }}>
                    <Text style={styles.entryTitle}>{exp.position}</Text>
                    {exp.company && <Text style={styles.entrySubtitle}> – {exp.company}</Text>}
                  </Text>
                  <Text style={styles.entryDate}>
                    {formatDate(exp.startDate)}{exp.startDate ? ' – ' : ''}{exp.current ? 'Sekarang' : formatDate(exp.endDate)}
                  </Text>
                </View>
                {exp.description && exp.description.split('\n').filter(line => line.trim()).map((line, i) => (
                  <View key={i} style={styles.bulletItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>{line.trim()}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {educations.some(e => e.institution || e.degree) && (
          <View>
            <Text style={[styles.sectionTitle, { color: accentColor, borderBottomColor: accentColor }]}>{labels.education}</Text>
            {educations.filter(e => e.institution || e.degree).map((edu) => (
              <View key={edu.id} style={styles.entryContainer}>
                <View style={styles.entryHeader}>
                  <Text style={[styles.entryTitle, { flex: 1, marginRight: 10 }]}>{edu.institution}</Text>
                  <Text style={styles.entryDate}>
                    {formatDate(edu.startDate)}{edu.startDate ? ' – ' : ''}{formatDate(edu.endDate)}
                  </Text>
                </View>
                <Text style={styles.entryDetail}>
                  {edu.degree}{edu.field ? `, ${edu.field}` : ''}{edu.gpa ? ` – IPK: ${edu.gpa}` : ''}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {projects.some(project => project.name) && (
          <View>
            <Text style={[styles.sectionTitle, { color: accentColor, borderBottomColor: accentColor }]}>{labels.projects}</Text>
            {projects.filter(project => project.name).map((project) => (
              <View key={project.id} style={styles.entryContainer}>
                <View style={styles.entryHeader}>
                  <Text style={{ flex: 1, marginRight: 10 }}>
                    <Text style={styles.entryTitle}>{project.name}</Text>
                    {project.technologies && <Text style={{ fontSize: 9.5, color: '#475569' }}> · {project.technologies}</Text>}
                  </Text>
                  <Text style={styles.entryDate}>{formatDate(project.startDate)}{project.startDate && project.endDate ? ' – ' : ''}{formatDate(project.endDate)}</Text>
                </View>
                {project.link && <Text style={styles.entryDetail}>{project.link}</Text>}
                {project.description && project.description.split('\n').filter(line => line.trim()).map((line, i) => (
                  <View key={i} style={styles.bulletItem}><Text style={styles.bullet}>•</Text><Text style={styles.bulletText}>{line.trim()}</Text></View>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Achievements */}
        {achievements.some(ach => ach.title) && (
          <View>
            <Text style={[styles.sectionTitle, { color: accentColor, borderBottomColor: accentColor }]}>{labels.achievements}</Text>
            {achievements.filter(ach => ach.title).map((ach) => (
              <View key={ach.id} style={styles.entryContainer}>
                <View style={styles.entryHeader}>
                  <Text style={{ flex: 1, marginRight: 10 }}>
                    <Text style={styles.entryTitle}>{ach.title}</Text>
                    {ach.issuer && <Text style={{ fontSize: 9.5, color: '#475569' }}> – {ach.issuer}</Text>}
                  </Text>
                  <Text style={styles.entryDate}>{formatDate(ach.date)}</Text>
                </View>
                {ach.description && <Text style={styles.entryDetail}>{ach.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills.some(s => s.items) && (
          <View>
            <Text style={[styles.sectionTitle, { color: accentColor, borderBottomColor: accentColor }]}>{labels.skills}</Text>
            <View style={styles.skillsGrid}>
              {skills.filter(s => s.items).map((skill) => (
                <View key={skill.id} style={styles.skillItem}>
                  <Text>
                    <Text style={styles.skillCategory}>{skill.category}: </Text>
                    {skill.items}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  )
}
