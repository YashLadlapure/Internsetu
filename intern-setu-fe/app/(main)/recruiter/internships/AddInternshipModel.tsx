"use client"

import { callBackend } from "@/actions/backend-proxy"
import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import Input from "@/components/ui/Input"
import DropDownmenu from "@/components/ui/DropDownmenu"
import { X } from "lucide-react"
import { useEffect, useState } from "react"
import Tag from "@/components/ui/Tag"
import { Skill } from "@/lib/features/profile/types"
import { useAppDispatch } from "@/lib/hooks"
import { addEmployerInternship } from "@/lib/features/employer/employerSlice"

type EmployerCollege = {
    college: {
        id: number;
        name: string;
    };
};

const AddInternshipModal = ({ onClose }: { onClose: () => void }) => {

    const dispatch = useAppDispatch();

    const [collegeId, setCollegeId] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [salary, setSalary] = useState("")
    const [location, setLocation] = useState<"REMOTE" | "ON_SITE" | "HYBRID">("REMOTE")
    const [duration, setDuration] = useState("")
    const [startDate, setStartDate] = useState("")
    const [deadline, setDeadline] = useState("")
    const [availableSkills, setAvailableSkills] = useState<Skill[]>([]);
    const [requiredSkills, setRequiredSkills] = useState<number[]>([])
    const [applicationQuestions, setApplicationQuestions] = useState<string[]>([""])

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [colleges, setColleges] = useState<EmployerCollege[]>([])


    const fetchColleges = async () => {
        try {
            const res = await callBackend("/employer/college");

            if(!res.success) {
                throw new Error("Failed to fetch colleges");
            }
            console.log(res.data);
            
            setColleges(res.data);
        }
        catch (error) {
            return <div className="flex-1 flex justify-center items-center ">
                        Error fetching data
                </div>
        }
    }

    const fetchAvailableSkills = async () => {

        try {
            const res = await callBackend("public/skill");
            if(!res.success) {
                throw new Error("Failed to fetch skills");
            }
            setAvailableSkills(res.data);
            console.log(res.data);
            
        }
        catch (error) {
            console.error("Error fetching skills:", error);
        }   
    }

    useEffect(()=> {
        fetchColleges()
        fetchAvailableSkills()
    }, [])
    

    const handleSubmit = async () => {
        try {
            if (isLoading) return
            setIsLoading(true)
            setError(null)
            
            if (!collegeId) {
                setError("Please select a college")
                return
            }
            if (!title) {
                setError("Please enter title")
                return
            }

            const filteredQuestions = applicationQuestions.filter(q => q.trim())

            const res = await callBackend("/employer/internship", "POST", {
                collegeId,
                title,
                description,
                salary,
                location,
                duration,
                startDate,
                deadline,
                requiredSkills,
                applicationQuestions: filteredQuestions
            })

            if (!res.success) {
                throw new Error(res.data || "Failed to submit internship")
            }

            dispatch(addEmployerInternship(res.data));

            onClose()

        } catch (error) {
            setError("Failed to add internship. Please try again.")
            console.error("Error adding internship:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70">
            <div className="absolute inset-0" onClick={onClose}></div>

            <Card className="relative z-50 max-h-[80vh] overflow-y-auto min-w-80 p-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium pl-2">Post Internship</h2>
                    <Button variant="ghost" size="sm" onClick={onClose}>
                        <X />
                    </Button>
                </div>
                <div className="grid md:grid-cols-2 justify-center mt-4 gap-4">
                    <DropDownmenu
                        label="Select College"
                        placeholder="Select college"
                        optoins={colleges.map((college) => ({ 
                            label: college.college.name, 
                            value: college.college.id 
                        }))}
                        selectedValue={collegeId}
                        onSelect={(value) => setCollegeId(value ? value.toString() : "")}
                        className="bg-neutral-200 dark:bg-neutral-700"
                        listClassName="bg-neutral-200 dark:bg-neutral-700"
                    />
                    <Input 
                        type="text" 
                        onChange={(e) => setTitle(e.target.value)} 
                        value={title} 
                        label="Title" 
                        placeholder="Title"
                        className="bg-neutral-200 dark:bg-neutral-700"
                    />
                    <Input 
                        type="text" 
                        onChange={(e) => setDescription(e.target.value)} 
                        value={description} 
                        label="Description" 
                        placeholder="Description"
                        className="bg-neutral-200 dark:bg-neutral-700"
                    />
                    <Input 
                        type="number" 
                        onChange={(e) => setSalary(e.target.value)} 
                        value={salary} 
                        label="Salary" 
                        placeholder="Salary"
                        className="bg-neutral-200 dark:bg-neutral-700"
                    />
                    <DropDownmenu
                        label="Location"
                        placeholder="Select location"
                        optoins={[
                            { label: "Remote", value: "REMOTE" },
                            { label: "On Site", value: "ON_SITE" },
                            { label: "Hybrid", value: "HYBRID" },
                        ]}
                        selectedValue={location}
                        onSelect={(value) => setLocation(value as "REMOTE" | "ON_SITE" | "HYBRID")}
                        className="bg-neutral-200 dark:bg-neutral-700"
                        listClassName="bg-neutral-200 dark:bg-neutral-700"
                    />
                    <Input 
                        type="text" 
                        onChange={(e) => setDuration(e.target.value)} 
                        value={duration} 
                        label="Duration" 
                        placeholder="Duration"
                        className="bg-neutral-200 dark:bg-neutral-700"
                    />
                    <Input 
                        type="date" 
                        onChange={(e) => setStartDate(e.target.value)} 
                        value={startDate} 
                        label="Start Date" 
                        placeholder="Start Date"
                        className="bg-neutral-200 dark:bg-neutral-700"
                    />
                    <Input 
                        type="datetime-local" 
                        onChange={(e) => setDeadline(e.target.value)} 
                        value={deadline} 
                        label="Application Deadline" 
                        placeholder="Application Deadline"
                        className="bg-neutral-200 dark:bg-neutral-700"
                    />

                    {/* Required Skills Section */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Required Skills</label>
                        <div className="flex flex-wrap gap-2 mb-3 p-2 bg-neutral-100 dark:bg-neutral-800 rounded">
                            {
                                requiredSkills.map((skillId) => {
                                    const skill = availableSkills.find(s => s.id === skillId);
                                    if (!skill) return null;
                                    return <Tag
                                        key={skill.id}
                                        onClick={()=>{
                                            setRequiredSkills(requiredSkills.filter(id => id !== skill.id))
                                        }}
                                        className={`cursor-pointer hover:bg-red-500 text-white`}
                                    >
                                        {skill.name}
                                        </Tag>
                                })
                            }
                        </div>
                        <DropDownmenu
                            optoins={availableSkills.filter((option) => !requiredSkills.find((skill) => skill === option.id)).map((skill) => ({value: skill.id, label: skill.name}))}
                            onSelect={(value)=> {
                                if(value) {
                                    setRequiredSkills(prev => [...prev, Number(value)])
                                }
                            }} 
                            placeholder="+ Add Skill"
                            isSearchable={true}
                            className="w-full bg-neutral-700"
                            listClassName="h-20"
                            selectedValue={null} 
                        />
                    </div>

                    {/* Application Questions Section */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Application Questions</label>
                        <div className="space-y-2">
                            {applicationQuestions.map((question, idx) => (
                                <div key={idx} className="flex gap-2">
                                    <Input 
                                        type="text" 
                                        value={question} 
                                        onChange={(e) => {
                                            const newQuestions = [...applicationQuestions]
                                            newQuestions[idx] = e.target.value
                                            setApplicationQuestions(newQuestions)
                                        }}
                                        placeholder={`Question ${idx + 1}`}
                                        className="flex-1 bg-neutral-200 dark:bg-neutral-700"
                                    />
                                    {applicationQuestions.length > 1 && (
                                        <Button 
                                            size="sm"
                                            variant="secondary"
                                            onClick={() => setApplicationQuestions(applicationQuestions.filter((_, i) => i !== idx))}
                                            className="px-4"
                                        >
                                            Remove
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <Button 
                            variant="secondary"
                            size="sm"
                            className="mt-2"
                            onClick={() => setApplicationQuestions([...applicationQuestions, ""])}
                        >
                            Add Question
                        </Button>
                    </div>

                    {error && (
                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    )}
                    <Button 
                        className="mt-2" 
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? "Submitting..." : "Submit Request"}
                    </Button>
                </div>
            </Card>
        </div>
    )
}

export default AddInternshipModal
