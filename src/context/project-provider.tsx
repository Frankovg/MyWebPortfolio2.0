'use client'

import { Project } from "@prisma/client"
import { createContext, useOptimistic } from "react"

import { addProject, deleteProject, editProject } from "@/actions/actions"
import { ProjectEssentials } from "@/lib/types"

type ProjectContextProviderProps = {
  data: Project[],
  children: React.ReactNode,
}

type TProjectContext = {
  projects: Project[],
  handleCreateProject: (newProject: ProjectEssentials) => Promise<void>,
  handleDeleteProject: (projectId: Project['id']) => Promise<void>,
  handleEditProject: (projectId: Project['id'], newProjectData: ProjectEssentials) => Promise<void>,
}

export const ProjectContext = createContext<TProjectContext | null>(null)


// TODO: This is an example from other project

const ProjectContextProvider = ({ data, children }: ProjectContextProviderProps) => {
  // Optimistic UI -> to update automatically the UI (it works as a state)
  const [optimisticProjects, setOptimisticProjects] = useOptimistic(
    data,
    (prev, { action, payload }) => {
      switch (action) {
        case "add":
          return [...prev, { ...payload, id: Math.random().toString() }]
        case "edit":
          return prev.map(project => {
            if (project.id === payload.id) {
              return { ...project, ...payload.newProjectData }
            }
            return project
          })
        case "delete":
          return prev.filter(project => project.id !== payload)
        default:
          return prev
      }
    }
  )

  const handleCreateProject = async (newProject: ProjectEssentials) => {
    setOptimisticProjects({ action: "add", payload: newProject })
    const error = await addProject(newProject)
    // if (error) {
    //   toast.warning(error.message)
    //   return
    // }
  }

  const handleEditProject = async (projectId: Project['id'], newProjectData: ProjectEssentials) => {
    setOptimisticProjects({ action: "edit", payload: { id: projectId, newProjectData } })
    const error = await editProject(projectId, newProjectData)
    // if (error) {
    //   toast.warning(error.message)
    //   return
    // }
  }

  const handleDeleteProject = async (projectId: Project['id']) => {
    setOptimisticProjects({ action: "delete", payload: projectId })
    const error = await deleteProject(projectId)
    // if (error) {
    //   toast.warning(error.message)
    //   return
    // }
  }

  return (
    <ProjectContext.Provider value={{
      projects: optimisticProjects,
      handleCreateProject,
      handleEditProject,
      handleDeleteProject,
    }}>
      {children}
    </ProjectContext.Provider>
  )
}

export default ProjectContextProvider