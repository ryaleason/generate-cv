import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const initialState = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    summary: '',
    photo: '',
    photoShape: 'circle',
    template: 'classic',
    accentColor: '',
    language: 'en',
  },
  experiences: [
    {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    },
  ],
  educations: [
    {
      id: crypto.randomUUID(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
    },
  ],
  projects: [
    {
      id: crypto.randomUUID(),
      name: '',
      link: '',
      technologies: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  ],
  skills: [
    { id: crypto.randomUUID(), category: 'Technical Skills', items: '' },
    { id: crypto.randomUUID(), category: 'Soft Skills', items: '' },
  ],
  achievements: [
    {
      id: crypto.randomUUID(),
      title: '',
      issuer: '',
      date: '',
      description: '',
    },
  ],
}

const useResumeStore = create(
  persist(
    (set) => ({
      ...initialState,

      // Personal Info
      updatePersonalInfo: (field, value) =>
        set((state) => ({
          personalInfo: { ...state.personalInfo, [field]: value },
        })),

      updateTemplate: (template) =>
        set((state) => ({
          personalInfo: { ...state.personalInfo, template },
        })),

      // Experience
      addExperience: () =>
        set((state) => ({
          experiences: [
            ...state.experiences,
            {
              id: crypto.randomUUID(),
              company: '',
              position: '',
              startDate: '',
              endDate: '',
              current: false,
              description: '',
            },
          ],
        })),
      updateExperience: (id, field, value) =>
        set((state) => ({
          experiences: state.experiences.map((exp) =>
            exp.id === id ? { ...exp, [field]: value } : exp
          ),
        })),
      removeExperience: (id) =>
        set((state) => ({
          experiences: state.experiences.filter((exp) => exp.id !== id),
        })),

      // Education
      addEducation: () =>
        set((state) => ({
          educations: [
            ...state.educations,
            {
              id: crypto.randomUUID(),
              institution: '',
              degree: '',
              field: '',
              startDate: '',
              endDate: '',
              gpa: '',
            },
          ],
        })),
      updateEducation: (id, field, value) =>
        set((state) => ({
          educations: state.educations.map((edu) =>
            edu.id === id ? { ...edu, [field]: value } : edu
          ),
        })),
      removeEducation: (id) =>
        set((state) => ({
          educations: state.educations.filter((edu) => edu.id !== id),
        })),

      // Projects
      addProject: () =>
        set((state) => ({
          projects: [
            ...state.projects,
            {
              id: crypto.randomUUID(),
              name: '',
              link: '',
              technologies: '',
              startDate: '',
              endDate: '',
              description: '',
            },
          ],
        })),
      updateProject: (id, field, value) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id ? { ...project, [field]: value } : project
          ),
        })),
      removeProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
        })),

      // Skills
      addSkillCategory: () =>
        set((state) => ({
          skills: [
            ...state.skills,
            { id: crypto.randomUUID(), category: '', items: '' },
          ],
        })),
      updateSkill: (id, field, value) =>
        set((state) => ({
          skills: state.skills.map((skill) =>
            skill.id === id ? { ...skill, [field]: value } : skill
          ),
        })),
      removeSkillCategory: (id) =>
        set((state) => ({
          skills: state.skills.filter((skill) => skill.id !== id),
        })),

      // Achievements
      addAchievement: () =>
        set((state) => ({
          achievements: [
            ...(state.achievements || []),
            {
              id: crypto.randomUUID(),
              title: '',
              issuer: '',
              date: '',
              description: '',
            },
          ],
        })),
      updateAchievement: (id, field, value) =>
        set((state) => ({
          achievements: (state.achievements || []).map((ach) =>
            ach.id === id ? { ...ach, [field]: value } : ach
          ),
        })),
      removeAchievement: (id) =>
        set((state) => ({
          achievements: (state.achievements || []).filter((ach) => ach.id !== id),
        })),

      // Reset
      resetAll: () => set({ ...initialState }),
    }),
    {
      name: 'ats-resume-storage',
    }
  )
)

export default useResumeStore
