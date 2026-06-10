"use client"
import { callBackend } from "@/actions/backend-proxy"
import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import DropDownmenu from "@/components/ui/DropDownmenu"
import Tag from "@/components/ui/Tag"
import {updateSkills } from "@/lib/features/profile/studentProfileSlice"
import { Skill } from "@/lib/features/profile/types"

import { useAppDispatch } from "@/lib/hooks"
import { Edit, X } from "lucide-react"
import { useEffect, useState } from "react"

const Skills = ({skills}: {skills: Skill[]}) => {
    const dispatch = useAppDispatch();
    const [availableSkills, setAvailableSkills] = useState<Skill[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [edit, setEdit] = useState(false);

    const fetchAvailableSkills = async () => {

        try {
            const res = await callBackend("public/skill");
            if(!res.success) {
                throw new Error("Failed to fetch skills");
            }
            setAvailableSkills(res.data);
        }
        catch (error) {
            console.error("Error fetching skills:", error);
        }   
    }


    const addSkill = async (skillId: number | string | null) => {
        if(!skillId) return;
        try {
            const res = await callBackend("/student/profile/skill/"+skillId, "POST");
            if(!res.success) {
                throw new Error("Failed to add skill");
            }
            const newSkill = availableSkills.find((skill) => skill.id === skillId);
            if(newSkill) {
                dispatch(updateSkills([...skills, {id: newSkill.id, name: newSkill.name}]));
            } 
        }
        catch (error) {
            console.error("Error adding skill:", error);
        }
    }

    const removeSkill = async (skillId: number | string | null) => {
        if(!skillId) return;
        try {
            const res = await callBackend("/student/profile/skill/"+skillId, "DELETE");
            
            if(!res.success) {
                throw new Error("Failed to remove skill");
            }

            const updatedSkills = skills.filter((skill) => skill.id !== skillId);
            dispatch(updateSkills(updatedSkills));
        }
        catch (error) {
            console.error("Error removing skill:", error);
        }
    }

    const handleCancel = () => {
        setEdit(false);
    }

    useEffect(()=>{
        fetchAvailableSkills();
    }, [])

  return (
    <Card className="flex flex-col justify-between gap-4 p-6 border border-neutral-300 dark:border-neutral-600 overflow-visible">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-extrabold uppercase tracking-wider">
                Skills
            </h3> 
            <Button variant="ghost" className="px-4" onClick={() => {
                if(edit) {
                    handleCancel();
                } else {
                    setEdit(true);
                }
            }}>
                {edit ? <X className="size-4" /> : <Edit className="size-4"/>}
            </Button>
        </div>

        <div className="flex flex-wrap gap-2">
            {
                skills.map((skill) => (
                    <Tag
                    key={skill.id}
                    onClick={()=>{
                        if(!edit) return;
                        removeSkill(skill.id)
                    }}
                    className={`${edit ? "cursor-pointer hover:bg-red-500 text-white" : ""}`}
                >
                    {skill.name}
                    </Tag>
                ))
            }
            {
                edit && 
                <DropDownmenu
                    optoins={availableSkills.filter((option) => !skills.find((skill) => skill.id === option.id)).map((skill) => ({value: skill.id, label: skill.name}))}
                    onSelect={(value)=> addSkill(value)} 
                    placeholder="+ Add Skill"
                    isSearchable={true}
                    className="w-full bg-neutral-700"
                    listClassName="h-20"
                    selectedValue={null} 
                />
            }
        </div>
    </Card>
    )  
}

export default Skills