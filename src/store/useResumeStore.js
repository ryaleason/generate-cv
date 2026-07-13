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
  skills: [
    { id: crypto.randomUUID(), category: 'Technical Skills', items: '' },
    { id: crypto.randomUUID(), category: 'Soft Skills', items: '' },
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

      // Reset
      resetAll: () => set({ ...initialState }),
    }),
    {
      name: 'ats-resume-storage',
    }
  )
)

export default useResumeStore
