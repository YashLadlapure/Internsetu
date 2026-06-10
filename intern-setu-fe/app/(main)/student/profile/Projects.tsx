"use client"
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { callBackend } from '@/actions/backend-proxy'
import { useAppDispatch } from '@/lib/hooks'
import { removeProject } from '@/lib/features/profile/studentProfileSlice'
import { Project } from '@/lib/features/profile/types'
import { useState } from 'react'
import AddProjectModal from './AddProjectModel'

const Projects = ({ projects}: {projects: Project[]}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useAppDispatch();

    const deleteProject = async (projectId: string | number) => {
        try {
            const res = await callBackend("/student/profile/project/"+projectId, "DELETE");
            if (res.success) {
                console.log("Project deleted successfully");
                dispatch(removeProject(projectId));
            } else {
                throw new Error(res.data || "Failed to delete project");
            }
        }
        catch (error) {
            console.error("Error deleting project:", error);
        }
    }


  return (
    <Card className="p-6 border border-neutral-300 dark:border-neutral-600">
        {
            isModalOpen && <AddProjectModal onClose={() => setIsModalOpen(false)} />
        }

        <div className='flex justify-between items-center mb-6'> 
            <h3 className="text-xs font-extrabold uppercase tracking-wider">
                Projects
            </h3>
            <Button variant="secondary" className='px-4' onClick={()=>setIsModalOpen(true)}>
                + Add New Project
            </Button>
        </div>
         
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
  
        {projects.map((project) => (
            <Card
                key={project.id}
                className="flex justify-between items-center rounded-2xl p-6 bg-neutral-300 border-neutral-200 dark:bg-neutral-700 dark:border-neutral-600"
            >
                <div className="w-full flex flex-col h-full gap-4">
                    <div className=" flex justify-between items-start gap-3">
                        <h4 className="font-bold text-xl text-neutral-900 dark:text-neutral-100 line-clamp-2 flex-1">
                            {project.name}
                        </h4>
                        <Button 
                            variant="secondary" 
                            className="px-3 py-1.5 text-xs font-medium hover:bg-red-500 hover:text-white transition-colors shrink-0"
                            onClick={() => deleteProject(project.id)}
                        >
                            Delete
                        </Button>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3 flex-1">
                        {project.description}
                    </p>
                </div>
            </Card>
            ))}
        </div>
    </Card>
  )
}

export default Projects